import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export interface AdminUser {
  id: string
  email: string
  name: string
  role: 'SUPER_ADMIN' | 'EMPLOYEE'
  createdAt: Date
  updatedAt: Date
}

export async function createAdminUser(email: string, password: string, name: string, role: 'SUPER_ADMIN' | 'EMPLOYEE' = 'EMPLOYEE'): Promise<AdminUser> {
  const hashedPassword = await bcrypt.hash(password, 10)
  
  const adminUser = await prisma.adminUser.create({
    data: {
      email,
      hashedPassword,
      name,
      role
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