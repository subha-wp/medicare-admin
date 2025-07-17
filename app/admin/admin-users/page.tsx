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
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Trash2,
  Shield,
  User,
  Calendar,
  RefreshCw,
  UserCheck,
  UserX,
  Crown,
  Settings
} from 'lucide-react'

const adminUsers = [
  {
    id: 'admin_001',
    name: 'Super Admin',
    email: 'admin@healthcare.com',
    role: 'SUPER_ADMIN',
    permissions: ['*'], // All permissions
    isActive: true,
    lastLogin: '2024-01-15T10:30:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    createdBy: 'system'
  },
  {
    id: 'admin_002',
    name: 'Employee Admin',
    email: 'employee@healthcare.com',
    role: 'EMPLOYEE',
    permissions: [
      'users.read',
      'users.update',
      'chambers.read',
      'chambers.update',
      'appointments.read',
      'appointments.update',
      'medical-records.read'
    ],
    isActive: true,
    lastLogin: '2024-01-14T14:15:00Z',
    createdAt: '2024-01-05T09:00:00Z',
    createdBy: 'admin_001'
  },
  {
    id: 'admin_003',
    name: 'Support Staff',
    email: 'support@healthcare.com',
    role: 'EMPLOYEE',
    permissions: [
      'users.read',
      'appointments.read',
      'notifications.create',
      'notifications.read'
    ],
    isActive: true,
    lastLogin: '2024-01-13T16:45:00Z',
    createdAt: '2024-01-08T11:30:00Z',
    createdBy: 'admin_001'
  },
  {
    id: 'admin_004',
    name: 'Former Employee',
    email: 'former@healthcare.com',
    role: 'EMPLOYEE',
    permissions: [
      'users.read',
      'chambers.read'
    ],
    isActive: false,
    lastLogin: '2024-01-01T12:00:00Z',
    createdAt: '2023-12-15T10:00:00Z',
    createdBy: 'admin_001'
  }
]

const availablePermissions = [
  { id: 'users.read', name: 'View Users', category: 'Users' },
  { id: 'users.create', name: 'Create Users', category: 'Users' },
  { id: 'users.update', name: 'Update Users', category: 'Users' },
  { id: 'users.delete', name: 'Delete Users', category: 'Users' },
  { id: 'chambers.read', name: 'View Chambers', category: 'Chambers' },
  { id: 'chambers.create', name: 'Create Chambers', category: 'Chambers' },
  { id: 'chambers.update', name: 'Update Chambers', category: 'Chambers' },
  { id: 'chambers.delete', name: 'Delete Chambers', category: 'Chambers' },
  { id: 'chambers.verify', name: 'Verify Chambers', category: 'Chambers' },
  { id: 'appointments.read', name: 'View Appointments', category: 'Appointments' },
  { id: 'appointments.create', name: 'Create Appointments', category: 'Appointments' },
  { id: 'appointments.update', name: 'Update Appointments', category: 'Appointments' },
  { id: 'appointments.delete', name: 'Delete Appointments', category: 'Appointments' },
  { id: 'medical-records.read', name: 'View Medical Records', category: 'Medical Records' },
  { id: 'medical-records.create', name: 'Create Medical Records', category: 'Medical Records' },
  { id: 'medical-records.update', name: 'Update Medical Records', category: 'Medical Records' },
  { id: 'medical-records.delete', name: 'Delete Medical Records', category: 'Medical Records' },
  { id: 'payments.read', name: 'View Payments', category: 'Payments' },
  { id: 'payments.refund', name: 'Process Refunds', category: 'Payments' },
  { id: 'notifications.read', name: 'View Notifications', category: 'Notifications' },
  { id: 'notifications.create', name: 'Create Notifications', category: 'Notifications' },
  { id: 'notifications.update', name: 'Update Notifications', category: 'Notifications' },
  { id: 'notifications.delete', name: 'Delete Notifications', category: 'Notifications' },
  { id: 'analytics.read', name: 'View Analytics', category: 'Analytics' },
  { id: 'audit-logs.read', name: 'View Audit Logs', category: 'System' },
  { id: 'admin-users.read', name: 'View Admin Users', category: 'System' },
  { id: 'admin-users.create', name: 'Create Admin Users', category: 'System' },
  { id: 'admin-users.update', name: 'Update Admin Users', category: 'System' },
  { id: 'admin-users.delete', name: 'Delete Admin Users', category: 'System' },
  { id: 'system.settings', name: 'System Settings', category: 'System' }
]

function getRoleBadge(role: string) {
  switch (role) {
    case 'SUPER_ADMIN':
      return <Badge variant="destructive" className="text-xs">Super Admin</Badge>
    case 'EMPLOYEE':
      return <Badge variant="outline" className="text-xs text-blue-600 border-blue-200">Employee</Badge>
    default:
      return <Badge variant="outline" className="text-xs">Unknown</Badge>
  }
}

function getStatusBadge(isActive: boolean) {
  return isActive ? (
    <Badge variant="outline" className="text-green-600 border-green-200">Active</Badge>
  ) : (
    <Badge variant="outline" className="text-red-600 border-red-200">Inactive</Badge>
  )
}

