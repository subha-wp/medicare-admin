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
  Plus, 
  Eye, 
  Edit, 
  Trash2,
  DollarSign,
  CreditCard,
  User,
  Stethoscope,
  Calendar,
  Download,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  TrendingDown
} from 'lucide-react'

const payments = [
  {
    id: '1',
    transactionId: 'TXN001234567',
    appointmentId: 'APT001',
    patient: {
      name: 'John Doe',
      phone: '+1 (555) 123-4567'
    },
    doctor: {
      name: 'Dr. Sarah Johnson',
      specialization: 'Cardiology'
    },
    amount: 500,
    status: 'PAID',
    method: 'ONLINE',
    paymentGateway: 'Razorpay',
    gatewayTransactionId: 'pay_MNbAXYZ123456',
    createdAt: '2024-01-15T10:30:00Z',
    paidAt: '2024-01-15T10:32:15Z',
    fees: 15, // Gateway fees
    netAmount: 485
  },
  {
    id: '2',
    transactionId: 'TXN001234568',
    appointmentId: 'APT002',
    patient: {
      name: 'Jane Smith',
      phone: '+1 (555) 234-5678'
    },
    doctor: {
      name: 'Dr. Michael Chen',
      specialization: 'Dermatology'
    },
    amount: 750,
    status: 'PENDING',
    method: 'ONLINE',
    paymentGateway: 'Stripe',
    gatewayTransactionId: 'pi_3MtwBwLkdIwHu7ix28a3tqPa',
    createdAt: '2024-01-14T14:15:00Z',
    paidAt: null,
    fees: 22.5,
    netAmount: 727.5
  },
  {
    id: '3',
    transactionId: 'TXN001234569',
    appointmentId: 'APT003',
    patient: {
      name: 'Bob Wilson',
      phone: '+1 (555) 345-6789'
    },
    doctor: {
      name: 'Dr. Emily Davis',
      specialization: 'Pediatrics'
    },
    amount: 600,
    status: 'PAID',
    method: 'CASH',
    paymentGateway: null,
    gatewayTransactionId: null,
    createdAt: '2024-01-13T16:45:00Z',
    paidAt: '2024-01-13T16:45:00Z',
    fees: 0,
    netAmount: 600
  },
  {
    id: '4',
    transactionId: 'TXN001234570',
    appointmentId: 'APT004',
    patient: {
      name: 'Alice Brown',
      phone: '+1 (555) 456-7890'
    },
    doctor: {
      name: 'Dr. Robert Wilson',
      specialization: 'Orthopedics'
    },
    amount: 800,
    status: 'REFUNDED',
    method: 'ONLINE',
    paymentGateway: 'Razorpay',
    gatewayTransactionId: 'pay_MNbAXYZ123457',
    createdAt: '2024-01-12T11:20:00Z',
    paidAt: '2024-01-12T11:22:30Z',
    refundedAt: '2024-01-13T09:15:00Z',
    fees: 24,
    netAmount: 776,
    refundAmount: 800
  }
]

function getStatusBadge(status: string) {
  switch (status) {
    case 'PENDING':
      return <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50">Pending</Badge>
    case 'PAID':
      return <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Paid</Badge>
    case 'REFUNDED':
      return <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">Refunded</Badge>
    case 'FAILED':
      return <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">Failed</Badge>
    default:
      return <Badge variant="outline">Unknown</Badge>
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'PENDING':
      return <Clock className="h-4 w-4 text-yellow-500" />
    case 'PAID':
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case 'REFUNDED':
    case 'FAILED':
      return <XCircle className="h-4 w-4 text-red-500" />
    default:
      return <Clock className="h-4 w-4 text-gray-500" />
  }
}

function getMethodBadge(method: string) {
  switch (method) {
    case 'ONLINE':
      return <Badge variant="outline" className="text-blue-600 border-blue-200">Online</Badge>
    case 'CASH':
      return <Badge variant="outline" className="text-green-600 border-green-200">Cash</Badge>
    default:
      return <Badge variant="outline">Unknown</Badge>
  }
}

