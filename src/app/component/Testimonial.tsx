'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';

interface ReviewData {
  _id?: string;
  userName: string;
  designation?: string;
  review: string;
  email: string;
  rating?: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  image?: string;
}

export function AnimatedTestimonialsDemo() {
  // ✅ Fetch reviews with React Query
  const { data, error, isLoading } = useQuery({
    queryKey: ['reviews'],
    queryFn: async (): Promise<ReviewData[]> => {
      const response = await axiosInstance.get('/reviews');
      return response.data; // make sure your backend returns an array
    },
  });

  // ✅ Default fallback testimonials (optional)
  const defaultTestimonials = [
    {
      quote:
        'JobQuest made my job search so much easier! I landed multiple interviews within a week.',
      name: 'Sarah Chen',
      designation: 'Software Engineer',
      src: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80',
    },
  ];

  // ✅ Map API data into AnimatedTestimonials format
  const testimonials =
    data?.map((review) => ({
      quote: review.review,
      name: review.userName || 'Anonymous User',
      designation: review.designation || 'JobQuest Member',
      src:
        review.image ||
        'https://cdn-icons-png.flaticon.com/512/149/149071.png', // default avatar
    })) || defaultTestimonials;

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center text-white bg-[#7670d6]">
        Loading testimonials...
      </div>
    );
  }

  if (error) {
    console.error(error);
    return (
      <div className="flex h-[400px] items-center justify-center text-red-200 bg-[#7670d6]">
        Failed to load testimonials 😢
      </div>
    );
  }

  return (
    <div
      className="relative bg-cover lg:h-[500px] bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://i.ibb.co.com/hxHJ6mfz/the-perfect-first.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#7670d6]/85"></div>

      {/* Testimonials */}
      <div className="relative z-10">
        <AnimatedTestimonials testimonials={testimonials} />
      </div>
    </div>
  );
}
