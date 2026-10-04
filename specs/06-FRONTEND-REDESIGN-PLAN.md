# Current Frontend Architecture & Feature State

## Core Tech Stack
- React 19 + Vite
- TypeScript
- Tailwind CSS v4
- React Router v6
- React Query (TanStack Query) for API calls
- Axios for HTTP requests
- React Hook Form + Zod (implied/planned) for forms
- Lucide React for icons

## Application Structure & Routing
### Public Routes (Bilingual: English & Marathi)
1. **Home (`/`)**: Hero section, popular services grid, "How it works" preview, trust strip, fast enquiry form, and FAQ.
2. **Services (`/services`)**: List of all available e-governance services.
3. **Service Detail (`/services/:slug`)**: Specific details, required documents, fee estimate, and turnaround time for a single service.
4. **Upload & Pay (`/upload`)**: A 3-step wizard (Details -> Upload -> Complete/Pay via Razorpay). Generates a tracking ID (`JD-XXXXX`).
5. **Track Status (`/track`, `/track/:trackingId`)**: Allows users to check the status of their submitted documents using their tracking ID.
6. **Static Pages**: About (`/about`), Contact (`/contact`), FAQ (`/faq`), How It Works (`/how-it-works`), Privacy Policy (`/privacy-policy`).

### Admin Routes (Protected via `<RequireAdmin>`)
1. **Login (`/admin/login`)**: Authentication page for the shop owner.
2. **Dashboard / Documents (`/admin/documents`)**: Table view of all uploaded documents, filters, auto-delete countdowns, and quick actions (WhatsApp, Call).
3. **Document Detail (`/admin/documents/:id`)**: Preview images/PDFs (via presigned URLs), print functionality, and manual delete.
4. **Payments (`/admin/payments`)**: Ledger of all Razorpay transactions.

## UX/UI Shortcomings (Reason for Rewrite)
- **Too Complex for Target Audience:** The current design is too dense and "corporate/SaaS-like". The target audience (citizens at a local Seva Kendra) needs massive, highly obvious touch targets and a foolproof, linear flow.
- **Navigation Overload:** The header and footer contain too many links. Users get lost instead of focusing on the core actions: Uploading documents, Tracking status, and Calling the shop.
- **Information Density:** Pages like the Home page have too many sections (Trust strips, Why Choose Us, etc.) that distract from the primary goal.

## Goals for the New Frontend
1. **Ultra-Simple UI:** Remove all unnecessary sections. The Home page should immediately offer the 3 core actions (Upload, Track, Contact) in massive buttons.
2. **Simplified Upload Flow:** Make the upload process a single, extremely straightforward screen rather than a complex multi-step wizard if possible, or visually simplify the steps.
3. **Retain All Features:** Ensure Razorpay payment, 24-hour auto-purge tracking, and the complete Admin dashboard remain fully functional.
4. **Accessible:** Higher contrast, larger text, and persistent Marathi translation toggles.
