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
import { Textarea } from '@/components/ui/textarea'
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  CheckCircle, 
  XCircle, 
  Clock,
  Building,
  MapPin,
  Phone,
  User,
  Calendar,
  DollarSign
} from 'lucide-react'

const chambers = [
  {
    id: '1',
    doctor: {
      name: 'Dr. Sarah Johnson',
      specialization: 'Cardiology',
      phone: '+1 (555) 123-4567',
      licenseNo: 'MD12345'
    },
    pharmacy: {
      name: 'City Medical Pharmacy',
      address: '123 Main St, City Center',
      phone: '+1 (555) 987-6543',
      gstin: 'GST123456789'
    },
    schedule: {
      weekDay: 'MONDAY',
      weekNumber: 'FIRST',
      startTime: '09:00',
      endTime: '17:00',
      slotDuration: 30,
      maxSlots: 16
    },
    fees: 500,
    status: 'pending',
    submittedAt: '2024-01-15T10:30:00Z',
    isActive: true
  },
  {
    id: '2',
    doctor: {
      name: 'Dr. Michael Chen',
      specialization: 'Dermatology',
      phone: '+1 (555) 234-5678',
      licenseNo: 'MD23456'
    },
    pharmacy: {
      name: 'Health Plus Pharmacy',
      address: '456 Oak Ave, Downtown',
      phone: '+1 (555) 876-5432',
      gstin: 'GST234567890'
    },
    schedule: {
      weekDay: 'TUESDAY',
      weekNumber: 'SECOND',
      startTime: '10:00',
      endTime: '18:00',
      slotDuration: 20,
      maxSlots: 24
    },
    fees: 750,
    status: 'approved',
    submittedAt: '2024-01-14T14:15:00Z',
    isActive: true
  },
  {
    id: '3',
    doctor: {
      name: 'Dr. Emily Davis',
      specialization: 'Pediatrics',
      phone: '+1 (555) 345-6789',
      licenseNo: 'MD34567'
    },
    pharmacy: {
      name: 'MedCare Pharmacy',
      address: '789 Pine St, Suburbs',
      phone: '+1 (555) 765-4321',
      gstin: 'GST345678901'
    },
    schedule: {
      weekDay: 'WEDNESDAY',
      weekNumber: 'THIRD',
      startTime: '08:00',
      endTime: '16:00',
      slotDuration: 25,
      maxSlots: 19
    },
    fees: 600,
    status: 'rejected',
    submittedAt: '2024-01-13T09:45:00Z',
    isActive: false
  }
]

function getStatusBadge(status: string) {
  switch (status) {
    case 'pending':
      return <Badge variant="outline" className="text-yellow-600 border-yellow-200">Pending</Badge>
    case 'approved':
      return <Badge variant="outline" className="text-green-600 border-green-200">Approved</Badge>
    case 'rejected':
      return <Badge variant="outline" className="text-red-600 border-red-200">Rejected</Badge>
    default:
      return <Badge variant="outline">Unknown</Badge>
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'pending':
      return <Clock className="h-4 w-4 text-yellow-500" />
    case 'approved':
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case 'rejected':
      return <XCircle className="h-4 w-4 text-red-500" />
    default:
      return <Clock className="h-4 w-4 text-gray-500" />
  }
}

