import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'

const prisma = new PrismaClient()

export interface AdminUser {
  id: string
  email: string
  name: string
  role: 'SUPER_ADMIN' | 'EMPLOYEE'
  permissions: string[]
  createdAt: Date
  updatedAt: Date
}

export interface AdminSession {
  id: string
  adminUserId: string
  expiresAt: Date
}

export async function createAdminUser(
  email: string, 
  password: string, 
  name: string, 
  role: 'SUPER_ADMIN' | 'EMPLOYEE' = 'EMPLOYEE',
  permissions: string[] = []
): Promise<AdminUser> {
  const hashedPassword = await bcrypt.hash(password, 12)
  
  const adminUser = await prisma.adminUser.create({
    data: {
      email,
      hashedPassword,
      name,
      role,
      permissions
    }
  })
  
  return adminUser
}

export async function verifyAdminCredentials(email: string, password: string): Promise<AdminUser | null> {
  const adminUser = await prisma.adminUser.findUnique({
    where: { email }
  })
  
  if (!adminUser) return null
  
  const isValid = await bcrypt.compare(password, adminUser.hashedPassword)
  if (!isValid) return null
  
  return adminUser
}

export async function createAdminSession(adminUserId: string): Promise<AdminSession> {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
  
  const session = await prisma.adminSession.create({
    data: {
      adminUserId,
      expiresAt
    }
  })
  
  return session
}

export async function getAdminFromSession(sessionId: string): Promise<AdminUser | null> {
  const session = await prisma.adminSession.findUnique({
    where: { id: sessionId },
    include: { adminUser: true }
  })
  
  if (!session || session.expiresAt < new Date()) {
    return null
  }
  
  return session.adminUser
}

export async function logAuditAction(
  adminUserId: string,
  action: string,
  resource: string,
  resourceId?: string,
  details?: any
) {
  await prisma.auditLog.create({
    data: {
      adminUserId,
      action,
      resource,
      resourceId,
      details: details ? JSON.stringify(details) : null
    }
  })
}