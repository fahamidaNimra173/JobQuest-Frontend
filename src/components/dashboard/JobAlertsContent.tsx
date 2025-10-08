'use client';

import React, { useState } from 'react';
import { 
  Bell, 
  Plus, 
  Edit3, 
  Trash2, 
  MapPin, 
  DollarSign, 
  Calendar,
  Tag,
  Search,
  Settings,
  Power,
  PowerOff
} from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { useToast } from '@/components/ui/Toast';

interface JobAlert {
  id: number;
  title: string;
  keywords: string[];
  location: string;
  salaryMin: number;
  salaryMax: number;
  jobType: string;
  frequency: string;
  isActive: boolean;
  createdDate: string;
  lastNotified: string;
  matchCount: number;
}

interface JobAlertsContentProps {
  jobAlerts: JobAlert[];
}

export default function JobAlertsContent({ jobAlerts }: JobAlertsContentProps) {
  const [alerts, setAlerts] = useState(jobAlerts);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { showToast } = useToast();

  // Breadcrumb items for job alerts
  const breadcrumbItems = [
    { name: 'Job Alerts', href: '/dashboard/job-alerts', current: true }
  ];

  const toggleAlert = (id: number) => {
    console.log('Toggling alert:', id);
    const alert = alerts.find(a => a.id === id);
    setAlerts(alerts.map(alertItem => 
      alertItem.id === id ? { ...alertItem, isActive: !alertItem.isActive } : alertItem
    ));
    showToast('success', 'Alert Updated', `Alert ${id} ${alert?.isActive ? 'deactivated' : 'activated'} successfully`);
  };

  const deleteAlert = (id: number) => {
    console.log('Deleting alert:', id);
    if (window.confirm('Are you sure you want to delete this alert?')) {
      setAlerts(alerts.filter(alertItem => alertItem.id !== id));
      showToast('success', 'Alert Deleted', `Alert ${id} deleted successfully`);
    }
  };

  const handleCreateAlert = () => {
    console.log('Creating new alert');
    setShowCreateModal(true);
  };

  const filteredAlerts = alerts.filter(alert =>
    alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const activeAlerts = alerts.filter(alert => alert.isActive).length;
  const totalMatches = alerts.reduce((sum, alert) => sum + alert.matchCount, 0);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Job Alerts</h1>
          <p className="text-gray-600">Stay updated with the latest job opportunities</p>
        </div>
        <button
          onClick={handleCreateAlert}
          type="button"
          className="flex items-center px-4 py-2 bg-primary-dark text-white rounded-lg hover:opacity-90 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Alert
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Alerts</p>
              <p className="text-3xl font-bold text-gray-900">{activeAlerts}</p>
            </div>
            <Bell className="w-8 h-8 text-primary-dark" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Alerts</p>
              <p className="text-3xl font-bold text-gray-900">{alerts.length}</p>
            </div>
            <Settings className="w-8 h-8 text-primary-medium" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Job Matches</p>
              <p className="text-3xl font-bold text-gray-900">{totalMatches}</p>
            </div>
            <Search className="w-8 h-8 text-primary-medium" />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg border p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search job alerts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent placeholder:text-gray-500 dark:placeholder:text-gray-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-300"
          />
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="bg-white rounded-lg border p-8 text-center">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No job alerts found. Create your first alert to get started!</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div key={alert.id} className="bg-white rounded-lg border p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{alert.title}</h3>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleAlert(alert.id)}
                        type="button"
                        className={`p-1 rounded-full transition-colors ${
                          alert.isActive 
                            ? 'text-primary-dark hover:bg-primary-light' 
                            : 'text-gray-400 hover:bg-gray-50'
                        }`}
                        title={alert.isActive ? 'Deactivate alert' : 'Activate alert'}
                      >
                        {alert.isActive ? <Power className="w-5 h-5" /> : <PowerOff className="w-5 h-5" />}
                      </button>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        alert.isActive 
                          ? 'bg-primary-light text-primary-dark' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {alert.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Tag className="w-4 h-4 mr-2" />
                        <span className="font-medium">Keywords:</span>
                        <div className="ml-2 flex flex-wrap gap-1">
                          {alert.keywords.map((keyword, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="font-medium">Location:</span>
                        <span className="ml-2">{alert.location}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <DollarSign className="w-4 h-4 mr-2" />
                        <span className="font-medium">Salary:</span>
                        <span className="ml-2">
                          ${alert.salaryMin.toLocaleString()} - ${alert.salaryMax.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Bell className="w-4 h-4 mr-2" />
                        <span className="font-medium">Frequency:</span>
                        <span className="ml-2">{alert.frequency}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        Created {new Date(alert.createdDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Bell className="w-3 h-3 mr-1" />
                        Last notified {new Date(alert.lastNotified).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-primary-dark">
                        {alert.matchCount} matches found
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button 
                    type="button"
                    onClick={() => showToast('info', 'Edit Alert', 'Edit functionality opened')}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteAlert(alert.id)}
                    type="button"
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Alert Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={() => setShowCreateModal(false)} />
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Create Job Alert</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Plus className="w-6 h-6 transform rotate-45" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alert Title</label>
                  <input
                    type="text"
                    placeholder="e.g., Frontend Developer Jobs"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent placeholder:text-gray-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Keywords</label>
                  <input
                    type="text"
                    placeholder="React, JavaScript, TypeScript"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent placeholder:text-gray-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="New York, NY or Remote"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent placeholder:text-gray-400"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Min Salary</label>
                    <input
                      type="number"
                      placeholder="80000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Salary</label>
                    <input
                      type="number"
                      placeholder="120000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent placeholder:text-gray-400"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notification Frequency</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent">
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-2 bg-primary-dark text-white rounded-lg hover:opacity-90 transition-colors"
                  >
                    Create Alert
                  </button>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}