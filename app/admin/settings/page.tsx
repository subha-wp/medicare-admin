'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { 
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Save,
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react'

const adminSettings = {
  profile: {
    name: 'Super Admin',
    email: 'admin@healthcare.com',
    phone: '+1 (555) 123-4567',
    timezone: 'Asia/Kolkata',
    language: 'en',
    avatar: null
  },
  preferences: {
    theme: 'light',
    sidebarCollapsed: false,
    emailNotifications: true,
    pushNotifications: true,
    soundNotifications: false,
    autoRefresh: true,
    refreshInterval: 30
  },
  security: {
    twoFactorEnabled: false,
    sessionTimeout: 60,
    passwordLastChanged: '2024-01-01T00:00:00Z',
    loginAlerts: true,
    ipWhitelist: false,
    allowedIPs: []
  },
  appearance: {
    compactMode: false,
    showAvatars: true,
    animationsEnabled: true,
    highContrast: false,
    fontSize: 'medium'
  }
}

export default function SettingsPage() {
  const [settings, setSettings] = useState(adminSettings)
  const [showPassword, setShowPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

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
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset to Default
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Settings Tabs */}
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="space-y-6 mt-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Profile Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={settings.profile.name}
                      onChange={(e) => updateSetting('profile', 'name', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={settings.profile.email}
                      onChange={(e) => updateSetting('profile', 'email', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={settings.profile.phone}
                      onChange={(e) => updateSetting('profile', 'phone', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select 
                      value={settings.profile.timezone}
                      onValueChange={(value) => updateSetting('profile', 'timezone', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Kolkata">Asia/Kolkata</SelectItem>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="America/New_York">America/New_York</SelectItem>
                        <SelectItem value="Europe/London">Europe/London</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="language">Language</Label>
                    <Select 
                      value={settings.profile.language}
                      onValueChange={(value) => updateSetting('profile', 'language', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="hi">Hindi</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                <div className="space-y-4 max-w-md">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showPassword ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <Button>Update Password</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="preferences" className="space-y-6 mt-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  General Preferences
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-gray-500">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={settings.preferences.emailNotifications}
                      onCheckedChange={(checked) => updateSetting('preferences', 'emailNotifications', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-gray-500">Receive browser push notifications</p>
                    </div>
                    <Switch
                      checked={settings.preferences.pushNotifications}
                      onCheckedChange={(checked) => updateSetting('preferences', 'pushNotifications', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Sound Notifications</Label>
                      <p className="text-sm text-gray-500">Play sound for notifications</p>
                    </div>
                    <Switch
                      checked={settings.preferences.soundNotifications}
                      onCheckedChange={(checked) => updateSetting('preferences', 'soundNotifications', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto Refresh</Label>
                      <p className="text-sm text-gray-500">Automatically refresh dashboard data</p>
                    </div>
                    <Switch
                      checked={settings.preferences.autoRefresh}
                      onCheckedChange={(checked) => updateSetting('preferences', 'autoRefresh', checked)}
                    />
                  </div>
                  {settings.preferences.autoRefresh && (
                    <div className="ml-6">
                      <Label htmlFor="refreshInterval">Refresh Interval (seconds)</Label>
                      <Input
                        id="refreshInterval"
                        type="number"
                        value={settings.preferences.refreshInterval}
                        onChange={(e) => updateSetting('preferences', 'refreshInterval', parseInt(e.target.value))}
                        className="w-32"
                      />
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="security" className="space-y-6 mt-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Security Settings
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={settings.security.twoFactorEnabled}
                        onCheckedChange={(checked) => updateSetting('security', 'twoFactorEnabled', checked)}
                      />
                      {!settings.security.twoFactorEnabled && (
                        <Button variant="outline" size="sm">Setup</Button>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Login Alerts</Label>
                      <p className="text-sm text-gray-500">Get notified of new login attempts</p>
                    </div>
                    <Switch
                      checked={settings.security.loginAlerts}
                      onCheckedChange={(checked) => updateSetting('security', 'loginAlerts', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>IP Whitelist</Label>
                      <p className="text-sm text-gray-500">Restrict access to specific IP addresses</p>
                    </div>
                    <Switch
                      checked={settings.security.ipWhitelist}
                      onCheckedChange={(checked) => updateSetting('security', 'ipWhitelist', checked)}
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
                      <Label>Password Last Changed</Label>
                      <p className="text-sm text-gray-600 mt-2">
                        {new Date(settings.security.passwordLastChanged).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="appearance" className="space-y-6 mt-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Palette className="h-5 w-5 mr-2" />
                  Appearance Settings
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="theme">Theme</Label>
                    <Select 
                      value={settings.appearance.theme}
                      onValueChange={(value) => updateSetting('appearance', 'theme', value)}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="fontSize">Font Size</Label>
                    <Select 
                      value={settings.appearance.fontSize}
                      onValueChange={(value) => updateSetting('appearance', 'fontSize', value)}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Compact Mode</Label>
                      <p className="text-sm text-gray-500">Reduce spacing and padding</p>
                    </div>
                    <Switch
                      checked={settings.appearance.compactMode}
                      onCheckedChange={(checked) => updateSetting('appearance', 'compactMode', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Show Avatars</Label>
                      <p className="text-sm text-gray-500">Display user avatars in lists</p>
                    </div>
                    <Switch
                      checked={settings.appearance.showAvatars}
                      onCheckedChange={(checked) => updateSetting('appearance', 'showAvatars', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Animations</Label>
                      <p className="text-sm text-gray-500">Enable smooth animations and transitions</p>
                    </div>
                    <Switch
                      checked={settings.appearance.animationsEnabled}
                      onCheckedChange={(checked) => updateSetting('appearance', 'animationsEnabled', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>High Contrast</Label>
                      <p className="text-sm text-gray-500">Increase contrast for better accessibility</p>
                    </div>
                    <Switch
                      checked={settings.appearance.highContrast}
                      onCheckedChange={(checked) => updateSetting('appearance', 'highContrast', checked)}
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