function PaymentDetailsDialog({ payment }: { payment: any }) {
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
          <DialogTitle>Payment Details</DialogTitle>
          <DialogDescription>
            Complete payment information for transaction #{payment.transactionId}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Transaction Info */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3 flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Transaction Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Transaction ID</Label>
                <p className="text-sm text-gray-600 font-mono">{payment.transactionId}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Appointment ID</Label>
                <p className="text-sm text-gray-600">{payment.appointmentId}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Amount</Label>
                <p className="text-sm text-gray-600 font-semibold">₹{payment.amount}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Status</Label>
                <div className="mt-1">{getStatusBadge(payment.status)}</div>
              </div>
              <div>
                <Label className="text-sm font-medium">Method</Label>
                <div className="mt-1">{getMethodBadge(payment.method)}</div>
              </div>
              <div>
                <Label className="text-sm font-medium">Gateway Fees</Label>
                <p className="text-sm text-gray-600">₹{payment.fees}</p>
              </div>
            </div>
          </div>

          {/* Patient & Doctor Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-3 flex items-center">
                <User className="h-5 w-5 mr-2" />
                Patient Information
              </h3>
              <div className="space-y-2">
                <div>
                  <Label className="text-sm font-medium">Name</Label>
                  <p className="text-sm text-gray-600">{payment.patient.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Phone</Label>
                  <p className="text-sm text-gray-600">{payment.patient.phone}</p>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-3 flex items-center">
                <Stethoscope className="h-5 w-5 mr-2" />
                Doctor Information
              </h3>
              <div className="space-y-2">
                <div>
                  <Label className="text-sm font-medium">Name</Label>
                  <p className="text-sm text-gray-600">{payment.doctor.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Specialization</Label>
                  <p className="text-sm text-gray-600">{payment.doctor.specialization}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Gateway Info */}
          {payment.method === 'ONLINE' && (
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-3 flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Payment Gateway Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Gateway</Label>
                  <p className="text-sm text-gray-600">{payment.paymentGateway}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Gateway Transaction ID</Label>
                  <p className="text-sm text-gray-600 font-mono">{payment.gatewayTransactionId}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Net Amount</Label>
                  <p className="text-sm text-gray-600 font-semibold">₹{payment.netAmount}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Gateway Fees</Label>
                  <p className="text-sm text-gray-600">₹{payment.fees}</p>
                </div>
              </div>
            </div>
          )}

          {/* Timeline */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Payment Timeline
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Payment Created</p>
                  <p className="text-xs text-gray-500">{new Date(payment.createdAt).toLocaleString()}</p>
                </div>
              </div>
              {payment.paidAt && (
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Payment Completed</p>
                    <p className="text-xs text-gray-500">{new Date(payment.paidAt).toLocaleString()}</p>
                  </div>
                </div>
              )}
              {payment.refundedAt && (
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Payment Refunded</p>
                    <p className="text-xs text-gray-500">{new Date(payment.refundedAt).toLocaleString()}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Receipt
            </Button>
            {payment.status === 'PAID' && (
              <Button variant="outline" className="text-red-600 border-red-200">
                <XCircle className="h-4 w-4 mr-2" />
                Initiate Refund
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [methodFilter, setMethodFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter
    const matchesMethod = methodFilter === 'all' || payment.method === methodFilter
    return matchesSearch && matchesStatus && matchesMethod
  })

  const stats = {
    total: payments.length,
    totalAmount: payments.reduce((sum, p) => sum + p.amount, 0),
    paid: payments.filter(p => p.status === 'PAID').length,
    paidAmount: payments.filter(p => p.status === 'PAID').reduce((sum, p) => sum + p.amount, 0),
    pending: payments.filter(p => p.status === 'PENDING').length,
    pendingAmount: payments.filter(p => p.status === 'PENDING').reduce((sum, p) => sum + p.amount, 0),
    refunded: payments.filter(p => p.status === 'REFUNDED').length,
    refundedAmount: payments.filter(p => p.status === 'REFUNDED').reduce((sum, p) => sum + (p.refundAmount || 0), 0),
    totalFees: payments.reduce((sum, p) => sum + p.fees, 0),
    netRevenue: payments.filter(p => p.status === 'PAID').reduce((sum, p) => sum + p.netAmount, 0)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
          <p className="text-gray-600 mt-1">Manage all payment transactions and financial records</p>
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
            Manual Payment
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">₹{stats.totalAmount.toLocaleString()}</p>
                <div className="flex items-center space-x-1 text-sm mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-green-600 font-medium">+12.5%</span>
                  <span className="text-gray-500">from last month</span>
                </div>
              </div>
              <DollarSign className="h-10 w-10 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Net Revenue</p>
                <p className="text-3xl font-bold text-green-600">₹{stats.netRevenue.toLocaleString()}</p>
                <p className="text-sm text-gray-500 mt-2">After gateway fees</p>
              </div>
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Payments</p>
                <p className="text-3xl font-bold text-yellow-600">₹{stats.pendingAmount.toLocaleString()}</p>
                <p className="text-sm text-gray-500 mt-2">{stats.pending} transactions</p>
              </div>
              <Clock className="h-10 w-10 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Gateway Fees</p>
                <p className="text-3xl font-bold text-red-600">₹{stats.totalFees.toLocaleString()}</p>
                <p className="text-sm text-gray-500 mt-2">Total fees paid</p>
              </div>
              <CreditCard className="h-10 w-10 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search payments..."
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
                  <SelectItem value="PAID">Paid</SelectItem>
                  <SelectItem value="REFUNDED">Refunded</SelectItem>
                  <SelectItem value="FAILED">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="method">Method</Label>
              <Select value={methodFilter} onValueChange={setMethodFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="ONLINE">Online</SelectItem>
                  <SelectItem value="CASH">Cash</SelectItem>
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

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Transactions ({filteredPayments.length})</CardTitle>
          <CardDescription>
            Complete list of all payment transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    <div>
                      <div className="font-mono text-sm">{payment.transactionId}</div>
                      <div className="text-xs text-gray-500">{payment.appointmentId}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{payment.patient.name}</div>
                      <div className="text-sm text-gray-500">{payment.patient.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{payment.doctor.name}</div>
                      <div className="text-sm text-gray-500">{payment.doctor.specialization}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-semibold text-gray-900">₹{payment.amount}</div>
                      {payment.method === 'ONLINE' && (
                        <div className="text-xs text-gray-500">Net: ₹{payment.netAmount}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {getMethodBadge(payment.method)}
                      {payment.paymentGateway && (
                        <div className="text-xs text-gray-500">{payment.paymentGateway}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm">{new Date(payment.createdAt).toLocaleDateString()}</div>
                      <div className="text-xs text-gray-500">{new Date(payment.createdAt).toLocaleTimeString()}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <PaymentDetailsDialog payment={payment} />
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Receipt
                      </Button>
                      {payment.status === 'PAID' && (
                        <Button variant="outline" size="sm" className="text-red-600">
                          <XCircle className="h-4 w-4 mr-2" />
                          Refund
                        </Button>
                      )}
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