export interface job {
  _id: string;
  jobTitle: string;
  companyName: string;
  companyDescription: string;
  location: string;
  jobDescription: string;
  jobType: string;
  workArrangement: string;
  jobStartDate: string;
  salary: {
    fixed: number;
    currency: string;
  };
  benefits: string[];
  skills: string[];
  experienceLevel: {
    level: string;
    years: number;
  };
  industry: string;
  totalApplicants: number;
  applicationDeadline: string;
  postedAt: string;
}