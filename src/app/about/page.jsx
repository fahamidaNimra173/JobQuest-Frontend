import Image from 'next/image';
import { Target, Users, Zap, Award, TrendingUp, Heart, LinkedinIcon, GithubIcon, LucideGithub } from 'lucide-react';
import Image1 from '../../../public/1d29fc60-9ada-476b-be99-fecb861b51bb.jpg'
import Image2 from '../../../public/bc9fd4bd-de9b-4555-976c-8360576c6708.jpg'
import Image3 from '../../../public/avatar-1606914_1280.png'
// import LampDemo from '../component/LampContainer'
import {  Linkedin, Globe, Github } from "lucide-react";
import { IconMailFilled } from '@tabler/icons-react';
export default function AboutUsPage() {


    const values = [
        {
            icon: Target,
            title: "Mission-Driven",
            description: "We're committed to connecting talented individuals with meaningful career opportunities."
        },
        {
            icon: Users,
            title: "Community First",
            description: "Building a supportive ecosystem where job seekers and employers thrive together."
        },
        {
            icon: Zap,
            title: "Innovation",
            description: "Leveraging cutting-edge technology to make job searching seamless and efficient."
        },
        {
            icon: Heart,
            title: "Empathy",
            description: "Understanding the challenges of job searching and creating solutions that truly help."
        }
    ];

    const stats = [
        { number: "10K+", label: "Active Users" },
        { number: "5K+", label: "Job Listings" },
        { number: "95%", label: "Success Rate" },
        { number: "500+", label: "Companies" }
    ];

    const team = [
        {
            name: "Fahmida Nimra",
            role: "MERN Stack Developer",
            image: Image3,

            email: "mailto:fahmidanimra@gmail.com",
            linkedin: "https://www.linkedin.com/in/fahmida-nimra/",
            portfolio: "https://fahmida-nimra-portfolio.netlify.app/",
            github: "https://github.com/fahamidaNimra173",
        },
        {
            name: "Mottasim Billah Sadi",
            role: "MERN Stack Developer",
            image: Image2,

            email: "mailto:mottasimsadi@gmail.com",
            linkedin: "https://linkedin.com/in/mottasim",
            portfolio: "https://mottasim-sadi.netlify.app/",
            github: "https://github.com/mottasimsadi",
        },
        {
            name: "Sowmitra Guha",
            role: "MERN Stack Developer",
            image: Image1,

            email: "mailto:sowmitraguha@gmail.com",
            linkedin: "https://www.linkedin.com/in/sowmitra-guha-a6066b329",
            portfolio: "https://sowmitra-guha-portfolio.netlify.app/",
            github: "https://github.com/sowmitraguho",
        },
        {
            name: "Sarfaraz Akram",
            role: "MERN Stack Developer",
            image: Image2,

            email: "mailto:sarfaraz.akram055@gmail.com",
            linkedin: "https://www.linkedin.com/in/sarfarazakram",
            portfolio: "https://sarfarazakram.netlify.app/",
            github: "https://github.com/SarfarazAkram17",
        },
    ];


    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Banner */}
            <div
                className="relative h-96 bg-cover bg-center"
      
            >
                <div className="absolute inset-0 bg-[#7670d6]/80"></div>
                <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                            About JobQuest
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90">
                            Empowering careers, connecting opportunities, building futures
                        </p>
                    </div>
                    {/* <LampDemo></LampDemo> */}
                </div>
            </div>

            {/* Our Story Section */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-mono text-primary-dark font-bold text-gray-900 mb-6">
                                Our Story
                            </h2>
                            <div className="space-y-4 text-gray-700 leading-relaxed">
                                <p>
                                    JobQuest was born from a simple observation: job searching shouldn't be this hard.
                                    In 2020, our founder Sarah Johnson experienced firsthand the frustration of navigating
                                    outdated job portals and impersonal application processes.
                                </p>
                                <p>
                                    We set out to create something different—a platform that treats job seekers and employers
                                    as partners in success. By combining cutting-edge technology with a human-centered approach,
                                    we've built a community where opportunities meet ambition.
                                </p>
                                <p>
                                    Today, JobQuest serves thousands of users daily, helping them find not just jobs,
                                    but careers that align with their passions and goals. We're more than a job portal;
                                    we're your career companion.
                                </p>
                            </div>
                        </div>
                        <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl flex items-center justify-center">
                            <dotlottie-wc
                                src="https://lottie.host/78c75dad-762d-4e12-8f2a-8ee6a1ba4679/alCgIMIN7b.lottie"
                                style={{ width: "100%", height: "100%" }}
                                autoplay
                                loop
                            ></dotlottie-wc>
                        </div>
                    </div>
                </div>
            </section>


            {/* Stats Section */}
            <section className="py-16 px-4 bg-[#7670d6]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-white/90 text-lg">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Values Section */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl text-primary-dark font-mono font-bold text-gray-900 mb-4">
                            Our <span className='text-yellow-500'>Core</span> Values
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            These principles guide everything we do, from product development to customer support
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-shadow"
                                >
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#f8f3ed] rounded-full mb-4">
                                        <Icon className="text-[#7670d6]" size={32} />
                                    </div>
                                    <h3 className="text-xl text-primary-dark font-mono font-bold  mb-3">
                                        {value.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        {value.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="bg-gradient-to-br from-[#7670d6] to-[#9da0dc] rounded-2xl p-8 text-white">
                            <div className="flex items-center gap-3 mb-4">
                                <Target size={32} />
                                <h2 className="text-3xl font-bold">Our Mission</h2>
                            </div>
                            <p className="text-lg leading-relaxed text-white/90">
                                To democratize access to career opportunities by creating an intuitive,
                                inclusive platform that connects talent with their dream jobs, regardless
                                of background or experience level.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-[#9da0dc] to-[#d3d2ea] rounded-2xl p-8 text-gray-900">
                            <div className="flex items-center gap-3 mb-4">
                                <TrendingUp size={32} className="text-[#7670d6]" />
                                <h2 className="text-3xl font-bold">Our Vision</h2>
                            </div>
                            <p className="text-lg leading-relaxed text-gray-700">
                                To become the world's most trusted career platform, where every professional
                                finds meaningful work and every company discovers exceptional talent,
                                powered by innovation and empathy.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-mono uppercase text-primary-dark font-bold text-gray-900 mb-4">
                            Meet Our <span className='text-yellow-500'>team</span>
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Passionate professionals dedicated to revolutionizing the job search experience
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                            >
                                <div className="relative h-64">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-6 text-center">
                                    <h3 className="text-xl font-mono text-yellow-500 font-bold  mb-1">
                                        {member.name}
                                    </h3>
                                    <p className="text-[#7670d6] font-semibold mb-2">{member.role}</p>


                                    {/* Social Links */}
                                    <div className="flex justify-between gap-6 mt-8">
                                        <a
                                            href={member.email}
                                            className="text-red-400 fill-red-50 hover:text-[#7670d6] transition"
                                            aria-label="Email"
                                        >
                                            <IconMailFilled size={20} />
                                        </a>
                                        <a
                                            href={member.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 hover:text-[#7670d6] transition"
                                            aria-label="LinkedIn"
                                        >
                                            <LinkedinIcon size={20} />
                                        </a>
                                        <a
                                            href={member.portfolio}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-yellow-700 hover:text-[#7670d6] transition"
                                            aria-label="Portfolio"
                                        >
                                            <Globe size={20} />
                                        </a>
                                        <a
                                            href={member.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-900  hover:text-[#7670d6] transition"
                                            aria-label="GitHub"
                                        >
                                            <LucideGithub size={20} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 bg-[#f8f3ed]">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl text-primary-dark font-mono font-bold text-gray-900 mb-4">
                        Join Our <span className='text-yellow-500'>Journey</span>
                    </h2>
                    <p className="text-lg text-gray-700 mb-8">
                        Whether you're looking for your next opportunity or searching for top talent,
                        JobQuest is here to help you succeed.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button

                            className="px-8 py-3 bg-[#7670d6] text-white rounded-lg font-semibold hover:bg-[#6660c6] transition-colors">
                            Find Jobs
                        </button>
                        <button className="px-8 py-3 border-2 border-[#7670d6] text-[#7670d6] rounded-lg font-semibold hover:bg-[#7670d6] hover:text-white transition-colors">
                            Post a Job
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}