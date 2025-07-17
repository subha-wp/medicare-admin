"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  Calendar,
  Building,
  FileText,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  DollarSign,
  Activity,
  UserCheck,
  Stethoscope,
  Hospital,
  CreditCard,
  BarChart3,
  Settings,
} from "lucide-react";

const stats = [
  {
    name: "Total Users",
    value: "2,847",
    change: "+12%",
    changeType: "positive",
    icon: Users,
    color: "blue",
  },
  {
    name: "Active Doctors",
    value: "147",
    change: "+5%",
    changeType: "positive",
    icon: Stethoscope,
    color: "green",
  },
  {
    name: "Verified Chambers",
    value: "89",
    change: "+8%",
    changeType: "positive",
    icon: Building,
    color: "purple",
  },
  {
    name: "Today Appointments",
    value: "234",
    change: "-2%",
    changeType: "negative",
    icon: Calendar,
    color: "orange",
  },
  {
    name: "Monthly Revenue",
    value: "₹1,24,500",
    change: "+15%",
    changeType: "positive",
    icon: DollarSign,
    color: "emerald",
  },
  {
    name: "Completion Rate",
    value: "94.2%",
    change: "+3%",
    changeType: "positive",
    icon: CheckCircle,
    color: "teal",
  },
];

const recentChambers = [
  {
    id: "1",
    doctor: "Dr. Sarah Johnson",
    pharmacy: "City Medical Pharmacy",
    specialty: "Cardiology",
    status: "pending",
    submittedAt: "2 hours ago",
    fees: 500,
    priority: "high",
  },
  {
    id: "2",
    doctor: "Dr. Michael Chen",
    pharmacy: "Health Plus Pharmacy",
    specialty: "Dermatology",
    status: "approved",
    submittedAt: "4 hours ago",
    fees: 750,
    priority: "medium",
  },
  {
    id: "3",
    doctor: "Dr. Emily Davis",
    pharmacy: "MedCare Pharmacy",
    specialty: "Pediatrics",
    status: "rejected",
    submittedAt: "6 hours ago",
    fees: 600,
    priority: "low",
  },
  {
    id: "4",
    doctor: "Dr. Robert Wilson",
    pharmacy: "Prime Health Pharmacy",
    specialty: "Orthopedics",
    status: "pending",
    submittedAt: "1 day ago",
    fees: 800,
    priority: "high",
  },
];

const recentAppointments = [
  {
    id: "1",
    patient: "John Doe",
    doctor: "Dr. Sarah Johnson",
    date: "2024-01-15",
    time: "10:00 AM",
    status: "confirmed",
    amount: 500,
    paymentStatus: "paid",
  },
  {
    id: "2",
    patient: "Jane Smith",
    doctor: "Dr. Michael Chen",
    date: "2024-01-15",
    time: "2:30 PM",
    status: "pending",
    amount: 750,
    paymentStatus: "pending",
  },
  {
    id: "3",
    patient: "Bob Wilson",
    doctor: "Dr. Emily Davis",
    date: "2024-01-15",
    time: "4:00 PM",
    status: "completed",
    amount: 600,
    paymentStatus: "paid",
  },
];

const systemAlerts = [
  {
    id: "1",
    type: "warning",
    title: "High Chamber Verification Queue",
    message: "12 chambers pending verification for more than 24 hours",
    time: "5 minutes ago",
  },
  {
    id: "2",
    type: "info",
    title: "System Maintenance Scheduled",
    message: "Scheduled maintenance on Jan 20, 2024 at 2:00 AM",
    time: "1 hour ago",
  },
  {
    id: "3",
    type: "success",
    title: "Monthly Revenue Target Achieved",
    message: "Congratulations! Monthly revenue target exceeded by 15%",
    time: "2 hours ago",
  },
];