function AdminUserDetailsDialog({ adminUser }: { adminUser: any }) {
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
          <DialogTitle>Admin User Details</DialogTitle>
          <DialogDescription>
            Complete information about {adminUser.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3 flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Basic Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Name</Label>
                <p className="text-sm text-gray-600">{adminUser.name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Email</Label>
                <p className="text-sm text-gray-600">{adminUser.email}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Role</Label>
                <div className="mt-1">{getRoleBadge(adminUser.role)}</div>
              </div>
              <div>
                <Label className="text-sm font-medium">Status</Label>
                <div className="mt-1">{getStatusBadge(adminUser.isActive)}</div>
              </div>
              <div>
                <Label className="text-sm font-medium">Created</Label>
                <p className="text-sm text-gray-600">{new Date(adminUser.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Last Login</Label>
                <p className="text-sm text-gray-600">
                  {adminUser.lastLogin ? new Date(adminUser.lastLogin).toLocaleDateString() : 'Never'}
                </p>
              </div>
            </div>
          </div>

          {/* Permissions */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3 flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Permissions
            </h3>
            {adminUser.permissions.includes('*') ? (
              <div className="flex items-center space-x-2">
                <Crown className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium text-yellow-600">All Permissions (Super Admin)</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {adminUser.permissions.map((permission: string) => {
                  const permissionInfo = availablePermissions.find(p => p.id === permission)
                  return (
                    <div key={permission} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">
                        {permissionInfo ? permissionInfo.name : permission}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit User
            </Button>
            {adminUser.isActive ? (
              <Button variant="outline" className="text-red-600 border-red-200">
                <UserX className="h-4 w-4 mr-2" />
                Deactivate
              </Button>
            ) : (
              <Button variant="outline" className="text-green-600 border-green-200">
                <UserCheck className="h-4 w-4 mr-2" />
                Activate
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function CreateAdminUserDialog() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('EMPLOYEE')
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (checked) {
      setSelectedPermissions([...selectedPermissions, permissionId])
    } else {
      setSelectedPermissions(selectedPermissions.filter(p => p !== permissionId))
    }
  }

  const groupedPermissions = availablePermissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = []
    }
    acc[permission.category].push(permission)
    return acc
  }, {} as Record<string, typeof availablePermissions>)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Admin User
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Create New Admin User</DialogTitle>
          <DialogDescription>
            Add a new administrator to your platform
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="role">Role</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EMPLOYEE">Employee</SelectItem>
                <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {role === 'EMPLOYEE' && (
            <div>
              <Label>Permissions</Label>
              <div className="border rounded-lg p-4 max-h-96 overflow-y-auto">
                {Object.entries(groupedPermissions).map(([category, permissions]) => (
                  <div key={category} className="mb-4">
                    <h4 className="font-medium text-sm text-gray-700 mb-2">{category}</h4>
                    <div className="space-y-2 ml-4">
                      {permissions.map((permission) => (
                        <div key={permission.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={permission.id}
                            checked={selectedPermissions.includes(permission.id)}
                            onCheckedChange={(checked) => 
                              handlePermissionChange(permission.id, checked as boolean)
                            }
                          />
                          <Label htmlFor={permission.id} className="text-sm">
                            {permission.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <Button variant="outline">Cancel</Button>
            <Button>Create Admin User</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredAdminUsers = adminUsers.filter(adminUser => {
    const matchesSearch = adminUser.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         adminUser.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === 'all' || adminUser.role === roleFilter
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && adminUser.isActive) ||
                         (statusFilter === 'inactive' && !adminUser.isActive)
    return matchesSearch && matchesRole && matchesStatus
  })

  const stats = {
    total: adminUsers.length,
    active: adminUsers.filter(u => u.isActive).length,
    inactive: adminUsers.filter(u => !u.isActive).length,
    superAdmins: adminUsers.filter(u => u.role === 'SUPER_ADMIN').length,
    employees: adminUsers.filter(u => u.role === 'EMPLOYEE').length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Users</h1>
          <p className="text-gray-600 mt-1">Manage administrator accounts and permissions</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <CreateAdminUserDialog />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Admins</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Shield className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Inactive</p>
                <p className="text-2xl font-bold text-red-600">{stats.inactive}</p>
              </div>
              <UserX className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Super Admins</p>
                <p className="text-2xl font-bold text-purple-600">{stats.superAdmins}</p>
              </div>
              <Crown className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Employees</p>
                <p className="text-2xl font-bold text-blue-600">{stats.employees}</p>
              </div>
              <User className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Admin Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search admin users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                  <SelectItem value="EMPLOYEE">Employee</SelectItem>
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Admin Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Admin Users ({filteredAdminUsers.length})</CardTitle>
          <CardDescription>
            Manage administrator accounts and their permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAdminUsers.map((adminUser) => (
                <TableRow key={adminUser.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {adminUser.role === 'SUPER_ADMIN' && (
                        <Crown className="h-4 w-4 text-yellow-500" />
                      )}
                      <div>
                        <div className="font-medium">{adminUser.name}</div>
                        <div className="text-sm text-gray-500">ID: {adminUser.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{adminUser.email}</TableCell>
                  <TableCell>{getRoleBadge(adminUser.role)}</TableCell>
                  <TableCell>{getStatusBadge(adminUser.isActive)}</TableCell>
                  <TableCell>
                    {adminUser.permissions.includes('*') ? (
                      <Badge variant="outline" className="text-yellow-600 border-yellow-200">
                        All Permissions
                      </Badge>
                    ) : (
                      <span className="text-sm text-gray-600">
                        {adminUser.permissions.length} permissions
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div>
                      {adminUser.lastLogin ? (
                        <>
                          <div className="text-sm">{new Date(adminUser.lastLogin).toLocaleDateString()}</div>
                          <div className="text-xs text-gray-500">{new Date(adminUser.lastLogin).toLocaleTimeString()}</div>
                        </>
                      ) : (
                        <span className="text-sm text-gray-500">Never</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <AdminUserDetailsDialog adminUser={adminUser} />
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      {adminUser.role !== 'SUPER_ADMIN' && (
                        <Button variant="outline" size="sm" className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
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