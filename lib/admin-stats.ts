import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getDashboardStats() {
  const [
    totalUsers,
    totalDoctors,
    totalPharmacies,
    totalPatients,
    totalChambers,
    activeChambers,
    pendingChambers,
    totalAppointments,
    todayAppointments,
    completedAppointments,
    totalRevenue,
    monthlyRevenue
  ] = await Promise.all([
    prisma.user.count(),
    prisma.doctor.count(),
    prisma.pharmacy.count(),
    prisma.patient.count(),
    prisma.chamber.count(),
    prisma.chamber.count({ where: { isActive: true, isVerified: true } }),
    prisma.chamber.count({ where: { isVerified: false } }),
    prisma.appointment.count(),
    prisma.appointment.count({
      where: {
        date: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lt: new Date(new Date().setHours(23, 59, 59, 999))
        }
      }
    }),
    prisma.appointment.count({ where: { status: 'COMPLETED' } }),
    prisma.appointment.aggregate({
      where: { paymentStatus: 'PAID' },
      _sum: { amount: true }
    }),
    prisma.appointment.aggregate({
      where: {
        paymentStatus: 'PAID',
        createdAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        }
      },
      _sum: { amount: true }
    })
  ])

  return {
    users: {
      total: totalUsers,
      doctors: totalDoctors,
      pharmacies: totalPharmacies,
      patients: totalPatients
    },
    chambers: {
      total: totalChambers,
      active: activeChambers,
      pending: pendingChambers,
      verificationRate: totalChambers > 0 ? (activeChambers / totalChambers) * 100 : 0
    },
    appointments: {
      total: totalAppointments,
      today: todayAppointments,
      completed: completedAppointments,
      completionRate: totalAppointments > 0 ? (completedAppointments / totalAppointments) * 100 : 0
    },
    revenue: {
      total: totalRevenue._sum.amount || 0,
      monthly: monthlyRevenue._sum.amount || 0
    }
  }
}

export async function getRecentActivity() {
  const [recentAppointments, recentChambers, recentUsers] = await Promise.all([
    prisma.appointment.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        patient: { include: { user: true } },
        doctor: { include: { user: true } },
        pharmacy: { include: { user: true } }
      }
    }),
    prisma.chamber.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        doctor: { include: { user: true } },
        pharmacy: { include: { user: true } }
      }
    }),
    prisma.user.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        patient: true,
        doctor: true,
        pharmacy: true
      }
    })
  ])

  return {
    appointments: recentAppointments,
    chambers: recentChambers,
    users: recentUsers
  }
}

export async function getAnalyticsData() {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  
  const [
    appointmentTrends,
    revenueTrends,
    userGrowth,
    chamberStats
  ] = await Promise.all([
    prisma.appointment.groupBy({
      by: ['createdAt'],
      where: { createdAt: { gte: thirtyDaysAgo } },
      _count: { id: true },
      orderBy: { createdAt: 'asc' }
    }),
    prisma.appointment.groupBy({
      by: ['createdAt'],
      where: { 
        createdAt: { gte: thirtyDaysAgo },
        paymentStatus: 'PAID'
      },
      _sum: { amount: true },
      orderBy: { createdAt: 'asc' }
    }),
    prisma.user.groupBy({
      by: ['createdAt', 'role'],
      where: { createdAt: { gte: thirtyDaysAgo } },
      _count: { id: true },
      orderBy: { createdAt: 'asc' }
    }),
    prisma.chamber.groupBy({
      by: ['isVerified', 'isActive'],
      _count: { id: true }
    })
  ])

  return {
    appointmentTrends,
    revenueTrends,
    userGrowth,
    chamberStats
  }
}