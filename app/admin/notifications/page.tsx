'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
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
  Bell,
  Send,
  Users,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  RefreshCw,
  Filter
} from 'lucide-react'

const notifications = [
  {
    id: '1',
    title: 'Chamber Verification Required',
    message: 'Dr. Sarah Johnson has submitted a new chamber for verification at City Medical Pharmacy.',
    type: 'CHAMBER_VERIFICATION',
    priority: 'high',
    recipients: ['admin@healthcare.com'],
    status: 'sent',
    createdAt: '2024-01-15T10:30:00Z',
    sentAt: '2024-01-15T10:31:00Z',
    readCount: 1,
    totalRecipients: 1
  },
  {
    id: '2',
    title: 'Appointment Booking Confirmation',
    message: 'Your appointment with Dr. Michael Chen has been confirmed for January 16, 2024 at 2:30 PM.',
    type: 'APPOINTMENT_BOOKED',
    priority: 'medium',
    recipients: ['john.doe@example.com'],
    status: 'sent',
    createdAt: '2024-01-14T14:15:00Z',
    sentAt: '2024-01-14T14:16:00Z',
    readCount: 1,
    totalRecipients: 1
  },
  {
    id: '3',
    title: 'Payment Received',
    message: 'Payment of ₹750 has been successfully received for your appointment.',
    type: 'PAYMENT_RECEIVED',
    priority: 'low',
    recipients: ['jane.smith@example.com'],
    status: 'sent',
    createdAt: '2024-01-13T16:45:00Z',
    sentAt: '2024-01-13T16:46:00Z',
    readCount: 1,
    totalRecipients: 1
  },
  {
    id: '4',
    title: 'System Maintenance Notice',
    message: 'Scheduled maintenance will be performed on January 20, 2024 from 2:00 AM to 4:00 AM.',
    type: 'GENERAL',
    priority: 'high',
    recipients: ['all_users'],
    status: 'scheduled',
    createdAt: '2024-01-12T11:20:00Z',
    scheduledAt: '2024-01-19T18:00:00Z',
    readCount: 0,
    totalRecipients: 2847
  }
]

function getTypeBadge(type: string) {
  switch (type) {
    case 'APPOINTMENT_BOOKED':
      return <Badge variant="outline" className="text-blue-600 border-blue-200">Appointment</Badge>
    case 'APPOINTMENT_CANCELLED':
      return <Badge variant="outline" className="text-red-600 border-red-200">Cancellation</Badge>
    case 'PAYMENT_RECEIVED':
      return <Badge variant="outline" className="text-green-600 border-green-200">Payment</Badge>
    case 'CHAMBER_VERIFICATION':
      return <Badge variant="outline" className="text-purple-600 border-purple-200">Chamber</Badge>
    case 'GENERAL':
      return <Badge variant="outline" className="text-gray-600 border-gray-200">General</Badge>
    default:
      return <Badge variant="outline">Unknown</Badge>
  }
}

function getPriorityBadge(priority: string) {
  switch (priority) {
    case 'high':
      return <Badge variant="destructive" className="text-xs">High</Badge>
    case 'medium':
      return <Badge variant="outline" className="text-xs text-orange-600 border-orange-200">Medium</Badge>
    case 'low':
      return <Badge variant="outline" className="text-xs text-gray-600">Low</Badge>
    default:
      return <Badge variant="outline" className="text-xs">Normal</Badge>
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case 'sent':
      return <Badge variant="outline" className="text-green-600 border-green-200">Sent</Badge>
    case 'scheduled':
      return <Badge variant="outline" className="text-blue-600 border-blue-200">Scheduled</Badge>
    case 'draft':
      return <Badge variant="outline" className="text-gray-600 border-gray-200">Draft</Badge>
    case 'failed':
      return <Badge variant="outline" className="text-red-600 border-red-200">Failed</Badge>
    default:
      return <Badge variant="outline">Unknown</Badge>
  }
}

function getTypeIcon(type: string) {
  switch (type) {
    case 'APPOINTMENT_BOOKED':
    case 'APPOINTMENT_CANCELLED':
      return <Calendar className="h-4 w-4 text-blue-500" />
    case 'PAYMENT_RECEIVED':
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case 'CHAMBER_VERIFICATION':
      return <AlertCircle className="h-4 w-4 text-purple-500" />
    case 'GENERAL':
      return <Info className="h-4 w-4 text-gray-500" />
    default:
      return <Bell className="h-4 w-4 text-gray-500" />
  }
}

