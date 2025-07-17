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
  Eye, 
  Activity,
  User,
  Calendar,
  Download,
  RefreshCw,
  Shield,
  Edit,
  Trash2,
  Plus,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react'

const auditLogs = [
  {
    id: '1',
    adminUserId: 'admin_001',
    adminName: 'Super Admin',
    adminEmail: 'admin@healthcare.com',
    action: 'CHAMBER_APPROVED',
    resource: 'Chamber',
    resourceId: 'chamber_123',
    details: {
      doctorName: 'Dr. Sarah Johnson',
      pharmacyName: 'City Medical Pharmacy',
      previousStatus: 'pending',
      newStatus: 'approved'
    },
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    adminUserId: 'admin_002',
    adminName: 'Employee Admin',
    adminEmail: 'employee@healthcare.com',
    action: 'USER_SUSPENDED',
    resource: 'User',
    resourceId: 'user_456',
    details: {
      userName: 'Dr. Michael Chen',
      userEmail: 'michael.chen@example.com',
      reason: 'Violation of terms of service',
      suspensionDuration: '30 days'
    },
    ipAddress: '192.168.1.101',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    createdAt: '2024-01-14T14:15:00Z'
  },
  {
    id: '3',
    adminUserId: 'admin_001',
    adminName: 'Super Admin',
    adminEmail: 'admin@healthcare.com',
    action: 'PAYMENT_REFUNDED',
    resource: 'Payment',
    resourceId: 'payment_789',
    details: {
      transactionId: 'TXN001234570',
      amount: 800,
      reason: 'Appointment cancelled by doctor',
      refundMethod: 'Original payment method'
    },
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    createdAt: '2024-01-13T16:45:00Z'
  },
  {
    id: '4',
    adminUserId: 'admin_002',
    adminName: 'Employee Admin',
    adminEmail: 'employee@healthcare.com',
    action: 'MEDICAL_RECORD_CREATED',
    resource: 'MedicalRecord',
    resourceId: 'record_101',
    details: {
      patientName: 'John Doe',
      doctorName: 'Dr. Sarah Johnson',
      appointmentId: 'APT001',
      diagnosis: 'Hypertension, Stage 1'
    },
    ipAddress: '192.168.1.101',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    createdAt: '2024-01-12T11:20:00Z'
  },
  {
    id: '5',
    adminUserId: 'admin_001',
    adminName: 'Super Admin',
    adminEmail: 'admin@healthcare.com',
    action: 'ADMIN_USER_CREATED',
    resource: 'AdminUser',
    resourceId: 'admin_003',
    details: {
      newAdminName: 'New Employee',
      newAdminEmail: 'newemployee@healthcare.com',
      role: 'EMPLOYEE',
      permissions: ['users.read', 'chambers.read', 'appointments.read']
    },
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    createdAt: '2024-01-11T09:30:00Z'
  }
]

function getActionBadge(action: string) {
  switch (action) {
    case 'CHAMBER_APPROVED':
    case 'CHAMBER_REJECTED':
      return <Badge variant="outline" className="text-purple-600 border-purple-200">Chamber</Badge>
    case 'USER_CREATED':
    case 'USER_UPDATED':
    case 'USER_SUSPENDED':
    case 'USER_ACTIVATED':
      return <Badge variant="outline" className="text-blue-600 border-blue-200">User</Badge>
    case 'PAYMENT_PROCESSED':
    case 'PAYMENT_REFUNDED':
      return <Badge variant="outline" className="text-green-600 border-green-200">Payment</Badge>
    case 'MEDICAL_RECORD_CREATED':
    case 'MEDICAL_RECORD_UPDATED':
      return <Badge variant="outline" className="text-orange-600 border-orange-200">Medical</Badge>
    case 'ADMIN_USER_CREATED':
    case 'ADMIN_USER_UPDATED':
    case 'ADMIN_USER_DELETED':
      return <Badge variant="outline" className="text-red-600 border-red-200">Admin</Badge>
    default:
      return <Badge variant="outline" className="text-gray-600 border-gray-200">System</Badge>
  }
}

function getActionIcon(action: string) {
  switch (action) {
    case 'CHAMBER_APPROVED':
    case 'USER_ACTIVATED':
    case 'PAYMENT_PROCESSED':
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case 'CHAMBER_REJECTED':
    case 'USER_SUSPENDED':
    case 'PAYMENT_REFUNDED':
      return <XCircle className="h-4 w-4 text-red-500" />
    case 'USER_CREATED':
    case 'MEDICAL_RECORD_CREATED':
    case 'ADMIN_USER_CREATED':
      return <Plus className="h-4 w-4 text-blue-500" />
    case 'USER_UPDATED':
    case 'MEDICAL_RECORD_UPDATED':
    case 'ADMIN_USER_UPDATED':
      return <Edit className="h-4 w-4 text-orange-500" />
    case 'ADMIN_USER_DELETED':
      return <Trash2 className="h-4 w-4 text-red-500" />
    default:
      return <Activity className="h-4 w-4 text-gray-500" />
  }
}

