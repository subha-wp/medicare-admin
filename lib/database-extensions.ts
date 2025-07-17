// Database schema extensions for admin system
export const adminSchemaExtensions = `
-- Add admin user table
CREATE TABLE IF NOT EXISTS "AdminUser" (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  "hashedPassword" TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'EMPLOYEE',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Add admin session table
CREATE TABLE IF NOT EXISTS "AdminSession" (
  id TEXT PRIMARY KEY,
  "adminUserId" TEXT NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  FOREIGN KEY ("adminUserId") REFERENCES "AdminUser"(id) ON DELETE CASCADE
);

-- Add audit log table
CREATE TABLE IF NOT EXISTS "AuditLog" (
  id TEXT PRIMARY KEY,
  "adminUserId" TEXT NOT NULL,
  action TEXT NOT NULL,
  resource TEXT NOT NULL,
  "resourceId" TEXT,
  details TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("adminUserId") REFERENCES "AdminUser"(id) ON DELETE CASCADE
);

-- Update User table to include admin roles
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "adminRole" TEXT;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS "AdminUser_email_idx" ON "AdminUser"("email");
CREATE INDEX IF NOT EXISTS "AdminSession_adminUserId_idx" ON "AdminSession"("adminUserId");
CREATE INDEX IF NOT EXISTS "AuditLog_adminUserId_idx" ON "AuditLog"("adminUserId");
CREATE INDEX IF NOT EXISTS "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");
`;