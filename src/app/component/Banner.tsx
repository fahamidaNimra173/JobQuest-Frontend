import Image from 'next/image';
import { Search, MapPin, Briefcase } from 'lucide-react';

export default function HeroBanner() {
  return (
    <div className="relative mb-20 lg:mb-52">
      {/* Fixed Background Image */}
      <div className="absolute   inset-0 -z-0">
        <Image
          src="/banner-1.jpg"
          alt="Background"
          fill
          className="object-cover  fixed"
          priority
        />
      </div>

      {/* Second Transparent Background Image */}
      <div className="absolute inset-0 z-30">
        <Image
          src="/banner-2.jpg"
          alt="Overlay Pattern"
          fill
          className="object-cover opacity-90"
          priority
        />
      </div>

      {/* Transparent Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* Content Container */}
      <div className="relative z-50 min-h-screen flex flex-col justify-center items-center px-4 pt-24 pb-32 md:pb-20">
        {/* Title and Image Section */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 mb-20 md:mb-32 max-w-6xl w-full">
          {/* Title */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mono font-bold text-white mb-3 md:mb-4 leading-tight">
              Find Your Dream Job Today
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90">
              Thousands of opportunities waiting for you
            </p>
          </div>

          {/* Side Image */}
          <div className="flex-shrink-0">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80">
              <Image
                src="/banner-3.png"
                alt="Hero"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* Search Box at Bottom Center */}
        <div className="w-full max-w-4xl px-4 md:absolute md:-bottom-10 md:left-1/2 md:transform md:-translate-x-1/2 z-10">
          <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Search by Category */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search by Category
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="e.g., Software Developer"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7670d6] focus:border-transparent text-gray-900"
                  />
                </div>
              </div>

              {/* Search by Location */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search by Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="e.g., New York"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7670d6] focus:border-transparent text-gray-900"
                  />
                </div>
              </div>
            </div>

            {/* Search Button */}
            <button className="w-full mt-4 bg-[#7670d6] text-white py-3 rounded-lg font-semibold hover:bg-[#6660c6] transition-colors flex items-center justify-center gap-2">
              <Search size={20} />
              <span>Search Jobs</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}