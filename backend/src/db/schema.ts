import { pgTable, text, timestamp, integer, uuid } from 'drizzle-orm/pg-core';

export const adminUsers = pgTable('admin_users', {
  id: uuid('id').defaultRandom().primaryKey(),
  username: text('username').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  lastLoginAt: timestamp('last_login_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const documents = pgTable('documents', {
  id: uuid('id').defaultRandom().primaryKey(),
  trackingId: text('tracking_id').notNull().unique(),
  citizenName: text('citizen_name').notNull(),
  citizenPhone: text('citizen_phone').notNull(),
  serviceSlug: text('service_slug').notNull(),
  fileKeys: text('file_keys').array().notNull(),
  status: text('status', { enum: ['received', 'printed', 'expired', 'deleted'] }).default('received').notNull(),
  uploadedAt: timestamp('uploaded_at', { withTimezone: true }).defaultNow().notNull(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  printedAt: timestamp('printed_at', { withTimezone: true }),
});

export const payments = pgTable('payments', {
  id: uuid('id').defaultRandom().primaryKey(),
  documentId: uuid('document_id').references(() => documents.id, { onDelete: 'set null' }),
  razorpayOrderId: text('razorpay_order_id').notNull(),
  razorpayPaymentId: text('razorpay_payment_id'),
  amountPaise: integer('amount_paise').notNull(),
  status: text('status', { enum: ['pending', 'paid', 'failed', 'refunded'] }).default('pending').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const auditLog = pgTable('audit_log', {
  id: uuid('id').defaultRandom().primaryKey(),
  adminId: uuid('admin_id').references(() => adminUsers.id),
  documentId: uuid('document_id').references(() => documents.id, { onDelete: 'set null' }),
  action: text('action').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});
