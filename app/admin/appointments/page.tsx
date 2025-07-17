'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  Trash2,
  Calendar,
  Clock,
  User,
  Stethoscope,
  Building,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  RefreshCw
} from 'lucide-react'

const appointments = [
  {
    id: '1',
    patient: {
      name: 'John Doe',
      phone: '+1 (555) 123-4567',
      age: 35
    },
    doctor: {
      name: 'Dr. Sarah Johnson',
      specialization: 'Cardiology'
    },
    pharmacy: {
      name: 'City Medical Pharmacy',
      address: '123 Main St'
    },
    date: '2024-01-15',
    time: '10:00 AM',
    slotNumber: 1,
    status: 'CONFIRMED',
    paymentStatus: 'PAID',
    paymentMethod: 'ONLINE',
    amount: 500,
    createdAt: '2024-01-10T08:30:00Z'
  },
  {
    id: '2',
    patient: {
      name: 'Jane Smith',
      phone: '+1 (555) 234-5678',
      age: 28
    },
    doctor: {
      name: 'Dr. Michael Chen',
      specialization: 'Dermatology'
    },
    pharmacy: {
      name: 'Health Plus Pharmacy',
      address: '456 Oak Ave'
    },
    date: '2024-01-15',
    time: '2:30 PM',
    slotNumber: 3,
    status: 'PENDING',
    paymentStatus: 'PENDING',
    paymentMethod: 'ONLINE',
    amount: 750,
    createdAt: '2024-01-12T14:15:00Z'
  },
  {
    id: '3',
    patient: {
      name: 'Bob Wilson',
      phone: '+1 (555) 345-6789',
      age: 42
    },
    doctor: {
      name: 'Dr. Emily Davis',
      specialization: 'Pediatrics'
    },
    pharmacy: {
      name: 'MedCare Pharmacy',
      address: '789 Pine St'
    },
    date: '2024-01-14',
    time: '4:00 PM',
    slotNumber: 5,
    status: 'COMPLETED',
    paymentStatus: 'PAID',
    paymentMethod: 'CASH',
    amount: 600,
    createdAt: '2024-01-08T11:20:00Z'
  },
  {
    id: '4',
    patient: {
      name: 'Alice Brown',
      phone: '+1 (555) 456-7890',
      age: 31
    },
    doctor: {
      name: 'Dr. Robert Wilson',
      specialization: 'Orthopedics'
    },
    pharmacy: {
      name: 'Prime Health Pharmacy',
      address: '321 Elm St'
    },
    date: '2024-01-16',
    time: '11:30 AM',
    slotNumber: 2,
    status: 'CANCELLED',
    paymentStatus: 'REFUNDED',
    paymentMethod: 'ONLINE',
    amount: 800,
    createdAt: '2024-01-11T16:45:00Z'
  }
]

function getStatusBadge(status: string) {
  switch (status) {
    case 'PENDING':
      return <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50">Pending</Badge>
    case 'CONFIRMED':
      return <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">Confirmed</Badge>
    case 'COMPLETED':
      return <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Completed</Badge>
    case 'CANCELLED':
      return <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">Cancelled</Badge>
    default:
      return <Badge variant="outline">Unknown</Badge>
  }
}

function getPaymentStatusBadge(status: string) {
  switch (status) {
    case 'PENDING':
      return <Badge variant="outline" className="text-yellow-600 border-yellow-200">Pending</Badge>
    case 'PAID':
      return <Badge variant="outline" className="text-green-600 border-green-200">Paid</Badge>
    case 'REFUNDED':
      return <Badge variant="outline" className="text-red-600 border-red-200">Refunded</Badge>
    default:
      return <Badge variant="outline">Unknown</Badge>
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'PENDING':
      return <Clock className="h-4 w-4 text-yellow-500" />
    case 'CONFIRMED':
      return <CheckCircle className="h-4 w-4 text-blue-500" />
    case 'COMPLETED':
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case 'CANCELLED':
      return <XCircle className="h-4 w-4 text-red-500" />
    default:
      return <AlertCircle className="h-4 w-4 text-gray-500" />
  }
}

