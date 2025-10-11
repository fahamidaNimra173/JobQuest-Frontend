'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "How do I create an account?",
      answer: "Creating an account is simple! Click on the 'Sign Up' button in the top right corner, fill in your details, and verify your email address. You'll be ready to start applying for jobs in minutes."
    },
    {
      question: "How can I apply for a job?",
      answer: "Browse through our job listings, click on any job that interests you, and hit the 'Apply Now' button. Make sure your profile is complete and upload your resume to increase your chances of getting hired."
    },
    {
      question: "Is the platform free to use?",
      answer: "Yes! Our platform is completely free for job seekers. You can browse jobs, apply to positions, and manage your applications at no cost."
    },
    {
      question: "Can I save jobs to apply later?",
      answer: "Absolutely! Click the bookmark icon on any job listing to save it to your favorites. You can access your saved jobs anytime from your dashboard."
    },
    {
      question: "How do I get notified about new jobs?",
      answer: "Enable job alerts in your profile settings. You'll receive email notifications when new jobs matching your preferences are posted."
    },
    {
      question: "What should I include in my profile?",
      answer: "Include your work experience, education, skills, and a professional summary. Adding a profile photo and portfolio links can also help you stand out to employers."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="  py-16 px-4 lg:px-[120px]
    bg-primary-dark   
    backdrop-blur-lg     
    shadow-[inset_0_4px_6px_rgba(0,0,0,0.3)]  
      ">
      <div className=" lg:px-[40px]">
        {/* Section Header */}
        <div className="text-center font-mono mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Frequently Asked <span className='text-yellow-500  text-shadow-2xs shadow-black'>Questions</span>
          </h2>
          <p className="text-lg text-gray-100 max-w-2xl mx-auto">
            Got questions? We have got answers. Find everything you need to know about our platform.
          </p>
        </div>

        {/* FAQ Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="order-2 lg:order-1">
            <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/investigation-9604083_1280.png"
                alt="FAQ Illustration"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* FAQ Side */}
          <div className="order-1 lg:order-2 space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-primary-lightest rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <span className="flex-shrink-0 text-[#7670d6]">
                    {openIndex === index ? (
                      <ChevronUp size={24} />
                    ) : (
                      <ChevronDown size={24} />
                    )}
                  </span>
                </button>
                
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    openIndex === index
                      ? 'max-h-96 opacity-100'
                      : 'max-h-0 opacity-0'
                  } overflow-hidden`}
                >
                  <div className="px-5 pb-5 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Still Have Questions CTA */}

      </div>
    </section>
  );
}