function ChamberDetailsDialog({ chamber, onApprove, onReject }: { chamber: any, onApprove: (id: string) => void, onReject: (id: string) => void }) {
  const [rejectionReason, setRejectionReason] = useState('')

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4 mr-2" />
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Chamber Details</DialogTitle>
          <DialogDescription>
            Review chamber registration details and verify information
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Doctor Information */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Doctor Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Name</Label>
                <p className="text-sm text-gray-600">{chamber.doctor.name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Specialization</Label>
                <p className="text-sm text-gray-600">{chamber.doctor.specialization}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Phone</Label>
                <p className="text-sm text-gray-600">{chamber.doctor.phone}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">License No</Label>
                <p className="text-sm text-gray-600">{chamber.doctor.licenseNo}</p>
              </div>
            </div>
          </div>

          {/* Pharmacy Information */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3 flex items-center">
              <Building className="h-5 w-5 mr-2" />
              Pharmacy Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Name</Label>
                <p className="text-sm text-gray-600">{chamber.pharmacy.name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">GSTIN</Label>
                <p className="text-sm text-gray-600">{chamber.pharmacy.gstin}</p>
              </div>
              <div className="col-span-2">
                <Label className="text-sm font-medium">Address</Label>
                <p className="text-sm text-gray-600">{chamber.pharmacy.address}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Phone</Label>
                <p className="text-sm text-gray-600">{chamber.pharmacy.phone}</p>
              </div>
            </div>
          </div>

          {/* Schedule & Fees */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Schedule & Fees
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Day</Label>
                <p className="text-sm text-gray-600">{chamber.schedule.weekDay}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Week</Label>
                <p className="text-sm text-gray-600">{chamber.schedule.weekNumber}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Time</Label>
                <p className="text-sm text-gray-600">{chamber.schedule.startTime} - {chamber.schedule.endTime}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Slot Duration</Label>
                <p className="text-sm text-gray-600">{chamber.schedule.slotDuration} minutes</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Max Slots</Label>
                <p className="text-sm text-gray-600">{chamber.schedule.maxSlots}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Consultation Fee</Label>
                <p className="text-sm text-gray-600">₹{chamber.fees}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          {chamber.status === 'pending' && (
            <div className="flex justify-end space-x-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="text-red-600 border-red-200">
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Reject Chamber</DialogTitle>
                    <DialogDescription>
                      Please provide a reason for rejecting this chamber registration.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="reason">Rejection Reason</Label>
                      <Textarea
                        id="reason"
                        placeholder="Enter reason for rejection..."
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline">Cancel</Button>
                      <Button 
                        onClick={() => onReject(chamber.id)}
                        className="bg-red-600 text-white hover:bg-red-700"
                      >
                        Reject Chamber
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button onClick={() => onApprove(chamber.id)} className="bg-green-600 text-white hover:bg-green-700">
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function ChambersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [chamberList, setChamberList] = useState(chambers)

  const filteredChambers = chamberList.filter(chamber => {
    const matchesSearch = chamber.doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         chamber.pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || chamber.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleApprove = (id: string) => {
    setChamberList(chambers.map(chamber => 
      chamber.id === id ? { ...chamber, status: 'approved' } : chamber
    ))
  }

  const handleReject = (id: string) => {
    setChamberList(chambers.map(chamber => 
      chamber.id === id ? { ...chamber, status: 'rejected' } : chamber
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Chambers</h1>
          <p className="text-gray-600">Manage chamber registrations and verifications</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Chamber
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Chambers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search doctors or pharmacies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-48">
              <Label htmlFor="status">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chambers List */}
      <div className="space-y-4">
        {filteredChambers.map((chamber) => (
          <Card key={chamber.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    {getStatusIcon(chamber.status)}
                    <div>
                      <h3 className="font-semibold text-lg">{chamber.doctor.name}</h3>
                      <p className="text-sm text-gray-600">{chamber.doctor.specialization}</p>
                    </div>
                    {getStatusBadge(chamber.status)}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium">{chamber.pharmacy.name}</p>
                        <p className="text-xs text-gray-500">{chamber.pharmacy.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium">{chamber.schedule.weekDay}</p>
                        <p className="text-xs text-gray-500">{chamber.schedule.startTime} - {chamber.schedule.endTime}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium">₹{chamber.fees}</p>
                        <p className="text-xs text-gray-500">Consultation Fee</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <ChamberDetailsDialog
                    chamber={chamber}
                    onApprove={handleApprove}
                    onReject={handleReject}
                  />
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredChambers.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No chambers found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}