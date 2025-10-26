"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { AiOutlineFileText, AiOutlineDollarCircle } from "react-icons/ai";
import { MdWorkOutline, MdRateReview } from "react-icons/md";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FaUserCheck, FaUsers, FaBuilding } from "react-icons/fa";
import { IconType } from "react-icons";
import Breadcrumb from "@/components/ui/Breadcrumb";

// Types
interface StatsCard {
  title: string;
  value: string;
  icon: IconType;
  color: string;
  change: string;
}

interface JobCategory {
  name: string;
  value: number;
  [key: string]: string | number;
}

interface MonthlyAppliesData {
  month: string;
  fullTime: number;
  partTime: number;
  internship: number;
  contractual: number;
}

interface MonthlyData {
  month: string;
  count: number;
}

const StatisticsContent = () => {
  const [activeTab, setActiveTab] = useState<"posts" | "applies">("posts");

  // Stats cards data
  const statsCards: StatsCard[] = [
    {
      title: "Total Resume Uploads",
      value: "2,847",
      icon: AiOutlineFileText,
      color: "bg-blue-500",
      change: "+12%",
    },
    {
      title: "Total Job Posts",
      value: "1,234",
      icon: MdWorkOutline,
      color: "bg-purple-500",
      change: "+8%",
    },
    {
      title: "Total Community Posts",
      value: "3,567",
      icon: BiMessageSquareDetail,
      color: "bg-green-500",
      change: "+23%",
    },
    {
      title: "Total Reviews",
      value: "892",
      icon: MdRateReview,
      color: "bg-yellow-500",
      change: "+15%",
    },
    {
      title: "Total Payments",
      value: "$45,678",
      icon: AiOutlineDollarCircle,
      color: "bg-emerald-500",
      change: "+18%",
    },
    {
      title: "Total Job Applies",
      value: "5,432",
      icon: FaUserCheck,
      color: "bg-indigo-500",
      change: "+25%",
    },
    {
      title: "Total Candidates",
      value: "4,891",
      icon: FaUsers,
      color: "bg-pink-500",
      change: "+10%",
    },
    {
      title: "Total Employers",
      value: "456",
      icon: FaBuilding,
      color: "bg-orange-500",
      change: "+6%",
    },
  ];

  // Job categories data for pie chart
  const jobCategoriesData: JobCategory[] = [
    { name: "Full-time", value: 567 },
    { name: "Part-time", value: 342 },
    { name: "Internship", value: 189 },
    { name: "Contractual", value: 136 },
  ];

  // Colors for pie chart
  const COLORS: string[] = ["#8b5cf6", "#10b981", "#f59e0b", "#ef4444"];

  // Monthly job applies by type
  const monthlyAppliesData: MonthlyAppliesData[] = [
    {
      month: "Jan",
      fullTime: 320,
      partTime: 180,
      internship: 250,
      contractual: 400,
    },
    {
      month: "Feb",
      fullTime: 280,
      partTime: 350,
      internship: 210,
      contractual: 320,
    },
    {
      month: "Mar",
      fullTime: 450,
      partTime: 245,
      internship: 380,
      contractual: 195,
    },
    {
      month: "Apr",
      fullTime: 220,
      partTime: 430,
      internship: 320,
      contractual: 290,
    },
    {
      month: "May",
      fullTime: 390,
      partTime: 270,
      internship: 145,
      contractual: 405,
    },
    {
      month: "Jun",
      fullTime: 330,
      partTime: 490,
      internship: 360,
      contractual: 215,
    },
    {
      month: "Jul",
      fullTime: 510,
      partTime: 280,
      internship: 255,
      contractual: 410,
    },
    {
      month: "Aug",
      fullTime: 280,
      partTime: 360,
      internship: 440,
      contractual: 300,
    },
    {
      month: "Sep",
      fullTime: 450,
      partTime: 310,
      internship: 270,
      contractual: 525,
    },
    {
      month: "Oct",
      fullTime: 290,
      partTime: 530,
      internship: 385,
      contractual: 240,
    },
    {
      month: "Nov",
      fullTime: 570,
      partTime: 320,
      internship: 275,
      contractual: 430,
    },
    {
      month: "Dec",
      fullTime: 410,
      partTime: 450,
      internship: 495,
      contractual: 345,
    },
  ];

  // Monthly job posts data
  const monthlyJobPostsData: MonthlyData[] = [
    { month: "Jan", count: 85 },
    { month: "Feb", count: 95 },
    { month: "Mar", count: 110 },
    { month: "Apr", count: 102 },
    { month: "May", count: 125 },
    { month: "Jun", count: 140 },
    { month: "Jul", count: 135 },
    { month: "Aug", count: 120 },
    { month: "Sep", count: 155 },
    { month: "Oct", count: 165 },
    { month: "Nov", count: 150 },
    { month: "Dec", count: 175 },
  ];

  // Monthly job applies data
  const monthlyJobAppliesData: MonthlyData[] = [
    { month: "Jan", count: 665 },
    { month: "Feb", count: 785 },
    { month: "Mar", count: 920 },
    { month: "Apr", count: 860 },
    { month: "May", count: 1010 },
    { month: "Jun", count: 1095 },
    { month: "Jul", count: 1055 },
    { month: "Aug", count: 980 },
    { month: "Sep", count: 1155 },
    { month: "Oct", count: 1240 },
    { month: "Nov", count: 1195 },
    { month: "Dec", count: 1300 },
  ];

  // Custom label for pie chart
  const renderCustomLabel = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="font-semibold text-xs sm:text-sm"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const breadcrumbItems = [
    {
      name: "Statistics",
      href: "/dashboard/statistics",
      current: true,
    },
  ];

  return (
    <div className="w-full min-h-screen">
      <div className="px-4">
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
            Statistics Dashboard
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Overview of platform metrics and analytics
          </p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6 sm:mb-8">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl p-4 sm:p-6 transition-shadow"
              >
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className={`${stat.color} p-2 sm:p-3 rounded-lg`}>
                    <Icon className="text-white text-xl sm:text-2xl" />
                  </div>
                  <span className="text-green-600 text-xs sm:text-sm font-semibold">
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-gray-600 text-xs sm:text-sm font-medium mb-1">
                  {stat.title}
                </h3>
                <p className="text-xl sm:text-2xl font-bold text-gray-800">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Job Categories Pie Chart with Cards Grid */}
        <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">
            Job Categories Distribution
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <div className="flex items-center justify-center min-h-[250px] sm:min-h-[300px]">
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={jobCategoriesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomLabel}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {jobCategoriesData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Category Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {jobCategoriesData.map((category, index) => (
                <div
                  key={index}
                  className="border-2 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
                  style={{ borderColor: COLORS[index] }}
                >
                  <div
                    className="w-3 h-3 sm:w-4 sm:h-4 rounded-full mb-2 sm:mb-3"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <h3 className="text-gray-700 font-semibold text-sm sm:text-base mb-1">
                    {category.name}
                  </h3>
                  <p className="text-xl sm:text-2xl font-bold text-gray-800">
                    {category.value}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    {(
                      (category.value /
                        jobCategoriesData.reduce(
                          (sum, cat) => sum + cat.value,
                          0
                        )) *
                      100
                    ).toFixed(1)}
                    % of total
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Job Applies by Type */}
        <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">
            Monthly Job Applications by Type
          </h2>
          <div className="w-full overflow-x-auto">
            <div className="min-w-[500px] sm:min-w-0">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyAppliesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ fontSize: "14px" }} />
                  <Legend wrapperStyle={{ fontSize: "12px" }} iconSize={12} />
                  <Line
                    type="monotone"
                    dataKey="fullTime"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    name="Full-time"
                    dot={{ r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="partTime"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Part-time"
                    dot={{ r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="internship"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    name="Internship"
                    dot={{ r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="contractual"
                    stroke="#ef4444"
                    strokeWidth={2}
                    name="Contractual"
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Monthly Job Posts and Applies with Tabs */}
        <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">
            Monthly Overview
          </h2>

          {/* Tabs */}
          <div className="flex gap-2 mb-4 sm:mb-6 border-b border-gray-200 overflow-x-auto">
            <button
              onClick={() => setActiveTab("posts")}
              className={`px-4 sm:px-6 py-2 sm:py-3 font-medium transition-colors whitespace-nowrap text-sm sm:text-base ${
                activeTab === "posts"
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Job Posts
            </button>
            <button
              onClick={() => setActiveTab("applies")}
              className={`px-4 sm:px-6 py-2 sm:py-3 font-medium transition-colors whitespace-nowrap text-sm sm:text-base ${
                activeTab === "applies"
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Job Applies
            </button>
          </div>

          {/* Chart */}
          <div className="w-full overflow-x-auto">
            <div className="min-w-[500px] sm:min-w-0">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={
                    activeTab === "posts"
                      ? monthlyJobPostsData
                      : monthlyJobAppliesData
                  }
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ fontSize: "14px" }} />
                  <Legend wrapperStyle={{ fontSize: "12px" }} iconSize={12} />
                  <Bar
                    dataKey="count"
                    fill={activeTab === "posts" ? "#8b5cf6" : "#6366f1"}
                    radius={[8, 8, 0, 0]}
                    name={
                      activeTab === "posts" ? "Job Posts" : "Job Applications"
                    }
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsContent;