"use client";

import { FC, useEffect, useState } from "react";


interface StatCardProps {
  title: string;
  value: number;
}

const StatCard: FC<StatCardProps> = ({ title, value }) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1500;
    const stepTime = Math.abs(Math.floor(duration / end));

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="bg-white backdrop-blur-md p-6 rounded-2xl shadow-lg text-center w-40 sm:w-48">
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-mono font-bold text-purple-500">{count}<span className="text-yellow-500">+</span> </h2>
      <p className="mt-2 text-purple-500 text-sm font-mono sm:text-base">{title}</p>
    </div>
  );
};

const TotalStats: FC = () => {
  return (
    <section className="relative w-full min-h-[600px] flex items-center justify-center px-6 lg:px-[120px] overflow-hidden">
      {/* Fixed Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-fixed bg-center bg-cover -z-10"
        style={{
          backgroundImage: "url('https://i.ibb.co.com/0p4F8swX/wave.jpg')",
        }}
      />

      {/* Purple Overlay */}
      <div className="absolute inset-0 bg-purple-900/70 -z-0" />

      {/* Content */}
      <div className="relative z-10 container mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left Title */}
        <div className="max-w-lg text-center lg:text-left">
          <h1 className="text-4xl font-mono sm:text-5xl font-extrabold text-white leading-tight">
            Empowering <span className="text-yellow-500">Careers</span>, Connecting <span className="text-yellow-500">Opportunities</span>
          </h1>
          <p className="mt-4 font-sans text-lg text-purple-100">
            Join our growing community and explore endless opportunities.
          </p>
        </div>

        {/* Right Stats */}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-10">
          <StatCard title="Total Users" value={100} />
          <StatCard title="Job Posts" value={50} />
          <StatCard title="Hired" value={30} />
        </div>
      </div>
    </section>
  );
};

export default TotalStats;