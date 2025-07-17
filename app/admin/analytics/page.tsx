'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Calendar, 
  DollarSign,
  Activity,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react'

const analyticsData = {
  revenue: {
    current: 124500,
    previous: 108200,
    growth: 15.1,
    trend: 'up'
  },
  appointments: {
    current: 1247,
    previous: 1156,
    growth: 7.9,
    trend: 'up'
  },
  users: {
    current: 2847,
    previous: 2654,
    growth: 7.3,
    trend: 'up'
  },
  chambers: {
    current: 89,
    previous: 82,
    growth: 8.5,
    trend: 'up'
  }
}

const chartData = [
  { month: 'Jan', revenue: 85000, appointments: 890, users: 2100 },
  { month: 'Feb', revenue: 92000, appointments: 950, users: 2250 },
  { month: 'Mar', revenue: 98000, appointments: 1020, users: 2400 },
  { month: 'Apr', revenue: 105000, appointments: 1100, users: 2550 },
  { month: 'May', revenue: 112000, appointments: 1180, users: 2700 },
  { month: 'Jun', revenue: 124500, appointments: 1247, users: 2847 }
]

const topPerformers = [
  {
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    appointments: 156,
    revenue: 78000,
    rating: 4.9
  },
  {
    name: 'Dr. Michael Chen',
    specialty: 'Dermatology',
    appointments: 142,
    revenue: 106500,
    rating: 4.8
  },
  {
    name: 'Dr. Emily Davis',
    specialty: 'Pediatrics',
    appointments: 134,
    revenue: 80400,
    rating: 4.9
  },
  {
    name: 'Dr. Robert Wilson',
    specialty: 'Orthopedics',
    appointments: 128,
    revenue: 102400,
    rating: 4.7
  }
]

const pharmacyStats = [
  {
    name: 'City Medical Pharmacy',
    chambers: 12,
    revenue: 45000,
    appointments: 234,
    rating: 4.8
  },
  {
    name: 'Health Plus Pharmacy',
    chambers: 8,
    revenue: 38000,
    appointments: 198,
    rating: 4.7
  },
  {
    name: 'MedCare Pharmacy',
    chambers: 10,
    revenue: 42000,
    appointments: 215,
    rating: 4.9
  }
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select defaultValue="30days">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">₹{analyticsData.revenue.current.toLocaleString()}</div>
            <div className="flex items-center space-x-1 text-sm mt-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-green-600 font-medium">+{analyticsData.revenue.growth}%</span>
              <span className="text-gray-500">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{analyticsData.appointments.current.toLocaleString()}</div>
            <div className="flex items-center space-x-1 text-sm mt-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-green-600 font-medium">+{analyticsData.appointments.growth}%</span>
              <span className="text-gray-500">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Users</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{analyticsData.users.current.toLocaleString()}</div>
            <div className="flex items-center space-x-1 text-sm mt-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-green-600 font-medium">+{analyticsData.users.growth}%</span>
              <span className="text-gray-500">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Chambers</CardTitle>
            <Activity className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{analyticsData.chambers.current}</div>
            <div className="flex items-center space-x-1 text-sm mt-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-green-600 font-medium">+{analyticsData.chambers.growth}%</span>
              <span className="text-gray-500">from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Revenue Chart Placeholder</p>
                <p className="text-sm text-gray-400">Integration with charting library needed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Appointment Trends</CardTitle>
            <CardDescription>Daily appointment bookings and completions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
              <div className="text-center">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Appointment Chart Placeholder</p>
                <p className="text-sm text-gray-400">Integration with charting library needed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Doctors</CardTitle>
            <CardDescription>Doctors with highest appointments and revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((doctor, index) => (
                <div key={doctor.name} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{doctor.name}</p>
                      <p className="text-sm text-gray-600">{doctor.specialty}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{doctor.appointments} appointments</p>
                    <p className="text-sm text-green-600">₹{doctor.revenue.toLocaleString()}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <span className="text-xs text-yellow-600">★</span>
                      <span className="text-xs text-gray-600">{doctor.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pharmacy Performance</CardTitle>
            <CardDescription>Top performing pharmacy partners</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pharmacyStats.map((pharmacy, index) => (
                <div key={pharmacy.name} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-green-600">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{pharmacy.name}</p>
                      <p className="text-sm text-gray-600">{pharmacy.chambers} chambers</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{pharmacy.appointments} appointments</p>
                    <p className="text-sm text-green-600">₹{pharmacy.revenue.toLocaleString()}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <span className="text-xs text-yellow-600">★</span>
                      <span className="text-xs text-gray-600">{pharmacy.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>New user registrations by role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Patients</span>
                <Badge variant="outline" className="text-purple-600 border-purple-200">+156</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Doctors</span>
                <Badge variant="outline" className="text-blue-600 border-blue-200">+23</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Pharmacies</span>
                <Badge variant="outline" className="text-green-600 border-green-200">+8</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Analytics</CardTitle>
            <CardDescription>Payment method distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Online Payments</span>
                <span className="text-sm text-gray-600">78%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Cash Payments</span>
                <span className="text-sm text-gray-600">22%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Average Transaction</span>
                <span className="text-sm font-medium text-green-600">₹642</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Platform performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Uptime</span>
                <Badge variant="outline" className="text-green-600 border-green-200">99.9%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Response Time</span>
                <span className="text-sm text-gray-600">245ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Error Rate</span>
                <Badge variant="outline" className="text-red-600 border-red-200">0.1%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}