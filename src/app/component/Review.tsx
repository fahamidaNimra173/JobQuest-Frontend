"use client";

import { useState } from "react";
import { X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export function ReviewSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    review: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.review) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    const currentDate = new Date().toISOString();
    const reviewData = {
      name: formData.name,
      designation: formData.designation,
      review: formData.review,
      date: currentDate,
    };

    console.log("Review data to be sent:", reviewData);

    // Simulate success for now
    setTimeout(() => {
      toast.success("Review submitted successfully! (Backend not connected yet)");
      setFormData({
        name: "",
        designation: "",
        review: "",
      });
      setIsModalOpen(false);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <>
      {/* 🔔 Toast Container */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "var(--primary-light)",
            color: "#0A5EB0",
            fontFamily: "monospace",
            borderRadius: "0.75rem",
          },
          success: {
            iconTheme: {
              primary: "#7670d6",
              secondary: "#fff",
            },
            style: {
              background: "var(--primary-lightest)",
              color: "#0A5EB0",
            },
          },
          error: {
            iconTheme: {
              primary: "#ff6b6b",
              secondary: "#fff",
            },
            style: {
              background: "#FFCFEF",
              color: "#0A5EB0",
            },
          },
        }}
      />

      {/* Main Section */}
      <div className="mx-auto max-w-4xl px-4 py-16">
        <div className="text-center">
          <h2 className="mb-4 font-mono text-4xl font-bold text-primary-dark dark:text-primary-dark">
            Share Your <span className="text-yellow-500">Valuable</span> Thoughts
          </h2>
          <p className="mb-8 text-lg text-primary-dark dark:text-primary-dark">
            We would love to hear about your experience
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-lg bg-yellow-500 px-8 py-3 font-semibold text-white transition-all hover:bg-yellow-700 hover:shadow-lg"
          >
            Give Review
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl rounded-2xl bg-primary-lightest p-8 shadow-2xl dark:bg-primary-lightest">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 rounded-full p-2 text-primary-dark transition-colors hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800"
            >
              <X size={24} />
            </button>

            {/* Modal Content */}
            <h3 className="mb-6 text-3xl font-bold font-mono text-primary-dark dark:text-primary-dark">
              Share Your Review
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium font-mono text-primary-dark dark:text-primary-dark"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 bg-primary-medium px-4 py-3 text-black focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:text-black"
                  placeholder="Enter your name"
                />
              </div>

              {/* Designation Field */}
              <div>
                <label
                  htmlFor="designation"
                  className="mb-2 block text-sm font-medium font-mono text-primary-dark dark:text-primary-dark"
                >
                  Designation
                </label>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 bg-primary-medium px-4 py-3 text-black focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:text-black"
                  placeholder="e.g., Software Engineer"
                />
              </div>

              {/* Review Field */}
              <div>
                <label
                  htmlFor="review"
                  className="mb-2 block text-sm font-medium font-mono text-primary-dark dark:text-primary-dark"
                >
                  Review <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="review"
                  name="review"
                  rows={3}
                  value={formData.review}
                  onChange={handleInputChange}
                  className="w-full resize-none rounded-lg border border-gray-300 bg-primary-medium px-4 py-3 text-black focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:text-black"
                  placeholder="Share your thoughts and experience..."
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 rounded-lg border border-gray-300 bg-yellow-400 px-6 py-3 font-semibold text-white transition-colors hover:bg-yellow-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 rounded-lg bg-primary-dark px-6 py-3 font-semibold text-white transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
