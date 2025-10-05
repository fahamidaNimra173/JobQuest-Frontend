'use client';

import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Eye, 
  Save,
  Mail,
  Smartphone,
  Monitor,
  Moon,
  Sun
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function SettingsContent() {
  const [activeTab, setActiveTab] = useState('account');
  const { showToast } = useToast();
  
  const [settings, setSettings] = useState({
    // Account Settings
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    timezone: 'America/New_York',
    language: 'English',
    
    // Notification Settings
    emailNotifications: {
      jobAlerts: true,
      applicationUpdates: true,
      newsletter: false,
      marketingEmails: false
    },
    pushNotifications: {
      jobMatches: true,
      messages: true,
      reminders: true
    },
    
    // Privacy Settings
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    allowRecruiterContact: true,
    
    // Appearance Settings
    theme: 'light',
    compactMode: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedChange = (section: string, field: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...(prev as any)[section],
        [field]: value
      }
    }));
  };

  const saveSettings = () => {
    // This should make API call to save settings
    console.log('Saving settings:', settings);
    showToast('success', 'Settings saved successfully!', 'Your preferences have been updated.');
  };

  const tabs = [
    { id: 'account', name: 'Account', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'privacy', name: 'Privacy', icon: Shield },
    { id: 'appearance', name: 'Appearance', icon: Monitor }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account preferences and settings</p>
      </div>

      <div className="bg-white rounded-lg border">
        {/* Tabs */}
        <div className="border-b">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-dark text-primary-dark'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Contents */}
        <div className="p-6">
          {activeTab === 'account' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Account Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      value={settings.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      value={settings.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={settings.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                    <select
                      value={settings.timezone}
                      onChange={(e) => handleInputChange('timezone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="America/New_York">Eastern Time</option>
                      <option value="America/Chicago">Central Time</option>
                      <option value="America/Denver">Mountain Time</option>
                      <option value="America/Los_Angeles">Pacific Time</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                    <select
                      value={settings.language}
                      onChange={(e) => handleInputChange('language', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
                <div className="space-y-4">
                  {Object.entries(settings.emailNotifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </p>
                          <p className="text-xs text-gray-500">
                            {key === 'jobAlerts' && 'Receive notifications when new jobs match your criteria'}
                            {key === 'applicationUpdates' && 'Get updates on your job applications'}
                            {key === 'newsletter' && 'Weekly newsletter with job market insights'}
                            {key === 'marketingEmails' && 'Promotional emails and special offers'}
                          </p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value as boolean}
                          onChange={(e) => handleNestedChange('emailNotifications', key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Push Notifications</h3>
                <div className="space-y-4">
                  {Object.entries(settings.pushNotifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Smartphone className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </p>
                          <p className="text-xs text-gray-500">
                            {key === 'jobMatches' && 'Instant notifications for relevant job postings'}
                            {key === 'messages' && 'Messages from recruiters and employers'}
                            {key === 'reminders' && 'Application deadlines and follow-up reminders'}
                          </p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value as boolean}
                          onChange={(e) => handleNestedChange('pushNotifications', key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Visibility</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Who can see your profile?</label>
                    <select
                      value={settings.profileVisibility}
                      onChange={(e) => handleInputChange('profileVisibility', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="public">Public - Anyone can view</option>
                      <option value="recruiters">Recruiters only</option>
                      <option value="private">Private - Only you</option>
                    </select>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Eye className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Show Email Address</p>
                          <p className="text-xs text-gray-500">Allow recruiters to see your email</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.showEmail}
                          onChange={(e) => handleInputChange('showEmail', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Eye className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Show Phone Number</p>
                          <p className="text-xs text-gray-500">Allow recruiters to see your phone</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.showPhone}
                          onChange={(e) => handleInputChange('showPhone', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Allow Recruiter Contact</p>
                          <p className="text-xs text-gray-500">Let recruiters message you directly</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.allowRecruiterContact}
                          onChange={(e) => handleInputChange('allowRecruiterContact', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Theme</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { value: 'light', name: 'Light', icon: Sun },
                    { value: 'dark', name: 'Dark', icon: Moon },
                    { value: 'system', name: 'System', icon: Monitor }
                  ].map((theme) => (
                    <button
                      key={theme.value}
                      onClick={() => handleInputChange('theme', theme.value)}
                      className={`p-4 border-2 rounded-lg text-left transition-colors ${
                        settings.theme === theme.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <theme.icon className="w-6 h-6 mb-2 text-gray-600" />
                      <p className="font-medium text-gray-900">{theme.name}</p>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Display Options</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Compact Mode</p>
                    <p className="text-xs text-gray-500">Use smaller spacing and condensed layouts</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.compactMode}
                      onChange={(e) => handleInputChange('compactMode', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="px-6 py-4 bg-gray-50 border-t">
          <button
            onClick={saveSettings}
            type="button"
            className="flex items-center px-6 py-2 bg-primary-dark text-white rounded-lg hover:opacity-90 transition-colors"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}