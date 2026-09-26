# Frontend Specification — Jeet Digital Seva Kendra

**Scope:** Add document upload (no login for citizens), an admin-only dashboard, Razorpay checkout UI, and simplified UX to the existing React 19 + Vite + TypeScript + Tailwind v4 site.

---

## 1. Goals

- Citizens can upload documents and pay **without creating an account or logging in**.
- Only the shop owner (admin) can log in, and only to reach `/admin/*`.
- Every uploaded document is treated as **temporary** (24-hour life) — the UI should make that obvious to the user ("your file is auto-deleted after 24 hours" reassurance for privacy).
- Keep the existing bilingual (English/Marathi) WhatsApp-first experience; add upload/payment as a natural extension, not a rebuild.

---

## 2. Route Map

| Route | Access | Purpose |
|---|---|---|
| `/` `/services` `/services/:slug` `/how-it-works` `/faq` `/about` `/contact` `/privacy-policy` `/thank-you` | Public | Existing pages, unchanged |
| `/upload` | Public (no login) | New — citizen uploads a document for a service |
| `/track/:trackingId` | Public (no login) | New — citizen checks status of their upload/payment with the code they were given |
| `/admin/login` | Public | Admin-only login form |
| `/admin` (redirects to `/admin/documents`) | **Protected** | Dashboard shell |
| `/admin/documents` | **Protected** | List/search/filter uploaded documents, preview, print, mark done |
| `/admin/documents/:id` | **Protected** | Single document detail + preview + print |
| `/admin/payments` | **Protected** | Razorpay transaction history |
| `*` | Public | Existing `NotFoundPage` |

**Protected route guard:** a `<RequireAdmin>` wrapper calls `GET /api/admin/me` once on mount (cookie-based JWT, see backend spec). If it 401s, redirect to `/admin/login`. No admin route or its data should ever be requested by an unauthenticated session.

---

## 3. New Public Flow — Upload

Single page, 3 steps, no page reloads, mobile-first (most users will be on a phone at the shop counter):

1. **Who & what** — Name, phone number, pick a service from the same list already in `services.ts` (dropdown, searchable). Phone is used only to send the WhatsApp confirmation and to let the citizen look up status later.
2. **Upload** — Drag-and-drop or "take a photo" (use `<input type="file" accept="image/*,.pdf" capture="environment">` so phones open the camera directly). Multiple files allowed. Client-side validation: max 10MB/file, only jpg/png/pdf, max 5 files.
3. **Done** — Show a **tracking code** (short, human-readable, e.g. `JD-7F3K2`) big on screen, a "Save / Screenshot this" hint, a note that the file auto-deletes in 24 hours, and a WhatsApp deep-link pre-filled with "I've uploaded my documents for <service>, tracking code JD-7F3K2" pointing at the shop's number — this is what actually alerts the admin in real time (in addition to it showing in the dashboard).

No CAPTCHA UI is needed if the backend handles abuse via rate limiting (see backend spec), but keep the form simple enough to add an invisible reCAPTCHA v3 later without redesigning.

If the service the citizen picked has a fee, step 3 becomes a **Pay** step instead of "Done": embed Razorpay Checkout (`checkout.js`, loaded from `https://checkout.razorpay.com/v1/checkout.js`) using the order returned by the backend, then show the tracking code + receipt after payment success.

### Track status page (`/track/:trackingId`)
Simple read-only view: status (`Received` / `Printed & Ready` / `Expired`), time remaining before auto-delete, and the same WhatsApp button. Lets a citizen check in without needing an account.

---

## 4. Admin Dashboard

### Layout
Left sidebar (collapses to bottom tab bar on mobile): **Documents**, **Payments**, **Logout**. Top bar shows admin name and a live count of "expiring in <1h" documents.

### Documents view
- Table/card list: tracking code, citizen name & phone, service, uploaded time, **countdown to auto-delete**, status badge (Received / Printed / Expired).
- Filters: status, service, date.
- Row click → detail view: image/PDF preview (fetched via a short-lived signed URL from the backend, never a public S3/R2 link), a **Print** button (opens the file in a new tab / triggers browser print dialog for images), a **Mark as printed** button, and the citizen's phone as a `tel:`/WhatsApp link so the admin can call them back directly from the dashboard.
- A visible banner when a document has under 1 hour left, so nothing gets missed before deletion.

### Payments view
- Table: date, tracking code (if linked to a document), amount, Razorpay payment ID, status (paid/failed/refunded).
- Simple date-range filter and a total-collected figure at the top (per day/week) — small but genuinely useful for a shop owner reconciling cash vs. digital.
- Read-only; refunds are handled in the Razorpay dashboard itself, not rebuilt here.

---

## 5. UI/UX Simplification Guidelines

- One primary action per screen; big touch targets (this audience skews non-technical, often on cheap Android phones with poor connectivity).
- Keep the current bilingual toggle; upload/track/status strings go through the same `translations.ts` pattern.
- Optimistic, forgiving forms: don't block "Next" on perfect validation, show inline errors only after a field is touched.
- Loading and offline states matter more than usual here — show clear "Uploading… do not close this tab" progress, and retry-on-failure for uploads (spotty café/mobile networks).
- Admin dashboard can be visually denser (it's a power-user tool) but should still work one-handed on a phone, since the owner may check it away from the counter.

---

## 6. Suggested Extra Features (not required, worth adding)

- **Auto WhatsApp ping to admin** the moment a document is uploaded (server-triggered via WhatsApp Cloud API or a simple `wa.me` link opened for the citizen, as above — the latter needs no API approval and is the pragmatic MVP choice).
- **Printed receipt / slip** generator (simple HTML → print) for citizens paying in person.
- **"Expiring soon" badge** on the admin's browser tab title/favicon so nothing gets missed.
- Basic **audit trail** on the admin side (who marked what printed, when) — small, but useful if more than one staff member ever gets admin access.

---

## 7. New Frontend Dependencies

| Package | Purpose |
|---|---|
| `@tanstack/react-query` | Server-state, caching, retries for API calls |
| `react-hook-form` + `zod` | Upload form + admin login validation |
| `axios` | HTTP client with interceptors for 401 → redirect |
| Razorpay `checkout.js` (script tag, not npm) | Payment UI |

## 8. Folder Additions

```
src/
  pages/
    UploadPage.tsx
    TrackStatusPage.tsx
    admin/
      AdminLoginPage.tsx
      AdminDocumentsPage.tsx
      AdminDocumentDetailPage.tsx
      AdminPaymentsPage.tsx
  components/
    admin/RequireAdmin.tsx
    admin/AdminLayout.tsx
    upload/FileDropzone.tsx
  api/
    client.ts        (axios instance)
    documents.ts
    payments.ts
    admin.ts
```