function AuditLogDetailsDialog({ log }: { log: any }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4 mr-2" />
          View
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Audit Log Details</DialogTitle>
          <DialogDescription>
            Complete audit trail information for log #{log.id}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Action Info */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3 flex items-center">
              {getActionIcon(log.action)}
              <span className="ml-2">Action Information</span>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Action</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm text-gray-600">{log.action}</span>
                  {getActionBadge(log.action)}
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Resource</Label>
                <p className="text-sm text-gray-600">{log.resource}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Resource ID</Label>
                <p className="text-sm text-gray-600 font-mono">{log.resourceId}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Timestamp</Label>
                <p className="text-sm text-gray-600">{new Date(log.createdAt).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Admin Info */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3 flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Administrator Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Name</Label>
                <p className="text-sm text-gray-600">{log.adminName}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Email</Label>
                <p className="text-sm text-gray-600">{log.adminEmail}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Admin ID</Label>
                <p className="text-sm text-gray-600 font-mono">{log.adminUserId}</p>
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3 flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Technical Details
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label className="text-sm font-medium">IP Address</Label>
                <p className="text-sm text-gray-600 font-mono">{log.ipAddress}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">User Agent</Label>
                <p className="text-sm text-gray-600 break-all">{log.userAgent}</p>
              </div>
            </div>
          </div>

          {/* Action Details */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3">Action Details</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                {JSON.stringify(log.details, null, 2)}
              </pre>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Log
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function AuditLogsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [actionFilter, setActionFilter] = useState('all')
  const [resourceFilter, setResourceFilter] = useState('all')
  const [adminFilter, setAdminFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.adminName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.resource.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesAction = actionFilter === 'all' || log.action.includes(actionFilter)
    const matchesResource = resourceFilter === 'all' || log.resource === resourceFilter
    const matchesAdmin = adminFilter === 'all' || log.adminUserId === adminFilter
    return matchesSearch && matchesAction && matchesResource && matchesAdmin
  })

  const stats = {
    total: auditLogs.length,
    today: auditLogs.filter(l => {
      const logDate = new Date(l.createdAt)
      const today = new Date()
      return logDate.toDateString() === today.toDateString()
    }).length,
    thisWeek: auditLogs.filter(l => {
      const logDate = new Date(l.createdAt)
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      return logDate >= weekAgo
    }).length,
    uniqueAdmins: [...new Set(auditLogs.map(l => l.adminUserId))].length
  }

  const uniqueActions = [...new Set(auditLogs.map(l => l.action))]
  const uniqueResources = [...new Set(auditLogs.map(l => l.resource))]
  const uniqueAdmins = [...new Set(auditLogs.map(l => ({ id: l.adminUserId, name: l.adminName })))]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Audit Logs</h1>
          <p className="text-gray-600 mt-1">Track all administrative actions and system changes</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Logs</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Activity className="h-10 w-10 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today</p>
                <p className="text-3xl font-bold text-green-600">{stats.today}</p>
              </div>
              <Calendar className="h-10 w-10 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-3xl font-bold text-purple-600">{stats.thisWeek}</p>
              </div>
              <Activity className="h-10 w-10 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Admins</p>
                <p className="text-3xl font-bold text-orange-600">{stats.uniqueAdmins}</p>
              </div>
              <Shield className="h-10 w-10 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Audit Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="action">Action</Label>
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  {uniqueActions.map(action => (
                    <SelectItem key={action} value={action}>{action}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="resource">Resource</Label>
              <Select value={resourceFilter} onValueChange={setResourceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by resource" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Resources</SelectItem>
                  {uniqueResources.map(resource => (
                    <SelectItem key={resource} value={resource}>{resource}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="admin">Administrator</Label>
              <Select value={adminFilter} onValueChange={setAdminFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by admin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Admins</SelectItem>
                  {uniqueAdmins.map(admin => (
                    <SelectItem key={admin.id} value={admin.id}>{admin.name}</SelectItem>
                  ))}
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

      {/* Audit Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Trail ({filteredLogs.length})</CardTitle>
          <CardDescription>
            Complete audit trail of all administrative actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Administrator</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getActionIcon(log.action)}
                      <div>
                        <div className="font-medium">{log.action}</div>
                        <div className="mt-1">{getActionBadge(log.action)}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{log.adminName}</div>
                      <div className="text-sm text-gray-500">{log.adminEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{log.resource}</div>
                      <div className="text-sm text-gray-500 font-mono">{log.resourceId}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      {Object.entries(log.details).slice(0, 2).map(([key, value]) => (
                        <div key={key} className="text-sm">
                          <span className="font-medium">{key}:</span> {String(value)}
                        </div>
                      ))}
                      {Object.keys(log.details).length > 2 && (
                        <div className="text-xs text-gray-500">
                          +{Object.keys(log.details).length - 2} more
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-sm">{log.ipAddress}</span>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm">{new Date(log.createdAt).toLocaleDateString()}</div>
                      <div className="text-xs text-gray-500">{new Date(log.createdAt).toLocaleTimeString()}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <AuditLogDetailsDialog log={log} />
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