// API configuration for backend communication
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Add authentication token if available
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      // Check if response is JSON before parsing
      const contentType = response.headers.get('content-type');
      const isJson = contentType && contentType.includes('application/json');
      
      let data;
      if (isJson) {
        data = await response.json();
      } else {
        // If not JSON, likely an error page (HTML)
        const textContent = await response.text();
        if (!response.ok) {
          throw new Error(`Server error (${response.status}): ${response.statusText}`);
        }
        // Fallback for non-JSON success responses
        data = { success: true, data: textContent, message: 'Success' };
      }

      if (!response.ok) {
        throw new Error(data.message || `Server error (${response.status}): ${response.statusText}`);
      }

      return data;
    } catch (error) {
      console.error('API Request failed:', error);
      // Provide more specific error messages
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Unable to connect to the server. Please check your internet connection and try again.');
      }
      throw error;
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData: Record<string, unknown>) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  // User profile endpoints
  async getProfile() {
    return this.request('/user/profile');
  }

  async updateProfile(profileData: Record<string, unknown>) {
    return this.request('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async changePassword(passwordData: Record<string, unknown>) {
    return this.request('/user/change-password', {
      method: 'POST',
      body: JSON.stringify(passwordData),
    });
  }

  // Job endpoints
  async searchJobs(params: Record<string, string>) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/jobs/search?${queryString}`);
  }

  async getJob(jobId: string) {
    return this.request(`/jobs/${jobId}`);
  }

  async applyToJob(jobId: string, applicationData: Record<string, unknown>) {
    return this.request(`/jobs/${jobId}/apply`, {
      method: 'POST',
      body: JSON.stringify(applicationData),
    });
  }

  async saveJob(jobId: string) {
    return this.request(`/jobs/${jobId}/save`, {
      method: 'POST',
    });
  }

  async unsaveJob(jobId: string) {
    return this.request(`/jobs/${jobId}/unsave`, {
      method: 'DELETE',
    });
  }

  // Applications endpoints
  async getApplications() {
    return this.request('/applications');
  }

  async getApplicationStatus(applicationId: string) {
    return this.request(`/applications/${applicationId}`);
  }

  // Saved jobs endpoints
  async getSavedJobs() {
    return this.request('/user/saved-jobs');
  }

  // Removed job alerts endpoints

  // Resume file upload endpoints (only used endpoints kept)

  async uploadResumeFile(file: File) {
    const formData = new FormData();
    formData.append('resume', file);

    return this.request('/user/resume/upload', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set content-type for FormData
    });
  }

  async deleteResumeFile(resumeId: string) {
    return this.request(`/user/resume/${resumeId}`, {
      method: 'DELETE',
    });
  }

  async getUploadedResumes() {
    return this.request('/user/resume/files');
  }
}

// Create a singleton instance
const apiClient = new ApiClient();

export default apiClient;
export type { ApiResponse };