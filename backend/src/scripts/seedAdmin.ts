import bcrypt from 'bcrypt';
import { db } from '../db';
import { adminUsers } from '../db/schema';
import { eq } from 'drizzle-orm';
import dotenv from 'dotenv';

dotenv.config();

async function seed() {
  const username = 'admin';
  const plainPassword = 'admin123';
  const passwordHash = await bcrypt.hash(plainPassword, 10);

  console.log('Generated hash for admin123:', passwordHash);

  // Check if admin exists
  const existing = await db.select().from(adminUsers).where(eq(adminUsers.username, username));
  if (existing.length > 0) {
    await db.update(adminUsers).set({ passwordHash }).where(eq(adminUsers.username, username));
    console.log('Updated existing admin password in Neon DB.');
  } else {
    await db.insert(adminUsers).values({ username, passwordHash });
    console.log('Inserted admin user into Neon DB.');
  }

  // Verify
  const [user] = await db.select().from(adminUsers).where(eq(adminUsers.username, username));
  const isMatch = await bcrypt.compare(plainPassword, user.passwordHash);
  console.log(`Verification: password '${plainPassword}' match:`, isMatch);
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