function getStatusIcon(status: string) {
  switch (status) {
    case "pending":
      return <Clock className="h-4 w-4 text-yellow-500" />;
    case "approved":
    case "confirmed":
    case "completed":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "rejected":
    case "cancelled":
      return <XCircle className="h-4 w-4 text-red-500" />;
    default:
      return <AlertCircle className="h-4 w-4 text-gray-500" />;
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "pending":
      return (
        <Badge
          variant="outline"
          className="text-yellow-600 border-yellow-200 bg-yellow-50"
        >
          Pending
        </Badge>
      );
    case "approved":
    case "confirmed":
      return (
        <Badge
          variant="outline"
          className="text-green-600 border-green-200 bg-green-50"
        >
          Approved
        </Badge>
      );
    case "completed":
      return (
        <Badge
          variant="outline"
          className="text-blue-600 border-blue-200 bg-blue-50"
        >
          Completed
        </Badge>
      );
    case "rejected":
    case "cancelled":
      return (
        <Badge
          variant="outline"
          className="text-red-600 border-red-200 bg-red-50"
        >
          Rejected
        </Badge>
      );
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
}

function getPriorityBadge(priority: string) {
  switch (priority) {
    case "high":
      return (
        <Badge variant="destructive" className="text-xs">
          High
        </Badge>
      );
    case "medium":
      return (
        <Badge
          variant="outline"
          className="text-xs text-orange-600 border-orange-200"
        >
          Medium
        </Badge>
      );
    case "low":
      return (
        <Badge variant="outline" className="text-xs text-gray-600">
          Low
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="text-xs">
          Normal
        </Badge>
      );
  }
}

function getAlertIcon(type: string) {
  switch (type) {
    case "warning":
      return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    case "info":
      return <Activity className="h-4 w-4 text-blue-500" />;
    case "success":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "error":
      return <XCircle className="h-4 w-4 text-red-500" />;
    default:
      return <AlertCircle className="h-4 w-4 text-gray-500" />;
  }
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 mt-1">
            Monitor your healthcare platform performance and manage operations
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            View Analytics
          </Button>
          <Button>
            <Activity className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card
            key={stat.name}
            className="hover:shadow-lg transition-shadow duration-200"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.name}
              </CardTitle>
              <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                <stat.icon className={`h-5 w-5 text-${stat.color}-600`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="flex items-center space-x-2">
                {stat.changeType === "positive" ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span
                  className={`text-sm font-medium ${
                    stat.changeType === "positive"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-orange-500" />
            System Alerts
          </CardTitle>
          <CardDescription>
            Important notifications and system status updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {systemAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                {getAlertIcon(alert.type)}
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{alert.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                  <p className="text-xs text-gray-400 mt-2">{alert.time}</p>
                </div>
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chamber Verification Queue */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Building className="h-5 w-5 mr-2 text-purple-500" />
                  Chamber Verification Queue
                </CardTitle>
                <CardDescription>
                  Recent chamber registration requests awaiting verification
                </CardDescription>
              </div>
              <Badge
                variant="outline"
                className="text-orange-600 border-orange-200"
              >
                {recentChambers.filter((c) => c.status === "pending").length}{" "}
                Pending
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentChambers.map((chamber) => (
                <div
                  key={chamber.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(chamber.status)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="font-medium text-gray-900">
                          {chamber.doctor}
                        </p>
                        {getPriorityBadge(chamber.priority)}
                      </div>
                      <p className="text-sm text-gray-600">
                        {chamber.pharmacy}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <p className="text-xs text-gray-500">
                          {chamber.specialty}
                        </p>
                        <p className="text-xs text-gray-500">₹{chamber.fees}</p>
                        <p className="text-xs text-gray-500">
                          {chamber.submittedAt}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(chamber.status)}
                    {chamber.status === "pending" && (
                      <Button size="sm" variant="outline">
                        Review
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <Button variant="outline" className="w-full">
                View All Chambers
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Appointments */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                  Recent Appointments
                </CardTitle>
                <CardDescription>
                  Latest appointment bookings and updates
                </CardDescription>
              </div>
              <Badge
                variant="outline"
                className="text-blue-600 border-blue-200"
              >
                {recentAppointments.length} Today
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(appointment.status)}
                    <div>
                      <p className="font-medium text-gray-900">
                        {appointment.patient}
                      </p>
                      <p className="text-sm text-gray-600">
                        {appointment.doctor}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <p className="text-xs text-gray-500">
                          {appointment.date}
                        </p>
                        <p className="text-xs text-gray-500">
                          {appointment.time}
                        </p>
                        <p className="text-xs font-medium text-green-600">
                          ₹{appointment.amount}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    {getStatusBadge(appointment.status)}
                    <Badge
                      variant={
                        appointment.paymentStatus === "paid"
                          ? "default"
                          : "outline"
                      }
                      className="text-xs"
                    >
                      {appointment.paymentStatus}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <Button variant="outline" className="w-full">
                View All Appointments
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Chamber Verification Rate</CardTitle>
            <CardDescription>Monthly verification performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Approved</span>
                <span className="text-sm text-gray-600">78%</span>
              </div>
              <Progress value={78} className="h-2" />
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>156 of 200 chambers</span>
                <span>+12% from last month</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Revenue Growth</CardTitle>
            <CardDescription>Monthly revenue performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Target Achievement</span>
                <span className="text-sm text-gray-600">115%</span>
              </div>
              <Progress value={115} className="h-2" />
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>₹1,24,500 of ₹1,08,000</span>
                <span>+15% above target</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">User Satisfaction</CardTitle>
            <CardDescription>Overall platform satisfaction</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Satisfaction Score</span>
                <span className="text-sm text-gray-600">94.2%</span>
              </div>
              <Progress value={94.2} className="h-2" />
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Based on 1,247 reviews</span>
                <span>+3% improvement</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common administrative tasks and shortcuts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-auto p-6 flex flex-col items-center space-y-3 hover:bg-blue-50 hover:border-blue-200"
            >
              <Building className="h-8 w-8 text-blue-600" />
              <div className="text-center">
                <span className="font-medium">Verify Chambers</span>
                <p className="text-xs text-gray-500 mt-1">
                  Review pending chambers
                </p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-6 flex flex-col items-center space-y-3 hover:bg-green-50 hover:border-green-200"
            >
              <Users className="h-8 w-8 text-green-600" />
              <div className="text-center">
                <span className="font-medium">Manage Users</span>
                <p className="text-xs text-gray-500 mt-1">
                  Add or edit user accounts
                </p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-6 flex flex-col items-center space-y-3 hover:bg-purple-50 hover:border-purple-200"
            >
              <FileText className="h-8 w-8 text-purple-600" />
              <div className="text-center">
                <span className="font-medium">Generate Reports</span>
                <p className="text-xs text-gray-500 mt-1">
                  Create detailed reports
                </p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-6 flex flex-col items-center space-y-3 hover:bg-orange-50 hover:border-orange-200"
            >
              <Settings className="h-8 w-8 text-orange-600" />
              <div className="text-center">
                <span className="font-medium">System Settings</span>
                <p className="text-xs text-gray-500 mt-1">
                  Configure platform settings
                </p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
