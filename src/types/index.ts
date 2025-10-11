// User types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  location?: string;
  title?: string;
  bio?: string;
  profilePictureUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// Job types
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance';
  description: string;
  requirements: string[];
  benefits?: string[];
  postedDate: string;
  expiryDate?: string;
  isActive: boolean;
  featured?: boolean;
  companyLogo?: string;
}

// Application types
export interface JobApplication {
  id: string;
  jobId: string;
  userId: string;
  status: 'Applied' | 'Under Review' | 'Interview Scheduled' | 'Rejected' | 'Offer' | 'Accepted';
  appliedDate: string;
  coverLetter?: string;
  resumeUrl?: string;
  notes?: string;
  job?: Job;
}

// Job Alert types
export interface JobAlert {
  id: string;
  userId: string;
  title: string;
  keywords: string[];
  location?: string;
  salaryMin?: number;
  salaryMax?: number;
  jobType?: string;
  frequency: 'Daily' | 'Weekly' | 'Monthly';
  isActive: boolean;
  createdDate: string;
  lastNotified?: string;
  matchCount?: number;
}

// Resume types
export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  location?: string;
  description?: string;
  achievements?: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  achievements?: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  githubUrl?: string;
  startDate?: string;
  endDate?: string;
}

export interface Resume {
  id: string;
  userId: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    location?: string;
    portfolio?: string;
    linkedin?: string;
    github?: string;
  };
  summary?: string;
  experience: WorkExperience[];
  education: Education[];
  skills: {
    technical: string[];
    frameworks: string[];
    tools: string[];
    languages?: string[];
  };
  projects: Project[];
  certifications?: Array<{
    id: string;
    name: string;
    issuer: string;
    issueDate: string;
    expiryDate?: string;
    credentialUrl?: string;
  }>;
  updatedAt: string;
}

// Settings types
export interface UserSettings {
  id: string;
  userId: string;
  emailNotifications: {
    jobAlerts: boolean;
    applicationUpdates: boolean;
    newsletter: boolean;
    marketingEmails: boolean;
  };
  pushNotifications: {
    jobMatches: boolean;
    messages: boolean;
    reminders: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'recruiters' | 'private';
    showEmail: boolean;
    showPhone: boolean;
    allowRecruiterContact: boolean;
  };
  preferences: {
    theme: 'light' | 'dark' | 'system';
    language: string;
    timezone: string;
    compactMode: boolean;
  };
  updatedAt: string;
}

// API Response types
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface SearchFilters {
  keywords?: string;
  location?: string;
  jobType?: string;
  salaryMin?: number;
  salaryMax?: number;
  company?: string;
  remote?: boolean;
  sortBy?: 'relevance' | 'date' | 'salary';
  sortOrder?: 'asc' | 'desc';
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Component Props types
export interface DashboardLayoutProps {
  children: React.ReactNode;
}

export interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}