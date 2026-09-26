# Architecture — Jeet Digital Seva Kendra

This redraws your whiteboard diagram into the concrete system, plus the flows that matter: upload, payment, admin auth, and the 24-hour purge.

---

## 1. System Diagram

```mermaid
flowchart TB
    subgraph Client["Citizen (no login)"]
        A[Frontend: Upload / Track pages]
    end

    subgraph AdminClient["Admin (login required)"]
        B[Frontend: Admin Dashboard]
    end

    subgraph Backend["Backend API (Node.js/Express)"]
        C[Auth Middleware<br/>admin routes only]
        D[Documents Service]
        E[Payment Service]
        F[Cleanup Job<br/>node-cron, every 15 min]
    end

    G[(Neon Postgres<br/>documents, payments, admin_users)]
    H[(R2 / S3<br/>uploaded files, 24h lifecycle rule)]
    I[Razorpay]

    A -->|POST /documents/upload<br/>GET /track/:id| D
    A -->|POST /payments/create-order<br/>POST /payments/verify| E
    B -->|cookie JWT| C
    C --> D
    C --> E
    D <--> G
    D <--> H
    E <--> G
    E <--> I
    F --> G
    F --> H
```

**Key point vs. your sketch:** citizens never touch the admin dashboard or the backend's admin routes at all — there is no login *anywhere* on the citizen-facing side. The only authenticated surface in the whole system is `/admin/*`.

---

## 2. Upload Flow (Sequence)

```mermaid
sequenceDiagram
    participant U as Citizen (browser)
    participant F as Frontend
    participant B as Backend
    participant S as R2/S3
    participant N as Neon DB

    U->>F: Fill name/phone/service, attach files
    F->>B: POST /api/documents/upload (multipart)
    B->>B: Validate type/size, rate-limit check
    B->>S: Upload file(s)
    B->>N: Insert document row (expires_at = +24h)
    B-->>F: { trackingId }
    F-->>U: Show tracking code + WhatsApp link
```

## 3. Payment Flow (Sequence)

```mermaid
sequenceDiagram
    participant U as Citizen (browser)
    participant F as Frontend
    participant B as Backend
    participant R as Razorpay

    F->>B: POST /api/payments/create-order
    B->>R: Create order (server-side key secret)
    R-->>B: orderId
    B-->>F: { orderId, key }
    F->>R: Open Checkout (razorpay checkout.js)
    U->>R: Completes payment
    R-->>F: payment_id, signature
    F->>B: POST /api/payments/verify
    B->>B: Verify HMAC signature
    B-->>F: { status: "paid" }
    R-->>B: Webhook event (independent confirmation)
```

## 4. Admin Auth Flow

```mermaid
sequenceDiagram
    participant Ad as Admin
    participant F as Admin Frontend
    participant B as Backend

    Ad->>F: Enter username/password
    F->>B: POST /api/admin/login
    B->>B: bcrypt compare
    B-->>F: Set-Cookie (httpOnly JWT)
    F->>B: GET /api/admin/documents (cookie sent automatically)
    B->>B: authMiddleware verifies JWT
    B-->>F: Document list
```

## 5. Auto-Purge Flow

```mermaid
sequenceDiagram
    participant Job as Cleanup Job (cron)
    participant N as Neon DB
    participant S as R2/S3

    loop every 15 minutes
        Job->>N: SELECT documents WHERE expires_at < now()
        Job->>S: Delete object(s)
        Job->>N: UPDATE status = 'expired'
    end
    Note over S: R2 lifecycle rule also expires objects<br/>independently, as a backstop
```

---

## 6. Security Model

- **No citizen accounts exist** — this is intentional, so there is nothing to leak or reset. The trade-off is handled by: (a) rate-limiting the anonymous upload endpoint, (b) never exposing a document except via its unguessable `trackingId` + returning only status (not the file) on that public route, and (c) short-lived signed URLs for the actual file, issued only to the authenticated admin.
- **Admin is the only identity in the system.** JWT lives in an httpOnly, `Secure`, `SameSite=strict` cookie — never in localStorage — so it can't be read by injected JS.
- **Bucket is private.** No object is ever publicly readable; the admin dashboard fetches a signed URL good for a few minutes, generated on demand.
- **Documents are ID proofs (Aadhaar, PAN, etc.) — treat them as sensitive by default:** HTTPS everywhere, no file contents in logs, 24-hour hard limit enforced at both the app and storage layer, and an audit trail of admin actions (view/print/delete) rather than of file contents.
- **Payments** are verified server-side via HMAC signature *and* reconciled via Razorpay's webhook — the frontend's "success" callback is never trusted on its own.

## 7. Hosting Topology

| Layer | Recommendation | Reasoning |
|---|---|---|
| Frontend | Vercel / Netlify / Cloudflare Pages | Already static-friendly, cheap, fast CDN for a local business site |
| Backend | Railway / Render / Fly.io | Small always-on Node process; keeps `node-cron` simple |
| Database | Neon (Postgres) | Already chosen; serverless, generous free tier for this scale |
| File storage | Cloudflare R2 | S3-compatible API, **no egress fees** — matters if the admin previews/downloads files often; native lifecycle rules for the 24h auto-expiry |
| Payments | Razorpay | Standard for India |

## 8. Why This Fits a Single Shop

This is deliberately not over-engineered: one Postgres instance, one bucket, one small API process. There's no need for queues, microservices, or a CDN in front of the API at this scale — the cron-based purge and rate limiting are the only "extra" pieces, and both exist specifically because there's no login gate on the upload side.
