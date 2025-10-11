// API configuration for backend communication
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string = API_BASE_URL) {
    this.axiosInstance = axios.create({
      baseURL: baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add authentication token to requests
    this.axiosInstance.interceptors.request.use(
      (config) => {
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('authToken');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Handle response errors
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Request failed:', error);
        if (!error.response) {
          // Network error
          throw new Error('Unable to connect to the server. Please check your internet connection and try again.');
        }
        return Promise.reject(error);
      }
    );
  }

  private async request<T>(
    endpoint: string,
    options: AxiosRequestConfig = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.axiosInstance({
        url: endpoint,
        ...options,
      });
      
      return response.data;
    } catch (error: any) {
      // Handle axios errors
      if (error.response) {
        // Server responded with error status
        throw new Error(error.response.data.message || `Server error (${error.response.status}): ${error.response.statusText}`);
      } else if (error.request) {
        // Request was made but no response received
        throw new Error('Unable to connect to the server. Please check your internet connection and try again.');
      } else {
        // Something else happened
        throw new Error(error.message || 'An unexpected error occurred');
      }
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      data: { email, password },
    });
  }

  async register(userData: Record<string, unknown>) {
    return this.request('/auth/register', {
      method: 'POST',
      data: userData,
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  // User profile endpoints
  async getProfile() {
    return this.request('/user/profile', {
      method: 'GET',
    });
  }

  async updateProfile(profileData: Record<string, unknown>) {
    return this.request('/user/profile', {
      method: 'PUT',
      data: profileData,
    });
  }

  // Candidate endpoints
  async getCandidateProfile() {
    return this.request('/candidates/profile', {
      method: 'GET',
    });
  }

  async updateCandidateProfile(profileData: Record<string, unknown>) {
    return this.request('/candidates/profile', {
      method: 'PUT',
      data: profileData,
    });
  }

  async getCandidateApplications() {
    return this.request('/candidates/applications', {
      method: 'GET',
    });
  }

  async getCandidateSavedJobs() {
    return this.request('/candidates/saved-jobs', {
      method: 'GET',
    });
  }

  async saveJobForCandidate(jobId: string) {
    return this.request(`/candidates/saved-jobs/${jobId}`, {
      method: 'POST',
    });
  }

  async unsaveJobForCandidate(jobId: string) {
    return this.request(`/candidates/saved-jobs/${jobId}`, {
      method: 'DELETE',
    });
  }

  async applyToJobAsCandidate(jobId: string, applicationData: Record<string, unknown>) {
    return this.request(`/candidates/applications/${jobId}`, {
      method: 'POST',
      data: applicationData,
    });
  }

  async getCandidateApplicationStatus(applicationId: string) {
    return this.request(`/candidates/applications/${applicationId}`, {
      method: 'GET',
    });
  }

  async getCandidateResumes() {
    return this.request('/candidates/resumes', {
      method: 'GET',
    });
  }

  async uploadCandidateResume(file: File) {
    const formData = new FormData();
    formData.append('resume', file);

    return this.request('/candidates/resumes', {
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  async deleteCandidateResume(resumeId: string) {
    return this.request(`/candidates/resumes/${resumeId}`, {
      method: 'DELETE',
    });
  }

  async changePassword(passwordData: Record<string, unknown>) {
    return this.request('/user/change-password', {
      method: 'POST',
      data: passwordData,
    });
  }

  // Job endpoints
  async searchJobs(params: Record<string, string>) {
    return this.request(`/jobs/search`, {
      method: 'GET',
      params: params,
    });
  }

  async getJob(jobId: string) {
    return this.request(`/jobs/${jobId}`, {
      method: 'GET',
    });
  }

  // Applications endpoints (deprecated - use candidate-specific endpoints)
  async getApplications() {
    return this.request('/applications', {
      method: 'GET',
    });
  }

  async getApplicationStatus(applicationId: string) {
    return this.request(`/applications/${applicationId}`, {
      method: 'GET',
    });
  }

  // Saved jobs endpoints (deprecated - use candidate-specific endpoints)
  async getSavedJobs() {
    return this.request('/user/saved-jobs', {
      method: 'GET',
    });
  }

  // Resume file upload endpoints (deprecated - use candidate-specific endpoints)
  async uploadResumeFile(file: File) {
    const formData = new FormData();
    formData.append('resume', file);

    return this.request('/user/resume/upload', {
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  async deleteResumeFile(resumeId: string) {
    return this.request(`/user/resume/${resumeId}`, {
      method: 'DELETE',
    });
  }

  async getUploadedResumes() {
    return this.request('/user/resume/files', {
      method: 'GET',
    });
  }
}

// Create a singleton instance
const apiClient = new ApiClient();

export default apiClient;
export type { ApiResponse };