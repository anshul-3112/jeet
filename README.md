# Jeet Digital E-Governance Seva Kendra

Production-ready end-to-end web application for **Jeet Digital E-Governance Seva Kendra** (Ayodhya Nagar Square, Nagpur, Maharashtra).

---

## 🏛️ Business Overview

- **Name**: Jeet Digital E-Governance Seva Kendra (*जीत डिजिटल ई-गव्हर्नन्स सेवा केंद्र*)
- **Tagline**: *सर्व शासकीय आणि खाजगी सेवा एका छताखाली - आपले सरकार सेवा केंद्रात उपलब्ध*
- **Owner**: Yash Chopade
- **Phone / WhatsApp**: `+91 80552 03555` | `+91 85509 77877`
- **Location**: 27A, Ayodhya Nagar Square, Beside Balaji Jewelers & Lanjewar Cycle Stores, Nagpur - 440024
- **Working Hours**: Open 24 Hours (24x7 Assistance)

---

## 🚀 Architecture & Tech Stack

This project is organized as a clean, decoupled monorepo:

```
netcafe/
├── frontend/    # React 19 + Vite + Tailwind v4 + React Query (Client SPA)
├── backend/     # Node.js + Express + TypeScript + Neon Postgres + S3 (API Server)
└── specs/       # System specifications & project progress documentation
```

### **Frontend (`frontend/`)**
- **Core**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4, Lucide React Icons
- **State & Data**: `@tanstack/react-query`, `axios`
- **Forms**: `react-hook-form`, `zod`
- **Payments**: Razorpay Checkout SDK
- **Localization**: Bilingual support (English & मराठी)

### **Backend (`backend/`)**
- **Runtime**: Node.js + Express + TypeScript
- **Database**: Neon Serverless PostgreSQL with Drizzle ORM
- **Object Storage**: Neon S3 Platform Storage / Cloudflare R2 / AWS S3
- **Authentication**: bcrypt password hashing + `httpOnly`, `Secure` JWT cookie sessions
- **Job Scheduling**: `node-cron` for 24-hour auto-purge of temporary citizen documents
- **Security**: `helmet`, `cors`, `express-rate-limit`, input validation

---

## ✨ Features

### 👤 Citizen Public Experience (Zero Login Required)
1. **Document Upload (`/upload`)**:
   - 3-step, mobile-first flow: Enter name & phone -> Select service -> Upload files.
   - Camera direct-capture (`capture="environment"`) & drag-and-drop.
   - Generates a short, human-readable tracking code (e.g., `JD-7F3K2`).
   - One-tap WhatsApp deep link pre-filled with upload details to alert the shop owner immediately.
   - **24-Hour Privacy Guarantee**: Citizen files are automatically and permanently deleted from storage after 24 hours.
2. **Razorpay Online Payments**:
   - Service fees can be paid directly online with server-side HMAC SHA256 signature verification.
3. **Public Status Tracking (`/track/:trackingId`)**:
   - Check application status (`Received`, `Printed & Ready`, `Expired`) without logging in.
   - Live countdown timer before auto-purge and direct WhatsApp inquiry button.
4. **20+ Document Services Catalog**:
   - Aadhaar, PAN, Caste Validity, Income, Domicile, Gumasta, Food Licence, Affidavits & Online Forms.
   - Full document checklists in both English and Marathi.

### 🛡️ Admin Management Dashboard (`/admin/*`)
1. **Protected Route Guard**:
   - Cookie-based session verification; automatically redirects unauthenticated users to `/admin/login`.
2. **Document Management (`/admin/documents`)**:
   - Filter by status (`received`, `printed`, `expired`) and service type.
   - **Expiring Soon Alert**: Visible banner for documents with less than 1 hour remaining before purge.
   - Quick one-click phone call (`tel:`) and direct WhatsApp message to citizens.
   - Quick "Done" button to mark documents printed.
3. **Detail & Secure Document Viewer (`/admin/documents/:id`)**:
   - Preview uploaded images and multi-page PDFs using short-lived (5-minute) signed URLs.
   - "Print" button triggering native browser print dialog.
4. **Payments Reconciliation (`/admin/payments`)**:
   - Daily and weekly collection statistics (Today, Past 7 Days, Total).
   - Searchable ledger of all Razorpay transactions.

---

## 🛠️ Quick Start & Local Setup

### 1. Environment Setup
In the `backend/` folder, create a `.env` file (copy from `.env.example`):

```bash
cd backend
cp .env.example .env
```

Fill in your configuration:
```env
DATABASE_URL=postgresql://user:password@endpoint/dbname?sslmode=require
JWT_SECRET=your_generated_jwt_secret_key
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=$2b$10$...

# Neon S3 Platform Storage
AWS_ENDPOINT_URL_S3=https://your-storage-endpoint.aws.neon.tech
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
AWS_REGION=us-east-2
S3_BUCKET=assets

RAZORPAY_KEY_ID=rzp_test_xxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret
FRONTEND_ORIGIN=http://localhost:5173
```

---

### 2. Install Dependencies

From the root directory:
```powershell
# Install frontend packages
npm --prefix frontend install

# Install backend packages
npm --prefix backend install
```

---

### 3. Run the Development Servers

Open two terminal tabs:

**Tab 1: Backend API Server (Port 3000)**
```powershell
npm run dev:backend
```

**Tab 2: Frontend Client (Port 5173)**
```powershell
npm run dev:frontend
```

---

### 4. Admin Login Credentials

- **URL**: [http://localhost:5173/admin/login](http://localhost:5173/admin/login)
- **Username**: `admin`
- **Password**: `admin123`

*(To re-seed or change the admin password, run: `npm run seed:admin` from the root directory).*

---

## 📦 Build Commands

```powershell
# Build frontend only
npm run build:frontend

# Build backend only
npm run build:backend

# Build both for production
npm run build
```

---

## 📄 Documentation

Comprehensive architectural and design documents are available in the [`specs/`](file:///d:/netcafe/specs) folder:
- [`01-FRONTEND-SPEC.md`](file:///d:/netcafe/specs/01-FRONTEND-SPEC.md): Frontend route map, upload UX, and dashboard spec.
- [`02-BACKEND-SPEC.md`](file:///d:/netcafe/specs/02-BACKEND-SPEC.md): Express API specification, rate limits, and auth model.
- [`03-ARCHITECTURE.md`](file:///d:/netcafe/specs/03-ARCHITECTURE.md): Sequence diagrams for upload, payment, and auto-purge flows.
- [`04-DB-SCHEMA-AND-STORAGE.md`](file:///d:/netcafe/specs/04-DB-SCHEMA-AND-STORAGE.md): PostgreSQL DDL, Drizzle models, and S3 naming conventions.
- [`05-PROJECT-PROGRESS.md`](file:///d:/netcafe/specs/05-PROJECT-PROGRESS.md): Live progress tracker, implemented features, and service status.