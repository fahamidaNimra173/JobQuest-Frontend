// app/career-advice/page.tsx
'use client';

import { 
  Lightbulb, 
  Target, 
  TrendingUp, 
  BookOpen, 
  Users, 
  Briefcase,
  CheckCircle,
  ArrowRight,
  Star,
  Award,
  Rocket,
  MessageSquare,
  X,
  Code,
  GraduationCap,
  Zap,
  LucideIcon
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import React from 'react';

interface Article {
  title: string;
  content: string;
}

interface CategoryCard {
  title: string;
  icon: React.ReactElement;
  description: string;
  color: string;
  articles: Article[];
}

// interface ExpertInsight {
//   quote: string;
//   author: string;
//   role: string;
// }

export default function CareerAdvicePage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryCard | null>(null);

  const adviceCategories: CategoryCard[] = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Career Planning",
      description: "Strategic approaches to map your career path and set achievable goals",
      color: "bg-purple-50 text-[#7670d6]",
      articles: [
        { 
          title: "How to Set SMART Career Goals",
          content: "SMART goals are Specific, Measurable, Achievable, Relevant, and Time-bound. Start by identifying what you want to achieve in your career. Be specific about the position, skills, or accomplishments you're targeting. Make sure you can measure your progress with concrete metrics. Ensure your goals are realistic given your current situation and resources. Align them with your long-term career vision and values. Finally, set clear deadlines to create urgency and accountability."
        },
        { 
          title: "Creating Your 5-Year Career Plan",
          content: "A 5-year career plan helps you visualize your professional future. Start by assessing where you are now - your current skills, experience, and position. Then define where you want to be in 5 years. Break this down into yearly milestones. Identify skills you need to develop, certifications to earn, and experiences to gain. Review and adjust your plan annually as your circumstances and goals evolve. Remember, flexibility is key - your plan should guide you, not limit you."
        },
        { 
          title: "Identifying Your Core Strengths",
          content: "Understanding your strengths is crucial for career success. Reflect on tasks that energize you and come naturally. Ask colleagues and mentors for honest feedback about what you do well. Take personality and strengths assessments like StrengthsFinder or MBTI. Look at your past achievements and identify common patterns. Consider what skills others often ask for your help with. Once identified, focus on roles and opportunities that leverage these strengths rather than constantly working on weaknesses."
        }
      ]
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Skill Development",
      description: "Master the skills that matter most in today's competitive job market",
      color: "bg-blue-50 text-blue-600",
      articles: [
        { 
          title: "Top 10 In-Demand Skills for 2025",
          content: "The job market is rapidly evolving. Key technical skills include AI/Machine Learning, Data Analysis, Cloud Computing, Cybersecurity, and Full-Stack Development. Essential soft skills are Emotional Intelligence, Adaptability, Critical Thinking, Communication, and Leadership. Focus on developing T-shaped skills - deep expertise in one area combined with broad knowledge across multiple domains. Continuous learning is no longer optional but essential for career longevity."
        },
        { 
          title: "Free Resources for Learning Tech Skills",
          content: "Take advantage of platforms like freeCodeCamp for web development, Coursera and edX for university courses, YouTube channels like Traversy Media and Fireship, and documentation sites. GitHub is invaluable for learning through open-source projects. Join communities on Discord and Reddit. Participate in coding challenges on LeetCode and HackerRank. Many bootcamps offer free introductory courses. Remember, consistency beats intensity - 30 minutes daily is better than cramming."
        },
        { 
          title: "Soft Skills That Boost Your Career",
          content: "Technical skills get you the interview, but soft skills get you the job and promotion. Communication - both written and verbal - is paramount. Develop active listening skills to truly understand others. Emotional intelligence helps navigate workplace dynamics. Time management and organization prevent burnout. Problem-solving and critical thinking set you apart. Adaptability is crucial in our fast-changing world. Learn to give and receive constructive feedback. These skills compound over time and are transferable across industries."
        }
      ]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Networking",
      description: "Build meaningful professional relationships that advance your career",
      color: "bg-green-50 text-green-600",
      articles: [
        { 
          title: "LinkedIn Networking Best Practices",
          content: "Your LinkedIn profile is your digital business card. Use a professional headshot and craft a compelling headline. Write a story-driven summary that showcases your value. Post valuable content regularly - share insights, comment thoughtfully, and engage authentically. Personalize connection requests with a brief note about why you want to connect. Join relevant groups and participate in discussions. Send follow-up messages after connecting. Remember, networking is about building relationships, not just collecting contacts."
        },
        { 
          title: "How to Attend Industry Events Effectively",
          content: "Preparation is key. Research attendees and speakers beforehand. Set clear goals - who do you want to meet? What do you want to learn? Bring business cards and a confident attitude. Start conversations with open-ended questions. Listen more than you talk. Follow up within 48 hours with personalized messages. Connect on LinkedIn with a note about your conversation. Don't just network with seniors - peers today become leaders tomorrow. Quality conversations beat quantity every time."
        },
        { 
          title: "Building Your Personal Brand Online",
          content: "Your personal brand is what people say about you when you're not in the room. Be consistent across all platforms - LinkedIn, Twitter, GitHub, personal website. Share your expertise through blog posts, videos, or podcasts. Engage with industry leaders and contribute to discussions. Showcase your projects and achievements. Be authentic - people connect with real humans, not corporate personas. Define your niche and become known for something specific. Remember, building a brand takes time and consistency."
        }
      ]
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Job Search",
      description: "Proven strategies to land your dream job faster and more effectively",
      color: "bg-yellow-50 text-yellow-600",
      articles: [
        { 
          title: "Crafting an ATS-Friendly Resume",
          content: "Applicant Tracking Systems scan resumes before humans see them. Use standard fonts and simple formatting. Include relevant keywords from the job description naturally. Use standard section headings like 'Work Experience' and 'Education'. Avoid tables, text boxes, and graphics. Save as .docx or .pdf (check job posting). Quantify achievements with numbers and percentages. Tailor each resume to the specific job. Include a skills section with industry-standard terms. Keep it to 1-2 pages maximum."
        },
        { 
          title: "How to Stand Out in Job Applications",
          content: "Research the company thoroughly before applying. Write a customized cover letter that addresses the company's pain points and shows how you can solve them. Use the STAR method to showcase achievements. Include a portfolio or work samples when relevant. Apply early - many positions receive hundreds of applications. Follow application instructions exactly. If possible, find an internal referral. Show enthusiasm for the role and company. Double-check for typos and errors. Follow up one week after applying if you haven't heard back."
        },
        { 
          title: "Following Up After Applications",
          content: "Timing matters - wait 1-2 weeks before following up. Send a polite, brief email expressing continued interest. Reference specific aspects of the role that excite you. Reiterate your key qualifications. Don't be pushy or desperate. If you have new achievements or certifications since applying, mention them. Connect with the hiring manager on LinkedIn professionally. Accept that no response is often a rejection. Keep applying elsewhere while you wait. Persistence is good, but respect their process and timeline."
        }
      ]
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Interview Skills",
      description: "Ace every interview with confidence and preparation techniques",
      color: "bg-red-50 text-red-600",
      articles: [
        { 
          title: "Common Interview Questions & Answers",
          content: "Prepare stories for 'Tell me about yourself' (professional journey in 2 minutes), 'Why this company?' (show research and alignment), 'Biggest weakness?' (show self-awareness and growth), 'Where do you see yourself in 5 years?' (show ambition and realistic planning). Use the STAR method for behavioral questions. Prepare questions to ask them - this shows genuine interest. Practice out loud, not just in your head. Record yourself to identify areas for improvement. Remember, they want you to succeed."
        },
        { 
          title: "Body Language Tips for Interviews",
          content: "First impressions form in 7 seconds. Arrive 10-15 minutes early to compose yourself. Offer a firm handshake and make eye contact. Sit up straight but relaxed. Use hand gestures naturally while speaking. Nod to show active listening. Mirror the interviewer's energy level subtly. Smile genuinely - it's contagious. Avoid crossing arms or fidgeting. For virtual interviews, look at the camera when speaking, not the screen. Your body language should convey confidence, enthusiasm, and professionalism."
        },
        { 
          title: "Negotiating Your Salary Package",
          content: "Research industry standards for your role and location using Glassdoor, Payscale, and LinkedIn Salary. Know your worth based on experience and skills. Wait for them to mention salary first if possible. When asked for expectations, give a range with your target at the lower end. Consider the total compensation package - benefits, equity, bonuses, PTO. Negotiate other aspects if salary is fixed - remote work, flexible hours, professional development budget. Be professional and positive throughout. Get everything in writing before accepting."
        }
      ]
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Career Growth",
      description: "Strategies for advancement and continuous professional development",
      color: "bg-indigo-50 text-indigo-600",
      articles: [
        { 
          title: "How to Ask for a Promotion",
          content: "Timing is crucial - ask during performance reviews or after major wins. Document your achievements and impact with metrics. Show how you've exceeded your current role's requirements. Research the next level's responsibilities and demonstrate you're already performing them. Prepare a business case showing your value to the company. Ask for feedback on what's needed for promotion. Be patient - promotions take time. If denied, ask for a clear roadmap and timeline. Consider lateral moves that position you better. Sometimes the best promotion is at a new company."
        },
        { 
          title: "Navigating Career Transitions",
          content: "Career transitions are increasingly common and normal. Identify transferable skills from your current field. Network in your target industry before leaving your current role. Consider informational interviews to learn about the new field. Update your resume to highlight relevant experience. Be prepared to take a temporary pay cut for long-term gain. Consider bridge roles or freelancing during the transition. Get relevant certifications or training if needed. Be patient with yourself - transitions take time. Build a financial cushion before making the leap."
        },
        { 
          title: "Building Leadership Skills",
          content: "Leadership isn't just for managers. Take initiative on projects without being asked. Mentor junior colleagues informally. Volunteer to lead cross-functional initiatives. Develop your communication and influence skills. Learn to give constructive feedback effectively. Take responsibility for mistakes and learn from them. Read leadership books and follow thought leaders. Practice active listening and empathy. Make decisions based on data and principles. Lead by example in work ethic and attitude. Remember, leadership is a skill that can be developed, not an innate trait."
        }
      ]
    }
  ];

  const quickTips: string[] = [
    "Update your resume every 3 months, even if you're not actively job hunting",
    "Spend 15 minutes daily learning something new in your field",
    "Connect with 2-3 new professionals in your industry each week",
    "Practice the STAR method for behavioral interview questions",
    "Set up job alerts for your target positions on multiple platforms",
    "Ask for feedback after every interview, whether you get the job or not"
  ];

  interface ExpertInsight {
    quote: string;
    author: string;
    role: string;
  }

  const expertInsights: ExpertInsight[] = [
    {
      quote: "Your network is your net worth. Invest time in building genuine professional relationships.",
      author: "Career Expert",
      role: "LinkedIn Top Voice"
    },
    {
      quote: "Don't just list your job duties on your resume. Show the impact you made with metrics and results.",
      author: "HR Professional",
      role: "Recruitment Specialist"
    },
    {
      quote: "The best time to look for a job is when you already have one. Stay market-ready.",
      author: "Career Coach",
      role: "Executive Coach"
    }
  ];

  const openModal = (category: CategoryCard): void => {
    setSelectedCategory(category);
  };

  const closeModal = (): void => {
    setSelectedCategory(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary-lightest py-20">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full mb-6">
            <Lightbulb className="w-5 h-5" />
            <span className="text-sm font-semibold">Expert Career Guidance</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-mono font-bold mb-6">
            <span className="text-yellow-500">Career</span>{' '}
            <span className="text-[#7670d6]">Advice</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-sans leading-relaxed">
            Navigate your career journey with expert insights, proven strategies, and practical tips 
            to help you achieve your professional goals.
          </p>
        </div>

        {/* Hero Images Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="relative h-64 rounded-xl overflow-hidden shadow-lg group">
            <div className="absolute inset-0 bg-gradient-to-t from-[#7670d6]/90 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <Code className="w-8 h-8 text-white mb-2" />
              <h3 className="text-white font-mono font-bold text-xl mb-1">Tech Skills</h3>
              <p className="text-white/90 font-sans text-sm">Master in-demand technologies</p>
            </div>
          </div>

          <div className="relative h-64 rounded-xl overflow-hidden shadow-lg group">
            <div className="absolute inset-0 bg-gradient-to-t from-[#7670d6]/90 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-teal-600"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <GraduationCap className="w-8 h-8 text-white mb-2" />
              <h3 className="text-white font-mono font-bold text-xl mb-1">Career Growth</h3>
              <p className="text-white/90 font-sans text-sm">Advance your professional journey</p>
            </div>
          </div>

          <div className="relative h-64 rounded-xl overflow-hidden shadow-lg group">
            <div className="absolute inset-0 bg-gradient-to-t from-[#7670d6]/90 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-orange-600"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <Zap className="w-8 h-8 text-white mb-2" />
              <h3 className="text-white font-mono font-bold text-xl mb-1">Interview Prep</h3>
              <p className="text-white/90 font-sans text-sm">Ace your next opportunity</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Categories */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-mono font-bold text-gray-900 mb-4">
            Explore <span className="text-yellow-500">Career Topics</span>
          </h2>
          <p className="text-lg text-gray-600 font-sans">
            Comprehensive guides to accelerate your professional growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {adviceCategories.map((category, index) => (
            <div 
              key={index}
              onClick={() => openModal(category)}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
            >
              <div className="p-6">
                <div className={`${category.color} w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <h3 className="text-2xl font-mono font-bold text-gray-900 mb-3">
                  {category.title}
                </h3>
                <p className="text-gray-600 font-sans mb-6">
                  {category.description}
                </p>
                
                {/* Article Count */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <BookOpen className="w-4 h-4" />
                    <span className="font-sans">{category.articles.length} detailed guides</span>
                  </div>
                </div>

                <button className="w-full bg-[#7670d6] text-white py-3 rounded-lg font-semibold font-sans hover:bg-[#6660c6] transition-colors flex items-center justify-center gap-2 group-hover:gap-4">
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Tips Section */}
      <div className="bg-gradient-to-r from-[#7670d6] to-[#9da0dc] py-16 mb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-mono font-bold text-white mb-4">
              Quick <span className="text-yellow-300">Career Tips</span>
            </h2>
            <p className="text-lg text-white/90 font-sans">
              Bite-sized advice you can implement today
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickTips.map((tip, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all"
              >
                <div className="flex items-start gap-4">
                  <Star className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-1" />
                  <p className="text-white font-sans leading-relaxed">
                    {tip}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expert Insights */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-mono font-bold text-gray-900 mb-4">
            Expert <span className="text-yellow-500">Insights</span>
          </h2>
          <p className="text-lg text-gray-600 font-sans">
            Learn from industry leaders and career professionals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {expertInsights.map((insight, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-[#7670d6] hover:shadow-xl transition-shadow"
            >
              <div className="mb-6">
                <svg className="w-10 h-10 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-gray-700 font-sans text-lg mb-6 italic">
                {insight.quote}
              </p>
              <div>
                <p className="text-gray-900 font-semibold font-sans">{insight.author}</p>
                <p className="text-gray-500 text-sm font-sans">{insight.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="bg-gradient-to-r from-[#7670d6] to-[#9da0dc] rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-mono font-bold text-white mb-4">
            Ready to Take Your Career to the <span className="text-yellow-300">Next Level?</span>
          </h2>
          <p className="text-lg text-white/90 font-sans mb-8">
            Join thousands of professionals who have transformed their careers with our guidance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/jobs"
              className="bg-white text-[#7670d6] px-8 py-4 rounded-lg font-bold font-sans hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
            >
              Browse Jobs
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/signup"
              className="bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg font-bold font-sans hover:bg-yellow-400 transition-colors inline-flex items-center justify-center gap-2"
            >
              Create Free Account
              <CheckCircle className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 pt-24 overflow-y-auto"
        onClick={(e)=>{if(e.target===e.currentTarget){
          closeModal()
        }}}
        >
          <div className="bg-white rounded-2xl max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`${selectedCategory.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                  {selectedCategory.icon}
                </div>
                <h2 className="text-3xl font-mono font-bold text-gray-900">
                  {selectedCategory.title}
                </h2>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-8  text-black h-8" />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-lg text-gray-600 font-sans mb-8">
                {selectedCategory.description}
              </p>
              
              <div className="space-y-8">
                {selectedCategory.articles.map((article: Article, index: number) => (
                  <div key={index} className="border-l-4 border-[#7670d6] pl-6 py-2">
                    <h3 className="text-2xl font-mono font-bold text-gray-900 mb-4">
                      {article.title}
                    </h3>
                    <p className="text-gray-700 font-sans leading-relaxed">
                      {article.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}