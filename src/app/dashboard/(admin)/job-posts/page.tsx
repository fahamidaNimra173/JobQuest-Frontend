"use client";
import JobsTable from "@/components/dashboard/(admin)/JobsTable";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader } from "lucide-react";
import { useState } from "react";

const JobPosts = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { isPending, data: jobs = [] } = useQuery({
    queryKey: ["job-posts", page, rowsPerPage],
    queryFn: async () => {
      const res = await axios.get(
        `https://job-portal-backend-xshy.onrender.com/api/jobs`,
        {
          params: {
            page,
            limit: rowsPerPage,
          },
        }
      );
      return res.data.jobs;
    },
  });

  const breadcrumbItems = [
    {
      name: "Job Posts",
      href: "/dashboard/job-posts",
      current: true,
    },
  ];

  return (
    <div className="px-4">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <h2 className="text-3xl font-bold mb-4 text-center text-[#7670D6]">
        Job Posts
      </h2>

      {/* Table */}
      {isPending ? (
        <div className="h-[50vh] w-full flex items-center justify-center">
          <Loader size={40} className="animate-spin"></Loader>
        </div>
      ) : jobs.length === 0 ? (
        <p className="text-center mt-10 text-gray-600 text-lg font-medium">
          No reviews found.
        </p>
      ) : (
        // <JobsTable
        //   page={page}
        //   rowsPerPage={rowsPerPage}
        //   setPage={setPage}
        //   setRowsPerPage={setRowsPerPage}
        // ></JobsTable>
        <p>here the table</p>
      )}
    </div>
  );
};

export default JobPosts;
