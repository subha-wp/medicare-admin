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
  Users,
  UserCheck,
  UserX,
  Mail,
  Phone,
  Calendar,
  MapPin
} from 'lucide-react'

const users = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@example.com',
    role: 'DOCTOR',
    phone: '+1 (555) 123-4567',
    createdAt: '2024-01-10',
    status: 'active',
    profile: {
      specialization: 'Cardiology',
      qualification: 'MD, FACC',
      experience: 15,
      licenseNo: 'MD12345'
    }
  },
  {
    id: '2',
    name: 'City Medical Pharmacy',
    email: 'contact@citymedical.com',
    role: 'PHARMACY',
    phone: '+1 (555) 987-6543',
    createdAt: '2024-01-08',
    status: 'active',
    profile: {
      businessName: 'City Medical Pharmacy',
      gstin: 'GST123456789',
      address: '123 Main St, City Center'
    }
  },
  {
    id: '3',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'PATIENT',
    phone: '+1 (555) 456-7890',
    createdAt: '2024-01-05',
    status: 'active',
    profile: {
      dateOfBirth: '1985-06-15',
      bloodGroup: 'A+',
      address: '456 Oak Ave, Downtown'
    }
  },
  {
    id: '4',
    name: 'Dr. Michael Chen',
    email: 'michael.chen@example.com',
    role: 'DOCTOR',
    phone: '+1 (555) 234-5678',
    createdAt: '2024-01-03',
    status: 'suspended',
    profile: {
      specialization: 'Dermatology',
      qualification: 'MD, FAAD',
      experience: 12,
      licenseNo: 'MD23456'
    }
  }
]

function getRoleBadge(role: string) {
  switch (role) {
    case 'DOCTOR':
      return <Badge variant="outline" className="text-blue-600 border-blue-200">Doctor</Badge>
    case 'PHARMACY':
      return <Badge variant="outline" className="text-green-600 border-green-200">Pharmacy</Badge>
    case 'PATIENT':
      return <Badge variant="outline" className="text-purple-600 border-purple-200">Patient</Badge>
    default:
      return <Badge variant="outline">Unknown</Badge>
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case 'active':
      return <Badge variant="outline" className="text-green-600 border-green-200">Active</Badge>
    case 'suspended':
      return <Badge variant="outline" className="text-red-600 border-red-200">Suspended</Badge>
    case 'pending':
      return <Badge variant="outline" className="text-yellow-600 border-yellow-200">Pending</Badge>
    default:
      return <Badge variant="outline">Unknown</Badge>
  }
}

function UserDetailsDialog({ user }: { user: any }) {
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
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            Complete information about {user.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Name</Label>
                <p className="text-sm text-gray-600">{user.name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Email</Label>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Phone</Label>
                <p className="text-sm text-gray-600">{user.phone}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Role</Label>
                <div className="mt-1">{getRoleBadge(user.role)}</div>
              </div>
              <div>
                <Label className="text-sm font-medium">Status</Label>
                <div className="mt-1">{getStatusBadge(user.status)}</div>
              </div>
              <div>
                <Label className="text-sm font-medium">Created</Label>
                <p className="text-sm text-gray-600">{new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Role-specific Information */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3">
              {user.role === 'DOCTOR' ? 'Professional Information' : 
               user.role === 'PHARMACY' ? 'Business Information' : 
               'Personal Information'}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {user.role === 'DOCTOR' && (
                <>
                  <div>
                    <Label className="text-sm font-medium">Specialization</Label>
                    <p className="text-sm text-gray-600">{user.profile.specialization}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Qualification</Label>
                    <p className="text-sm text-gray-600">{user.profile.qualification}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Experience</Label>
                    <p className="text-sm text-gray-600">{user.profile.experience} years</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">License No</Label>
                    <p className="text-sm text-gray-600">{user.profile.licenseNo}</p>
                  </div>
                </>
              )}
              {user.role === 'PHARMACY' && (
                <>
                  <div>
                    <Label className="text-sm font-medium">Business Name</Label>
                    <p className="text-sm text-gray-600">{user.profile.businessName}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">GSTIN</Label>
                    <p className="text-sm text-gray-600">{user.profile.gstin}</p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm font-medium">Address</Label>
                    <p className="text-sm text-gray-600">{user.profile.address}</p>
                  </div>
                </>
              )}
              {user.role === 'PATIENT' && (
                <>
                  <div>
                    <Label className="text-sm font-medium">Date of Birth</Label>
                    <p className="text-sm text-gray-600">{new Date(user.profile.dateOfBirth).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Blood Group</Label>
                    <p className="text-sm text-gray-600">{user.profile.bloodGroup}</p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm font-medium">Address</Label>
                    <p className="text-sm text-gray-600">{user.profile.address}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit User
            </Button>
            {user.status === 'active' ? (
              <Button variant="outline" className="text-red-600 border-red-200">
                <UserX className="h-4 w-4 mr-2" />
                Suspend User
              </Button>
            ) : (
              <Button variant="outline" className="text-green-600 border-green-200">
                <UserCheck className="h-4 w-4 mr-2" />
                Activate User
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  const stats = {
    total: users.length,
    doctors: users.filter(u => u.role === 'DOCTOR').length,
    pharmacies: users.filter(u => u.role === 'PHARMACY').length,
    patients: users.filter(u => u.role === 'PATIENT').length,
    active: users.filter(u => u.status === 'active').length,
    suspended: users.filter(u => u.status === 'suspended').length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600">Manage all users on your platform</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Doctors</p>
                <p className="text-2xl font-bold text-blue-600">{stats.doctors}</p>
              </div>
              <UserCheck className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pharmacies</p>
                <p className="text-2xl font-bold text-green-600">{stats.pharmacies}</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Patients</p>
                <p className="text-2xl font-bold text-purple-600">{stats.patients}</p>
              </div>
              <UserCheck className="h-8 w-8 text-purple-500" />
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
                <p className="text-sm font-medium text-gray-600">Suspended</p>
                <p className="text-2xl font-bold text-red-600">{stats.suspended}</p>
              </div>
              <UserX className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-48">
              <Label htmlFor="role">Role</Label>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="DOCTOR">Doctor</SelectItem>
                  <SelectItem value="PHARMACY">Pharmacy</SelectItem>
                  <SelectItem value="PATIENT">Patient</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-48">
              <Label htmlFor="status">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
          <CardDescription>
            Manage and monitor all users on your platform
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
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.phone}</div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <UserDetailsDialog user={user} />
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