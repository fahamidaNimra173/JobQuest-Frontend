"use client";

import { useQuery } from "@tanstack/react-query";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import axiosInstance from "@/lib/axios";

interface ReviewData {
  _id?: string;
  name: string;
  designation?: string;
  review: string;
  email: string;
  rating?: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  image?: string;
}

export function AnimatedTestimonialsDemo() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async (): Promise<ReviewData[]> => {
      try {
        const response = await axiosInstance.get<ReviewData[]>("/reviews");
        console.log("API Response:", response.data); // Debug response
        if (!response.data) {
          throw new Error("No data returned from API");
        }
        return response.data;
      } catch (err) {
        console.error("API Error:", err);
        throw err;
      }
    },
  });

  const defaultTestimonials = [
    {
      quote:
        "JobQuest made my job search so much easier! I landed multiple interviews within a week.",
      name: "Sarah Chen",
      designation: "Software Engineer",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80",
    },
  ];

  const testimonials =
    data?.map((review) => ({
      quote: review.review,
      name: review.name || "Anonymous User",
      designation: review.designation || "JobQuest Member",
      src:
        review.image || "https://i.ibb.co.com/d06hvC97/icons-1294545-1280.png",
    })) || defaultTestimonials;

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center text-white bg-[#7670d6]">
        Loading testimonials...
      </div>
    );
  }

  if (error) {
    console.error("Query Error:", error);
    return (
      <div className="flex h-[400px] items-center justify-center text-red-200 bg-[#7670d6]">
        Failed to load testimonials 😢: {error.message}
      </div>
    );
  }

  return (
    <div
      className="relative bg-cover lg:h-[500px] bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://i.ibb.co/hxHJ6mfz/the-perfect-first.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-[#7670d6]/85"></div>
      <div className="relative z-10">
        <AnimatedTestimonials testimonials={testimonials} />
      </div>
    </div>
  );
}