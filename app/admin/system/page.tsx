'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { 
  Database,
  Server,
  Settings,
  Shield,
  Mail,
  Bell,
  CreditCard,
  Globe,
  Smartphone,
  RefreshCw,
  Save,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  Activity,
  HardDrive,
  Cpu,
  MemoryStick
} from 'lucide-react'

const systemStats = {
  database: {
    status: 'healthy',
    connections: 45,
    maxConnections: 100,
    size: '2.4 GB',
    uptime: '15 days, 6 hours'
  },
  server: {
    status: 'healthy',
    cpu: 23,
    memory: 67,
    disk: 45,
    uptime: '15 days, 6 hours'
  },
  api: {
    status: 'healthy',
    requests: 1247,
    errors: 3,
    avgResponseTime: 245
  }
}

const systemSettings = {
  general: {
    siteName: 'HealthCare Platform',
    siteDescription: 'Professional healthcare management system',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
    currency: 'INR',
    language: 'en'
  },
  email: {
    provider: 'smtp',
    host: 'smtp.gmail.com',
    port: 587,
    username: 'noreply@healthcare.com',
    encryption: 'tls',
    fromName: 'HealthCare Platform',
    fromEmail: 'noreply@healthcare.com'
  },
  notifications: {
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    appointmentReminders: true,
    paymentNotifications: true,
    systemAlerts: true
  },
  payments: {
    razorpayEnabled: true,
    stripeEnabled: false,
    cashPayments: true,
    autoRefunds: false,
    paymentTimeout: 30
  },
  security: {
    twoFactorAuth: false,
    sessionTimeout: 60,
    passwordMinLength: 8,
    passwordComplexity: true,
    loginAttempts: 5,
    accountLockout: 15
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case 'healthy':
      return <Badge variant="outline" className="text-green-600 border-green-200">Healthy</Badge>
    case 'warning':
      return <Badge variant="outline" className="text-yellow-600 border-yellow-200">Warning</Badge>
    case 'error':
      return <Badge variant="outline" className="text-red-600 border-red-200">Error</Badge>
    default:
      return <Badge variant="outline">Unknown</Badge>
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'healthy':
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case 'warning':
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    case 'error':
      return <AlertTriangle className="h-4 w-4 text-red-500" />
    default:
      return <Activity className="h-4 w-4 text-gray-500" />
  }
}

function BackupDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Create Backup
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create System Backup</DialogTitle>
          <DialogDescription>
            Create a complete backup of your system data
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label>Backup Type</Label>
            <Select defaultValue="full">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full">Full Backup</SelectItem>
                <SelectItem value="database">Database Only</SelectItem>
                <SelectItem value="files">Files Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>Backup Name</Label>
            <Input placeholder="Enter backup name" defaultValue={`backup_${new Date().toISOString().split('T')[0]}`} />
          </div>
          
          <div>
            <Label>Description</Label>
            <Textarea placeholder="Optional backup description" />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline">Cancel</Button>
            <Button>Create Backup</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function SystemPage() {
  const [settings, setSettings] = useState(systemSettings)

  const updateSetting = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Management</h1>
          <p className="text-gray-600 mt-1">Monitor system health and configure platform settings</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <BackupDialog />
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="h-5 w-5 mr-2 text-blue-500" />
              Database Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                {getStatusBadge(systemStats.database.status)}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Connections</span>
                <span className="text-sm text-gray-600">
                  {systemStats.database.connections}/{systemStats.database.maxConnections}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Size</span>
                <span className="text-sm text-gray-600">{systemStats.database.size}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Uptime</span>
                <span className="text-sm text-gray-600">{systemStats.database.uptime}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Server className="h-5 w-5 mr-2 text-green-500" />
              Server Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                {getStatusBadge(systemStats.server.status)}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">CPU</span>
                  <span className="text-sm text-gray-600">{systemStats.server.cpu}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${systemStats.server.cpu}%` }}
                  ></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Memory</span>
                  <span className="text-sm text-gray-600">{systemStats.server.memory}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${systemStats.server.memory}%` }}
                  ></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Disk</span>
                  <span className="text-sm text-gray-600">{systemStats.server.disk}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-orange-600 h-2 rounded-full" 
                    style={{ width: `${systemStats.server.disk}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-purple-500" />
              API Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                {getStatusBadge(systemStats.api.status)}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Requests (24h)</span>
                <span className="text-sm text-gray-600">{systemStats.api.requests.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Errors (24h)</span>
                <span className="text-sm text-gray-600">{systemStats.api.errors}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Avg Response</span>
                <span className="text-sm text-gray-600">{systemStats.api.avgResponseTime}ms</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Settings */}
      <Card>
        <CardHeader>
          <CardTitle>System Configuration</CardTitle>
          <CardDescription>
            Configure platform settings and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.general.siteName}
                    onChange={(e) => updateSetting('general', 'siteName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select 
                    value={settings.general.timezone}
                    onValueChange={(value) => updateSetting('general', 'timezone', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Kolkata">Asia/Kolkata</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">America/New_York</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select 
                    value={settings.general.dateFormat}
                    onValueChange={(value) => updateSetting('general', 'dateFormat', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select 
                    value={settings.general.currency}
                    onValueChange={(value) => updateSetting('general', 'currency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INR">INR (₹)</SelectItem>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.general.siteDescription}
                  onChange={(e) => updateSetting('general', 'siteDescription', e.target.value)}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="email" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="emailHost">SMTP Host</Label>
                  <Input
                    id="emailHost"
                    value={settings.email.host}
                    onChange={(e) => updateSetting('email', 'host', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="emailPort">SMTP Port</Label>
                  <Input
                    id="emailPort"
                    type="number"
                    value={settings.email.port}
                    onChange={(e) => updateSetting('email', 'port', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="emailUsername">Username</Label>
                  <Input
                    id="emailUsername"
                    value={settings.email.username}
                    onChange={(e) => updateSetting('email', 'username', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="emailEncryption">Encryption</Label>
                  <Select 
                    value={settings.email.encryption}
                    onValueChange={(value) => updateSetting('email', 'encryption', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tls">TLS</SelectItem>
                      <SelectItem value="ssl">SSL</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="fromName">From Name</Label>
                  <Input
                    id="fromName"
                    value={settings.email.fromName}
                    onChange={(e) => updateSetting('email', 'fromName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="fromEmail">From Email</Label>
                  <Input
                    id="fromEmail"
                    type="email"
                    value={settings.email.fromEmail}
                    onChange={(e) => updateSetting('email', 'fromEmail', e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-500">Send notifications via email</p>
                  </div>
                  <Switch
                    checked={settings.notifications.emailNotifications}
                    onCheckedChange={(checked) => updateSetting('notifications', 'emailNotifications', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-gray-500">Send notifications via SMS</p>
                  </div>
                  <Switch
                    checked={settings.notifications.smsNotifications}
                    onCheckedChange={(checked) => updateSetting('notifications', 'smsNotifications', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-gray-500">Send push notifications to mobile apps</p>
                  </div>
                  <Switch
                    checked={settings.notifications.pushNotifications}
                    onCheckedChange={(checked) => updateSetting('notifications', 'pushNotifications', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Appointment Reminders</Label>
                    <p className="text-sm text-gray-500">Automatic appointment reminders</p>
                  </div>
                  <Switch
                    checked={settings.notifications.appointmentReminders}
                    onCheckedChange={(checked) => updateSetting('notifications', 'appointmentReminders', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Payment Notifications</Label>
                    <p className="text-sm text-gray-500">Payment confirmation notifications</p>
                  </div>
                  <Switch
                    checked={settings.notifications.paymentNotifications}
                    onCheckedChange={(checked) => updateSetting('notifications', 'paymentNotifications', checked)}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="payments" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Razorpay Integration</Label>
                    <p className="text-sm text-gray-500">Enable Razorpay payment gateway</p>
                  </div>
                  <Switch
                    checked={settings.payments.razorpayEnabled}
                    onCheckedChange={(checked) => updateSetting('payments', 'razorpayEnabled', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Stripe Integration</Label>
                    <p className="text-sm text-gray-500">Enable Stripe payment gateway</p>
                  </div>
                  <Switch
                    checked={settings.payments.stripeEnabled}
                    onCheckedChange={(checked) => updateSetting('payments', 'stripeEnabled', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Cash Payments</Label>
                    <p className="text-sm text-gray-500">Allow cash payments at chambers</p>
                  </div>
                  <Switch
                    checked={settings.payments.cashPayments}
                    onCheckedChange={(checked) => updateSetting('payments', 'cashPayments', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Automatic Refunds</Label>
                    <p className="text-sm text-gray-500">Process refunds automatically</p>
                  </div>
                  <Switch
                    checked={settings.payments.autoRefunds}
                    onCheckedChange={(checked) => updateSetting('payments', 'autoRefunds', checked)}
                  />
                </div>
                <div>
                  <Label htmlFor="paymentTimeout">Payment Timeout (minutes)</Label>
                  <Input
                    id="paymentTimeout"
                    type="number"
                    value={settings.payments.paymentTimeout}
                    onChange={(e) => updateSetting('payments', 'paymentTimeout', parseInt(e.target.value))}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="security" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-500">Require 2FA for admin accounts</p>
                  </div>
                  <Switch
                    checked={settings.security.twoFactorAuth}
                    onCheckedChange={(checked) => updateSetting('security', 'twoFactorAuth', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Password Complexity</Label>
                    <p className="text-sm text-gray-500">Enforce strong password requirements</p>
                  </div>
                  <Switch
                    checked={settings.security.passwordComplexity}
                    onCheckedChange={(checked) => updateSetting('security', 'passwordComplexity', checked)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={settings.security.sessionTimeout}
                      onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="passwordMinLength">Min Password Length</Label>
                    <Input
                      id="passwordMinLength"
                      type="number"
                      value={settings.security.passwordMinLength}
                      onChange={(e) => updateSetting('security', 'passwordMinLength', parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="loginAttempts">Max Login Attempts</Label>
                    <Input
                      id="loginAttempts"
                      type="number"
                      value={settings.security.loginAttempts}
                      onChange={(e) => updateSetting('security', 'loginAttempts', parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="accountLockout">Account Lockout (minutes)</Label>
                    <Input
                      id="accountLockout"
                      type="number"
                      value={settings.security.accountLockout}
                      onChange={(e) => updateSetting('security', 'accountLockout', parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}