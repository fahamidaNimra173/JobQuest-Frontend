# Job Quest Frontend

[![Frontend Repository](https://img.shields.io/badge/Frontend-GitHub-black)](https://github.com/mottasimsadi/job-quest-frontend)
[![Backend Repository 1](https://img.shields.io/badge/Backend1-GitHub-blue)](https://github.com/SarfarazAkram17/Job-Quest-Backend)
[![Backend Repository 2](https://img.shields.io/badge/Backend2-GitHub-green)](https://github.com/sowmitraguho/job-portal-backend)
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://job-quest-frontend-lemon.vercel.app/)

Job Quest is a comprehensive job portal platform built with Next.js that connects job seekers with employers. The platform offers distinct dashboards for candidates, employers, and administrators, providing a tailored experience for each user type.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [User Roles](#user-roles)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)

## Features

- **Multi-role Authentication System**: Separate dashboards for candidates, employers, and admins
- **Job Management**: Create, browse, and apply for jobs with detailed descriptions
- **User Profiles**: Comprehensive profile management for all user types
- **Application Tracking**: Candidates can track their job applications
- **Demo Login**: One-click demo login for immediate access as admin, candidate, or employer without account creation
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- **Dark Mode Support**: Theme switching capability
- **Real-time Notifications**: Toast notifications for user actions
- **SEO Optimized**: Built with Next.js for optimal performance and SEO

### Demo Login Feature

For quick testing and exploration of the platform, we've implemented a demo login feature on the login page. Users can immediately access the platform as:

- **Admin**: Full access to administration features
- **Candidate**: Job seeker functionality to browse and apply for jobs
- **Employer**: Employer functionality to post jobs and manage applications

This feature eliminates the need to create accounts during initial exploration of the platform.

## Tech Stack

- **Frontend Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: React Context API
- **Data Fetching**: Axios with React Query
- **Authentication**: NextAuth.js
- **UI Components**: 
  - Lucide React Icons
  - Material UI
  - React Icons
- **Form Handling**: React Hook Form (implied)
- **Animations**: Framer Motion

## Architecture

The application follows a component-based architecture with a clear separation of concerns:

- **Pages**: Contain the main views and server-side logic
- **Components**: Reusable UI elements
- **Providers**: Context providers for global state management
- **Lib**: Utility functions and API configurations
- **Routes**: Role-based access control wrappers
- **Types**: TypeScript type definitions

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, or pnpm package manager
- Backend API (separate service)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mottasimsadi/job-quest-frontend
   cd job-quest-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Set up environment variables (see [Environment Variables](#environment-variables))

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_API_URL=https://your-backend-api-url.com
```

Replace `https://your-backend-api-url.com` with your actual backend API URL.

## Project Structure

```
src/
├── app/                 # Next.js app router pages
│   ├── (auth)/          # Authentication pages (login, signup)
│   ├── api/             # API routes
│   ├── dashboard/       # Dashboard pages for all roles
│   ├── jobs/            # Job listing and detail pages
│   └── ...
├── components/          # Reusable components
│   ├── dashboard/       # Role-specific dashboard components
│   ├── ui/              # Generic UI components
│   └── ...
├── lib/                 # Utility functions and configurations
├── providers/           # React context providers
├── routes/              # Route protection components
└── types/               # TypeScript type definitions
```

## User Roles

### Candidate
- Browse and search for jobs
- Apply to jobs
- Track application status
- Manage profile and resume
- Save favorite jobs

### Employer
- Post new job listings
- Manage company profile
- Review job applications
- View applicant details

### Admin
- Manage users
- Moderate job posts
- Oversee community posts
- View platform statistics

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the application for production
- `npm run start` - Starts the production server
- `npm run lint` - Runs ESLint for code quality checks

