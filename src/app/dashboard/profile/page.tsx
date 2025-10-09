import { Metadata } from 'next';
import ProfileContent from '@/components/dashboard/ProfileContent';

export const metadata: Metadata = {
  title: 'My Profile - JobQuest',
  description: 'Manage your profile information',
};

export default async function ProfilePage() {
  // This would typically fetch user data from the backend
  const userData = {
    personalInfo: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      title: 'Senior Frontend Developer',
      bio: 'Passionate frontend developer with 5+ years of experience in React, TypeScript, and modern web technologies.'
    },
    experience: [
      {
        id: 1,
        company: 'TechCorp Inc.',
        position: 'Senior Frontend Developer',
        startDate: '2022-01',
        endDate: null,
        current: true,
        description: 'Lead frontend development for enterprise applications using React and TypeScript.'
      },
      {
        id: 2,
        company: 'WebSolutions Ltd.',
        position: 'Frontend Developer',
        startDate: '2020-06',
        endDate: '2021-12',
        current: false,
        description: 'Developed responsive web applications and improved user experience.'
      }
    ],
    education: [
      {
        id: 1,
        institution: 'University of Technology',
        degree: 'Bachelor of Science in Computer Science',
        startDate: '2016-09',
        endDate: '2020-05',
        gpa: '3.8'
      }
    ],
    skills: ['React', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Node.js', 'Git', 'Figma', 'Tailwind CSS']
  };

  return <ProfileContent userData={userData} />;
}