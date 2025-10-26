"use client";

import { useState } from "react";
import { FaUsers, FaBuilding, FaBriefcase, FaFileAlt } from "react-icons/fa";
import { AiOutlineDollarCircle, AiOutlineEye } from "react-icons/ai";
import { MdLocationOn, MdAccessTime } from "react-icons/md";
import { IconType } from "react-icons";

// Types
interface StatsCard {
  title: string;
  value: string;
  icon: IconType;
  color: string;
  bgColor: string;
  change: string;
}

interface JobPost {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  postedDate: string;
  applicants: number;
  status: "Active" | "Closed" | "Pending";
}

const AdminDashboard = () => {
  // Stats cards data
  const statsCards: StatsCard[] = [
    {
      title: "Total Users",
      value: "5,347",
      icon: FaUsers,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      change: "+12.5%",
    },
    {
      title: "Total Payments",
      value: "$45,678",
      icon: AiOutlineDollarCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
      change: "+18.2%",
    },
    {
      title: "Total Job Posts",
      value: "1,234",
      icon: FaBriefcase,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      change: "+8.7%",
    },
    {
      title: "Total Job Applies",
      value: "5,432",
      icon: FaFileAlt,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      change: "+25.3%",
    },
  ];

  // Recent job posts data
  const recentJobPosts: JobPost[] = [
    {
      id: 1,
      title: "Senior React Developer",
      company: "TechCorp Solutions",
      location: "New York, NY",
      type: "Full-time",
      salary: "$120k - $150k",
      postedDate: "2 hours ago",
      applicants: 45,
      status: "Active",
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Innovation Labs",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$130k - $160k",
      postedDate: "5 hours ago",
      applicants: 67,
      status: "Closed",
    },
    {
      id: 3,
      title: "UX/UI Designer",
      company: "Creative Studio",
      location: "Remote",
      type: "Part-time",
      salary: "$80k - $100k",
      postedDate: "1 day ago",
      applicants: 32,
      status: "Active",
    },
    {
      id: 4,
      title: "Data Scientist",
      company: "DataFlow Inc",
      location: "Boston, MA",
      type: "Full-time",
      salary: "$140k - $170k",
      postedDate: "1 day ago",
      applicants: 89,
      status: "Pending",
    },
    {
      id: 5,
      title: "Marketing Specialist",
      company: "Growth Marketing Co",
      location: "Chicago, IL",
      type: "Contractual",
      salary: "$70k - $90k",
      postedDate: "2 days ago",
      applicants: 54,
      status: "Active",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Closed":
        return "bg-red-100 text-red-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Full-time":
        return "bg-blue-100 text-blue-700";
      case "Part-time":
        return "bg-purple-100 text-purple-700";
      case "Contractual":
        return "bg-orange-100 text-orange-700";
      case "Internship":
        return "bg-pink-100 text-pink-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen w-full px-4">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
          Admin Dashboard
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">
          Welcome back! Here&apos;s what&apos;s happening with your platform
          today.
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6 sm:mb-8">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 sm:p-6 border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`${stat.color} text-2xl`} />
                </div>
                <span className="text-green-600 text-xs sm:text-sm font-semibold bg-green-50 px-2 py-1 rounded">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">
                {stat.title}
              </h3>
              <p className="text-2xl sm:text-3xl font-bold text-gray-800">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Recent Job Posts Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Recent Job Posts
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Latest job postings on your platform
              </p>
            </div>
            <button className="text-sm sm:text-base text-blue-600 hover:text-blue-700 font-semibold hover:underline">
              View All
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {recentJobPosts.map((job) => (
            <div
              key={job.id}
              className="p-4 sm:p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Job Info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-gray-800">
                      {job.title}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        job.status
                      )}`}
                    >
                      {job.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <FaBuilding className="text-gray-400 text-sm flex-shrink-0" />
                    <p className="text-sm sm:text-base text-gray-700 font-medium">
                      {job.company}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MdLocationOn className="text-gray-400 flex-shrink-0" />
                      <span>{job.location}</span>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                        job.type
                      )}`}
                    >
                      {job.type}
                    </span>
                    <div className="flex items-center gap-1">
                      <AiOutlineDollarCircle className="text-gray-400 flex-shrink-0" />
                      <span className="font-semibold text-gray-700">
                        {job.salary}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Job Stats */}
                <div className="flex items-center gap-4 sm:gap-6 lg:flex-col lg:items-end lg:gap-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MdAccessTime className="text-gray-400" />
                    <span>{job.postedDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-lg">
                      <FaUsers className="text-blue-600 text-sm" />
                      <span className="text-sm font-semibold text-blue-700">
                        {job.applicants} applicants
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                <button className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
                  <AiOutlineEye />
                  View Details
                </button>
                <button className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 hover:border-gray-400 text-gray-700 text-sm font-medium rounded-lg transition-colors">
                  Manage
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;