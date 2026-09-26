# Backend Specification — Jeet Digital Seva Kendra

**Scope:** A small Node.js API that accepts anonymous document uploads, runs Razorpay payments, and serves an admin-only dashboard, backed by Neon Postgres + S3/R2 storage with a hard 24-hour document lifetime.

---

## 1. Stack

| Concern | Choice | Why |
|---|---|---|
| Runtime/framework | Node.js + **Express** (or Fastify) + TypeScript | Small team, huge ecosystem, easy to host anywhere |
| DB | **Neon** (serverless Postgres) via **Drizzle ORM** (or Prisma) | Matches what you already picked; branching is handy for testing |
| File storage | **S3-compatible** — Cloudflare **R2** recommended over AWS S3 | Zero egress fees, S3-compatible SDK, cheaper for a small business |
| Auth (admin only) | JWT in an **httpOnly, secure cookie** + bcrypt password hash | No client-side token handling, resistant to XSS token theft |
| Payments | **Razorpay** Orders API + webhook | Standard for India-based collections |
| Scheduling | `node-cron` in-process (or a Neon/host cron trigger) | Runs the 24h purge job |
| Validation | `zod` | Shared shape between routes |
| Security middleware | `helmet`, `cors` (locked to your frontend origin), `express-rate-limit` | Public upload endpoint needs abuse protection since there's no login |

---

## 2. API Endpoints

### Public

| Method & Path | Notes |
|---|---|
| `POST /api/documents/upload` | `multipart/form-data`: name, phone, serviceSlug, files[]. Rate-limited (e.g. 5 req / 15 min / IP, plus max 5 uploads / phone / day). Returns `{ trackingId }`. |
| `GET /api/documents/track/:trackingId` | Public status lookup — returns status + service + countdown only, **never** the file or the citizen's phone back out. |
| `POST /api/payments/create-order` | Body: `trackingId`, `amount`. Creates a Razorpay order server-side, returns `{ orderId, amount, key }`. |
| `POST /api/payments/verify` | Body: Razorpay `order_id`, `payment_id`, `signature`. Verifies HMAC signature server-side before marking paid — **never trust the frontend's "success" callback alone**. |
| `POST /api/payments/webhook` | Razorpay webhook (signature-verified via the webhook secret) as the source of truth for payment status, independent of the browser round trip. |

### Admin (all require the auth cookie; `authMiddleware` rejects with 401 otherwise)

| Method & Path | Notes |
|---|---|
| `POST /api/admin/login` | Body: username, password. bcrypt-compare, issue JWT cookie. Rate-limit this hard (e.g. 5 attempts / 15 min / IP) — it's the only login on the whole site. |
| `POST /api/admin/logout` | Clears cookie |
| `GET /api/admin/me` | Returns admin identity, used by the frontend's route guard |
| `GET /api/admin/documents` | Query params: status, service, date range, page — paginated list |
| `GET /api/admin/documents/:id` | Detail + a **short-lived (e.g. 5 min) signed URL** to preview/download the file — the bucket itself stays private |
| `PATCH /api/admin/documents/:id` | Body: `{ status: 'printed' | 'received' }` |
| `DELETE /api/admin/documents/:id` | Manual early delete (also removes the R2/S3 object) |
| `GET /api/admin/payments` | Paginated transaction history, filterable by date |

---

## 3. Upload Flow

1. Frontend sends `multipart/form-data` directly to the backend (simplest, fine at this scale — a presigned-URL direct-to-bucket upload is a later optimization, not needed for a single-shop MVP).
2. Backend validates file type/size, generates a UUID + a short human-readable `trackingId`.
3. Backend streams the file to R2/S3 under a predictable key (see DB/storage doc for the key convention).
4. Backend inserts a row into `documents` with `expires_at = now() + interval '24 hours'`.
5. Response returns `{ trackingId }` only — nothing else the citizen needs to remember.

## 4. The 24-Hour Auto-Delete Job

Two layers, so nothing survives 24 hours even if one layer fails:

1. **Storage-level backstop:** an R2/S3 **lifecycle rule** on the uploads prefix that expires objects after 24 hours automatically, independent of the app.
2. **Application-level job:** `node-cron` running every 15 minutes:
   - `SELECT * FROM documents WHERE expires_at < now() AND status != 'deleted'`
   - delete the object from the bucket, then update the row to `status = 'expired'` (keep a stub row for a short while for support/audit purposes, or hard-delete — your call; recommendation below keeps a stub for 7 days then hard-deletes).
   - log each deletion (id, tracking code, timestamp) to a small `audit_log` table for accountability, without ever logging file contents.

This guarantees privacy for citizens' government ID documents without needing them to do anything.

## 5. Razorpay Integration Flow

1. Frontend calls `POST /api/payments/create-order`.
2. Backend calls Razorpay's Orders API with your **key secret** (server-side only, never shipped to the browser), stores a `payments` row as `pending`.
3. Frontend opens Razorpay Checkout with the returned `orderId` + public `key`.
4. On success, frontend calls `POST /api/payments/verify` with the returned signature; backend verifies the HMAC using the key secret and flips the row to `paid`.
5. The `POST /api/payments/webhook` endpoint independently receives Razorpay's server-to-server event and reconciles status — this is what protects you if the citizen closes the browser mid-flow.

## 6. Anti-Abuse (since upload has no login)

- `express-rate-limit` per IP on `/api/documents/upload` and `/api/admin/login`.
- Per-phone-number daily upload cap, enforced in the DB.
- File type allow-list (`image/jpeg`, `image/png`, `application/pdf`) and a max size (e.g. 10MB) enforced server-side too, not just in the UI.
- Optional: Google reCAPTCHA v3 (invisible) on the upload form if spam becomes a real problem — designed for, not required at launch.

## 7. Environment Variables

```
DATABASE_URL=            # Neon connection string
JWT_SECRET=
ADMIN_USERNAME=
ADMIN_PASSWORD_HASH=
S3_ENDPOINT=              # R2 endpoint or leave unset for AWS S3
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
S3_BUCKET=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=
FRONTEND_ORIGIN=          # for CORS
```

## 8. Deployment

- **Backend:** Railway, Render, or Fly.io — any of these run an always-on Node process cheaply, which you need for `node-cron`. (If you deploy to a serverless platform instead, replace `node-cron` with the platform's own scheduled-function/cron trigger.)
- **DB:** Neon (as planned).
- **Storage:** Cloudflare R2 (as planned) — its lifecycle rules cover step 4 above natively.
- **Frontend:** Vercel/Netlify/Cloudflare Pages, unchanged from today.