function AppointmentDetailsDialog({ appointment }: { appointment: any }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4 mr-2" />
          View
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Appointment Details</DialogTitle>
          <DialogDescription>
            Complete information about appointment #{appointment.id}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Appointment Info */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Appointment Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Date</Label>
                <p className="text-sm text-gray-600">{new Date(appointment.date).toLocaleDateString()}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Time</Label>
                <p className="text-sm text-gray-600">{appointment.time}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Slot Number</Label>
                <p className="text-sm text-gray-600">#{appointment.slotNumber}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Status</Label>
                <div className="mt-1">{getStatusBadge(appointment.status)}</div>
              </div>
            </div>
          </div>

          {/* Patient Info */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Patient Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Name</Label>
                <p className="text-sm text-gray-600">{appointment.patient.name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Phone</Label>
                <p className="text-sm text-gray-600">{appointment.patient.phone}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Age</Label>
                <p className="text-sm text-gray-600">{appointment.patient.age} years</p>
              </div>
            </div>
          </div>

          {/* Doctor Info */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3 flex items-center">
              <Stethoscope className="h-5 w-5 mr-2" />
              Doctor Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Name</Label>
                <p className="text-sm text-gray-600">{appointment.doctor.name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Specialization</Label>
                <p className="text-sm text-gray-600">{appointment.doctor.specialization}</p>
              </div>
            </div>
          </div>

          {/* Pharmacy Info */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3 flex items-center">
              <Building className="h-5 w-5 mr-2" />
              Pharmacy Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Name</Label>
                <p className="text-sm text-gray-600">{appointment.pharmacy.name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Address</Label>
                <p className="text-sm text-gray-600">{appointment.pharmacy.address}</p>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3 flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              Payment Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Amount</Label>
                <p className="text-sm text-gray-600">₹{appointment.amount}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Method</Label>
                <p className="text-sm text-gray-600">{appointment.paymentMethod}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Status</Label>
                <div className="mt-1">{getPaymentStatusBadge(appointment.paymentStatus)}</div>
              </div>
              <div>
                <Label className="text-sm font-medium">Created</Label>
                <p className="text-sm text-gray-600">{new Date(appointment.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit Appointment
            </Button>
            {appointment.status === 'PENDING' && (
              <Button className="bg-green-600 text-white hover:bg-green-700">
                <CheckCircle className="h-4 w-4 mr-2" />
                Confirm
              </Button>
            )}
            {appointment.status !== 'CANCELLED' && appointment.status !== 'COMPLETED' && (
              <Button variant="outline" className="text-red-600 border-red-200">
                <XCircle className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [paymentFilter, setPaymentFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter
    const matchesPayment = paymentFilter === 'all' || appointment.paymentStatus === paymentFilter
    return matchesSearch && matchesStatus && matchesPayment
  })

  const stats = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === 'PENDING').length,
    confirmed: appointments.filter(a => a.status === 'CONFIRMED').length,
    completed: appointments.filter(a => a.status === 'COMPLETED').length,
    cancelled: appointments.filter(a => a.status === 'CANCELLED').length,
    totalRevenue: appointments.filter(a => a.paymentStatus === 'PAID').reduce((sum, a) => sum + a.amount, 0)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600 mt-1">Manage all appointment bookings and schedules</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Appointment
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Confirmed</p>
                <p className="text-2xl font-bold text-blue-600">{stats.confirmed}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cancelled</p>
                <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-bold text-green-600">₹{stats.totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search appointments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="payment">Payment</Label>
              <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by payment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Payments</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="PAID">Paid</SelectItem>
                  <SelectItem value="REFUNDED">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="date">Date Range</Label>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Appointments ({filteredAppointments.length})</CardTitle>
          <CardDescription>
            Complete list of all appointment bookings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{appointment.patient.name}</div>
                      <div className="text-sm text-gray-500">{appointment.patient.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{appointment.doctor.name}</div>
                      <div className="text-sm text-gray-500">{appointment.doctor.specialization}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{new Date(appointment.date).toLocaleDateString()}</div>
                      <div className="text-sm text-gray-500">{appointment.time} (Slot #{appointment.slotNumber})</div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {getPaymentStatusBadge(appointment.paymentStatus)}
                      <div className="text-xs text-gray-500">{appointment.paymentMethod}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-green-600">₹{appointment.amount}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <AppointmentDetailsDialog appointment={appointment} />
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}