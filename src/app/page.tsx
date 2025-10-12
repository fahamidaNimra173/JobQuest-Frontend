import Link from "next/link";
import HeroBanner from "./component/Banner";
import FAQSection from "./component/FAQ";
import JobCard from "./component/shared/Cards";
import TotalStats from "./component/StatCard";
import { job } from "./types/job";
import { AnimatedTestimonialsDemo } from "./component/Testimonial";
import { ThreeDMarqueeDemo } from "./component/ThreeDMarqueeDemo";
import { ReviewSection } from "./component/Review";


async function getLatestJobs(): Promise<job[]> {
  try {
    const res = await fetch('https://job-portal-backend-xshy.onrender.com/api/jobs', {
      cache: 'no-store', // Always fetch fresh data
      // OR use: next: { revalidate: 60 } // Revalidate every 60 seconds
    });

    if (!res.ok) {
      throw new Error('Failed to fetch jobs');
    }

    const data = await res.json();
    const jobs = Array.isArray(data) ? data : data.jobs;

    // Return only the latest 6 jobs
    return jobs.slice(0, 6);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}
export default async function Home() {
  const latestJobs = await getLatestJobs();
  console.log(latestJobs.length)
  return (
    <div className="md:space-y-9 space-y-5">
      <HeroBanner></HeroBanner>
      <TotalStats></TotalStats>
      <section className="py-16 px-6 lg:px-[120px]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-mono text-[#7670d6]  mb-4">
              Latest Job <span className="text-yellow-500">Opportunities</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl  font-sans mx-auto">
              Discover the newest positions from top companies. Apply now and take the next step in your career.
            </p>
          </div>

          {/* Job Cards Grid */}
          {latestJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestJobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No jobs available at the moment.</p>
            </div>
          )}

          {/* View All Jobs Button */}
          <div className="text-center mt-12">
            <Link
              href="/jobs"
              className="inline-block px-8 py-3 bg-[#7670d6] text-white rounded-lg font-semibold hover:bg-[#6660c6] transition-colors"
            >
              View All Jobs
            </Link>
          </div>
        </div>
      </section>
      <div className="my-20 lg:my-30">
        <h1 className="text-3xl mb-15 font-bold font-mono text-center px-6 md:text-4xl  text-primary-dark ">Trusted Remote-First Tech <span className="text-yellow-500">Companies</span> for <span className="text-yellow-500"> Developers</span> </h1>
        <ThreeDMarqueeDemo></ThreeDMarqueeDemo>
      </div>
          <div className="mb-20 lg:mb-40">
            <h1 className="text-3xl text-center mt-20 mb-10 font-bold font-mono text-shadow-md shadow-black  px-6 md:text-4xl  text-primary-dark "><span className="text-yellow-500">Words</span> That <span className="text-yellow-500">Inspire </span>Us</h1>
            <AnimatedTestimonialsDemo></AnimatedTestimonialsDemo>
          </div>
      

      <FAQSection></FAQSection>
      <ReviewSection></ReviewSection>

    </div>
  );
}
