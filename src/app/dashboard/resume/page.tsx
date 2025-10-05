import { Metadata } from 'next';
import ResumeContent from '@/components/dashboard/ResumeContent';

export const metadata: Metadata = {
  title: 'My Resume - JobQuest',
  description: 'Manage and update your resume',
};

export default async function ResumePage() {
  // This would typically fetch resume data from the backend
  const resumeData = {
    personalInfo: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      portfolio: 'https://johndoe.dev',
      linkedin: 'https://linkedin.com/in/johndoe'
    },
    summary: 'Experienced Frontend Developer with 5+ years of expertise in React, TypeScript, and modern web technologies. Passionate about creating user-friendly applications and leading development teams.',
    experience: [
      {
        id: 1,
        company: 'TechCorp Inc.',
        position: 'Senior Frontend Developer',
        startDate: '2022-01',
        endDate: null,
        current: true,
        location: 'New York, NY',
        achievements: [
          'Led a team of 4 developers in building enterprise applications',
          'Improved application performance by 40% through optimization',
          'Implemented automated testing reducing bugs by 60%'
        ]
      },
      {
        id: 2,
        company: 'WebSolutions Ltd.',
        position: 'Frontend Developer',
        startDate: '2020-06',
        endDate: '2021-12',
        current: false,
        location: 'Remote',
        achievements: [
          'Developed responsive web applications for 20+ clients',
          'Collaborated with design team to improve user experience',
          'Mentored junior developers and conducted code reviews'
        ]
      }
    ],
    education: [
      {
        id: 1,
        institution: 'University of Technology',
        degree: 'Bachelor of Science in Computer Science',
        startDate: '2016-09',
        endDate: '2020-05',
        gpa: '3.8',
        achievements: ['Dean\'s List', 'Computer Science Society President']
      }
    ],
    skills: {
      technical: ['React', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'SQL'],
      frameworks: ['Next.js', 'Express.js', 'TailwindCSS', 'Bootstrap'],
      tools: ['Git', 'Docker', 'AWS', 'Figma', 'Jest', 'Webpack']
    },
    projects: [
      {
        id: 1,
        name: 'E-commerce Platform',
        description: 'Full-stack e-commerce solution with React and Node.js',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        link: 'https://github.com/johndoe/ecommerce'
      },
      {
        id: 2,
        name: 'Task Management App',
        description: 'Collaborative task management tool with real-time updates',
        technologies: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
        link: 'https://github.com/johndoe/taskmanager'
      }
    ]
  };

  return <ResumeContent resumeData={resumeData} />;
}