function NotificationDetailsDialog({ notification }: { notification: any }) {
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
          <DialogTitle>Notification Details</DialogTitle>
          <DialogDescription>
            Complete information about notification #{notification.id}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3 flex items-center">
              {getTypeIcon(notification.type)}
              <span className="ml-2">Notification Information</span>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Title</Label>
                <p className="text-sm text-gray-600">{notification.title}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Type</Label>
                <div className="mt-1">{getTypeBadge(notification.type)}</div>
              </div>
              <div>
                <Label className="text-sm font-medium">Priority</Label>
                <div className="mt-1">{getPriorityBadge(notification.priority)}</div>
              </div>
              <div>
                <Label className="text-sm font-medium">Status</Label>
                <div className="mt-1">{getStatusBadge(notification.status)}</div>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3">Message Content</h3>
            <p className="text-gray-700 leading-relaxed">{notification.message}</p>
          </div>

          {/* Recipients & Stats */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3 flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Recipients & Statistics
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Total Recipients</Label>
                <p className="text-sm text-gray-600">{notification.totalRecipients.toLocaleString()}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Read Count</Label>
                <p className="text-sm text-gray-600">{notification.readCount.toLocaleString()}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Read Rate</Label>
                <p className="text-sm text-gray-600">
                  {((notification.readCount / notification.totalRecipients) * 100).toFixed(1)}%
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium">Delivery Status</Label>
                <p className="text-sm text-gray-600">
                  {notification.status === 'sent' ? 'Delivered' : 'Pending'}
                </p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3">Timeline</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Created</p>
                  <p className="text-xs text-gray-500">{new Date(notification.createdAt).toLocaleString()}</p>
                </div>
              </div>
              {notification.sentAt && (
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Sent</p>
                    <p className="text-xs text-gray-500">{new Date(notification.sentAt).toLocaleString()}</p>
                  </div>
                </div>
              )}
              {notification.scheduledAt && (
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Scheduled</p>
                    <p className="text-xs text-gray-500">{new Date(notification.scheduledAt).toLocaleString()}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            {notification.status === 'draft' && (
              <Button className="bg-blue-600 text-white hover:bg-blue-700">
                <Send className="h-4 w-4 mr-2" />
                Send Now
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function CreateNotificationDialog() {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [type, setType] = useState('')
  const [priority, setPriority] = useState('medium')
  const [recipients, setRecipients] = useState('all_users')

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Notification
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Notification</DialogTitle>
          <DialogDescription>
            Send notifications to users on your platform
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Notification title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GENERAL">General</SelectItem>
                  <SelectItem value="APPOINTMENT_BOOKED">Appointment Booked</SelectItem>
                  <SelectItem value="APPOINTMENT_CANCELLED">Appointment Cancelled</SelectItem>
                  <SelectItem value="PAYMENT_RECEIVED">Payment Received</SelectItem>
                  <SelectItem value="CHAMBER_VERIFICATION">Chamber Verification</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="recipients">Recipients</Label>
              <Select value={recipients} onValueChange={setRecipients}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_users">All Users</SelectItem>
                  <SelectItem value="doctors">All Doctors</SelectItem>
                  <SelectItem value="pharmacies">All Pharmacies</SelectItem>
                  <SelectItem value="patients">All Patients</SelectItem>
                  <SelectItem value="admins">Admin Users</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Enter your notification message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="outline">Save as Draft</Button>
            <Button>
              <Send className="h-4 w-4 mr-2" />
              Send Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function NotificationsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === 'all' || notification.type === typeFilter
    const matchesStatus = statusFilter === 'all' || notification.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || notification.priority === priorityFilter
    return matchesSearch && matchesType && matchesStatus && matchesPriority
  })

  const stats = {
    total: notifications.length,
    sent: notifications.filter(n => n.status === 'sent').length,
    scheduled: notifications.filter(n => n.status === 'scheduled').length,
    draft: notifications.filter(n => n.status === 'draft').length,
    totalRecipients: notifications.reduce((sum, n) => sum + n.totalRecipients, 0),
    totalReads: notifications.reduce((sum, n) => sum + n.readCount, 0)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-1">Manage and send notifications to platform users</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <CreateNotificationDialog />
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
              <Bell className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sent</p>
                <p className="text-2xl font-bold text-green-600">{stats.sent}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Scheduled</p>
                <p className="text-2xl font-bold text-blue-600">{stats.scheduled}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Draft</p>
                <p className="text-2xl font-bold text-gray-600">{stats.draft}</p>
              </div>
              <Edit className="h-8 w-8 text-gray-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Recipients</p>
                <p className="text-2xl font-bold text-purple-600">{stats.totalRecipients.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Read Rate</p>
                <p className="text-2xl font-bold text-orange-600">
                  {stats.totalRecipients > 0 ? ((stats.totalReads / stats.totalRecipients) * 100).toFixed(1) : 0}%
                </p>
              </div>
              <Eye className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="GENERAL">General</SelectItem>
                  <SelectItem value="APPOINTMENT_BOOKED">Appointment Booked</SelectItem>
                  <SelectItem value="APPOINTMENT_CANCELLED">Appointment Cancelled</SelectItem>
                  <SelectItem value="PAYMENT_RECEIVED">Payment Received</SelectItem>
                  <SelectItem value="CHAMBER_VERIFICATION">Chamber Verification</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications ({filteredNotifications.length})</CardTitle>
          <CardDescription>
            Manage all platform notifications and communications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Recipients</TableHead>
                <TableHead>Read Rate</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNotifications.map((notification) => (
                <TableRow key={notification.id}>
                  <TableCell>
                    <div className="max-w-xs">
                      <div className="font-medium truncate">{notification.title}</div>
                      <div className="text-sm text-gray-500 truncate">{notification.message}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getTypeBadge(notification.type)}</TableCell>
                  <TableCell>{getPriorityBadge(notification.priority)}</TableCell>
                  <TableCell>{getStatusBadge(notification.status)}</TableCell>
                  <TableCell>
                    <span className="font-medium">{notification.totalRecipients.toLocaleString()}</span>
                  </TableCell>
                  <TableCell>
                    <div>
                      <span className="font-medium">
                        {((notification.readCount / notification.totalRecipients) * 100).toFixed(1)}%
                      </span>
                      <div className="text-xs text-gray-500">
                        {notification.readCount.toLocaleString()} reads
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm">{new Date(notification.createdAt).toLocaleDateString()}</div>
                      <div className="text-xs text-gray-500">{new Date(notification.createdAt).toLocaleTimeString()}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <NotificationDetailsDialog notification={notification} />
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