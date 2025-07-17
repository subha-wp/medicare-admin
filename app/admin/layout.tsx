'use client'

import { useState } from 'react'
import { 
  Bell, 
  Home, 
  Users, 
  Calendar, 
  FileText, 
  Building, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  BarChart3,
  Shield,
  CreditCard,
  Activity,
  Database,
  UserCheck
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: Home },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Chambers', href: '/admin/chambers', icon: Building },
  { name: 'Appointments', href: '/admin/appointments', icon: Calendar },
  { name: 'Medical Records', href: '/admin/medical-records', icon: FileText },
  { name: 'Payments', href: '/admin/payments', icon: CreditCard },
  { name: 'Notifications', href: '/admin/notifications', icon: Bell },
  { name: 'Audit Logs', href: '/admin/audit-logs', icon: Activity },
  { name: 'Admin Users', href: '/admin/admin-users', icon: Shield },
  { name: 'System', href: '/admin/system', icon: Database },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentPath, setCurrentPath] = useState('/admin')

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <UserCheck className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">HealthCare</h1>
              <p className="text-xs text-blue-100">Admin Panel</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:bg-blue-800"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <nav className="mt-4 px-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setCurrentPath(item.href)}
              className={cn(
                "flex items-center px-4 py-3 mb-1 text-sm font-medium rounded-lg transition-all duration-200",
                currentPath === item.href
                  ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600 shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
              {item.name === 'Chambers' && (
                <Badge variant="secondary" className="ml-auto bg-orange-100 text-orange-700">
                  12
                </Badge>
              )}
              {item.name === 'Notifications' && (
                <Badge variant="destructive" className="ml-auto">
                  3
                </Badge>
              )}
            </a>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-white">SA</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Super Admin</p>
                <p className="text-xs text-gray-500">admin@healthcare.com</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-600">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Dashboard</h2>
                <p className="text-sm text-gray-500">Welcome back, manage your healthcare platform</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  3
                </Badge>
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">SA</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Super Admin</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6 max-w-7xl mx-auto">
          {children}
        </main>
      </div>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}