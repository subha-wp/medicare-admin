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
  FileText,
  User,
  Stethoscope,
  Calendar,
  Download,
  RefreshCw,
  Pill,
  ClipboardList
} from 'lucide-react'

const medicalRecords = [
  {
    id: '1',
    appointmentId: 'APT001',
    patient: {
      name: 'John Doe',
      age: 35,
      phone: '+1 (555) 123-4567'
    },
    doctor: {
      name: 'Dr. Sarah Johnson',
      specialization: 'Cardiology'
    },
    diagnosis: 'Hypertension, Stage 1',
    prescription: 'Lisinopril 10mg once daily, Lifestyle modifications including low-sodium diet and regular exercise',
    notes: 'Patient reports occasional chest discomfort. Blood pressure elevated at 145/92. Recommended follow-up in 4 weeks.',
    createdAt: '2024-01-15T10:30:00Z',
    appointmentDate: '2024-01-15'
  },
  {
    id: '2',
    appointmentId: 'APT002',
    patient: {
      name: 'Jane Smith',
      age: 28,
      phone: '+1 (555) 234-5678'
    },
    doctor: {
      name: 'Dr. Michael Chen',
      specialization: 'Dermatology'
    },
    diagnosis: 'Atopic Dermatitis',
    prescription: 'Hydrocortisone cream 1% twice daily, Cetaphil moisturizer, Avoid known allergens',
    notes: 'Chronic eczema on hands and arms. Patient reports improvement with current regimen. Continue treatment.',
    createdAt: '2024-01-14T14:15:00Z',
    appointmentDate: '2024-01-14'
  },
  {
    id: '3',
    appointmentId: 'APT003',
    patient: {
      name: 'Bob Wilson',
      age: 42,
      phone: '+1 (555) 345-6789'
    },
    doctor: {
      name: 'Dr. Emily Davis',
      specialization: 'Pediatrics'
    },
    diagnosis: 'Upper Respiratory Infection',
    prescription: 'Amoxicillin 500mg three times daily for 7 days, Rest and increased fluid intake',
    notes: 'Patient presents with cough, congestion, and mild fever. No complications observed. Full recovery expected.',
    createdAt: '2024-01-13T16:45:00Z',
    appointmentDate: '2024-01-13'
  },
  {
    id: '4',
    appointmentId: 'APT004',
    patient: {
      name: 'Alice Brown',
      age: 31,
      phone: '+1 (555) 456-7890'
    },
    doctor: {
      name: 'Dr. Robert Wilson',
      specialization: 'Orthopedics'
    },
    diagnosis: 'Acute Lower Back Pain',
    prescription: 'Ibuprofen 400mg as needed, Physical therapy referral, Heat/cold therapy',
    notes: 'Patient reports sudden onset of lower back pain after lifting. No neurological deficits. Conservative treatment recommended.',
    createdAt: '2024-01-12T11:20:00Z',
    appointmentDate: '2024-01-12'
  }
]

function MedicalRecordDetailsDialog({ record }: { record: any }) {
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
          <DialogTitle>Medical Record Details</DialogTitle>
          <DialogDescription>
            Complete medical record for appointment #{record.appointmentId}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
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
                  <p className="text-sm text-gray-600">{record.patient.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Age</Label>
                  <p className="text-sm text-gray-600">{record.patient.age} years</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Phone</Label>
                  <p className="text-sm text-gray-600">{record.patient.phone}</p>
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
                  <p className="text-sm text-gray-600">{record.doctor.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Specialization</Label>
                  <p className="text-sm text-gray-600">{record.doctor.specialization}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Date</Label>
                  <p className="text-sm text-gray-600">{new Date(record.appointmentDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Diagnosis */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3 flex items-center">
              <ClipboardList className="h-5 w-5 mr-2" />
              Diagnosis
            </h3>
            <p className="text-gray-700 leading-relaxed">{record.diagnosis}</p>
          </div>

          {/* Prescription */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3 flex items-center">
              <Pill className="h-5 w-5 mr-2" />
              Prescription
            </h3>
            <p className="text-gray-700 leading-relaxed">{record.prescription}</p>
          </div>

          {/* Notes */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Doctor's Notes
            </h3>
            <p className="text-gray-700 leading-relaxed">{record.notes}</p>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit Record
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function MedicalRecordsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [doctorFilter, setDoctorFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')

  const filteredRecords = medicalRecords.filter(record => {
    const matchesSearch = record.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDoctor = doctorFilter === 'all' || record.doctor.name === doctorFilter
    return matchesSearch && matchesDoctor
  })

  const stats = {
    total: medicalRecords.length,
    thisWeek: medicalRecords.filter(r => {
      const recordDate = new Date(r.createdAt)
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      return recordDate >= weekAgo
    }).length,
    thisMonth: medicalRecords.filter(r => {
      const recordDate = new Date(r.createdAt)
      const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      return recordDate >= monthAgo
    }).length
  }

  const uniqueDoctors = [...new Set(medicalRecords.map(r => r.doctor.name))]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Medical Records</h1>
          <p className="text-gray-600 mt-1">Manage patient medical records and treatment history</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Records
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Record
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Records</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <FileText className="h-10 w-10 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-3xl font-bold text-green-600">{stats.thisWeek}</p>
              </div>
              <Calendar className="h-10 w-10 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-3xl font-bold text-purple-600">{stats.thisMonth}</p>
              </div>
              <ClipboardList className="h-10 w-10 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Medical Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search records..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="doctor">Doctor</Label>
              <Select value={doctorFilter} onValueChange={setDoctorFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by doctor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Doctors</SelectItem>
                  {uniqueDoctors.map(doctor => (
                    <SelectItem key={doctor} value={doctor}>{doctor}</SelectItem>
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

      {/* Medical Records Table */}
      <Card>
        <CardHeader>
          <CardTitle>Medical Records ({filteredRecords.length})</CardTitle>
          <CardDescription>
            Complete list of all patient medical records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Diagnosis</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Appointment</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{record.patient.name}</div>
                      <div className="text-sm text-gray-500">{record.patient.age} years • {record.patient.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{record.doctor.name}</div>
                      <div className="text-sm text-gray-500">{record.doctor.specialization}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      <p className="font-medium text-gray-900 truncate">{record.diagnosis}</p>
                      <p className="text-sm text-gray-500 truncate">{record.prescription}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{new Date(record.appointmentDate).toLocaleDateString()}</div>
                      <div className="text-sm text-gray-500">{new Date(record.createdAt).toLocaleTimeString()}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-blue-600 border-blue-200">
                      {record.appointmentId}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <MedicalRecordDetailsDialog record={record} />
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        PDF
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