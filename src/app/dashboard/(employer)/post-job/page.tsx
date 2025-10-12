"use client";
//import './post.css'
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Briefcase,
    Calendar,
    MapPin,
    Coins,
    GraduationCap,
    Building2,
    Tags,
    ListChecks,
} from "lucide-react";

export default function PostJobPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        jobTitle: "",
        companyName: "",
        companyDescription: "",
        companyGoals: "",
        location: "",
        jobDescription: "",
        jobType: "Full-time",
        workArrangement: "On-site",
        jobStartDate: "",
        salaryFixed: "",
        salaryCurrency: "USD",
        benefits: "",
        keyResponsibilities: "",
        requirements: "",
        otherRequirements: "",
        skills: "",
        educationRequirements: "",
        industry: "",
        tags: "",
        experienceLevel: "Entry",
        experienceYears: "",
        seniorityLevel: "Entry",
        applicationDeadline: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Job Posted:", formData);
        alert("Job posted successfully (mock)!");
        router.push("/dashboard/my-jobs");
    };

    return (
        <section className="p-6 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-primary" /> Post a New Job
            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 dark:text-white rounded-xl p-6 space-y-6"
            >
                {/* Job Info */}
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <label className="label dark:text-white text-gray-800">Job Title</label>
                        <input
                            name="jobTitle"
                            value={formData.jobTitle}
                            onChange={handleChange}
                            placeholder="Data Analyst"
                            className="w-full pl-2 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:border-sky-500 dark:focus:border-sky-400 outline-none transition duration-300 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100"
                            required
                        />
                    </div>
                    <div>
                        <label className="label dark:text-white text-gray-800">Job Type</label>
                        <select
                            name="jobType"
                            value={formData.jobType}
                            onChange={handleChange}
                            className="w-full pl-2 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:border-sky-500 dark:focus:border-sky-400 outline-none transition duration-300 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100"
                        >
                            <option>Full-time</option>
                            <option>Part-time</option>
                            <option>Contract</option>
                            <option>Internship</option>
                        </select>
                    </div>

                    <div>
                        <label className="label dark:text-white text-gray-800">Work Arrangement</label>
                        <select
                            name="workArrangement"
                            value={formData.workArrangement}
                            onChange={handleChange}
                            className="w-full pl-2 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:border-sky-500 dark:focus:border-sky-400 outline-none transition duration-300 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100"
                        >
                            <option>On-site</option>
                            <option>Remote</option>
                            <option>Hybrid</option>
                        </select>
                    </div>
                    <div>
                        <label className="label dark:text-white text-gray-800">Seniority Level</label>
                        <select
                            name="seniorityLevel"
                            value={formData.seniorityLevel}
                            onChange={handleChange}
                            className="w-full pl-2 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:border-sky-500 dark:focus:border-sky-400 outline-none transition duration-300 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100"
                        >
                            <option>Internship</option>
                            <option>Entry</option>
                            <option>Associate</option>
                            <option>Mid-Senior</option>
                            <option>Senior</option>
                            <option>Director</option>
                            <option>Executive</option>
                        </select>
                    </div>
                    

                </div>

                {/* Description fields */}
                <div>
                    <label className="label dark:text-white text-gray-800">Company Name</label>
                    <input
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="InsightPro"
                        className="w-full pl-2 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:border-sky-500 dark:focus:border-sky-400 outline-none transition duration-300 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100"
                        required
                    />
                </div>
                <div>
                    <label className="label dark:text-white text-gray-800">Company Description</label>
                    <textarea
                        name="companyDescription"
                        value={formData.companyDescription}
                        onChange={handleChange}
                        rows={2}
                        className="w-full pl-2 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:border-sky-500 dark:focus:border-sky-400 outline-none transition duration-300 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100"
                    />
                </div>
                <div>
                    <label className="label flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> Location
                    </label>
                    <input
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="London, UK"
                        className="w-full pl-2 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:border-sky-500 dark:focus:border-sky-400 outline-none transition duration-300 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100"
                    />
                </div>

                {/* Job Details */}
                <div className="grid gap-4 md:grid-cols-2">


                    <div>
                        <label className="label flex items-center gap-1">
                            <Calendar className="w-4 h-4" /> Start Date
                        </label>
                        <input
                            type="date"
                            name="jobStartDate"
                            value={formData.jobStartDate}
                            onChange={handleChange}
                            className="w-full pl-2 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:border-sky-500 dark:focus:border-sky-400 outline-none transition duration-300 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100"
                        />
                    </div>

                    <div>
                        <label className="label flex items-center gap-1">
                            <Coins className="w-4 h-4" /> Salary
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="number"
                                name="salaryFixed"
                                value={formData.salaryFixed}
                                onChange={handleChange}
                                placeholder="45000"
                                className="w-full pl-2 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:border-sky-500 dark:focus:border-sky-400 outline-none transition duration-300 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100"
                            />
                            <select
                                name="salaryCurrency"
                                value={formData.salaryCurrency}
                                onChange={handleChange}
                                className="w-full pl-2 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:border-sky-500 dark:focus:border-sky-400 outline-none transition duration-300 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100"
                            >
                                <option value="USD">USD</option>
                                <option value="GBP">GBP</option>
                                <option value="EUR">EUR</option>
                            </select>
                        </div>
                    </div>


                </div>



                {/* Requirements */}
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <label className="label flex items-center gap-1">
                            <GraduationCap className="w-4 h-4" /> Education Requirement
                        </label>
                        <input
                            name="educationRequirements"
                            value={formData.educationRequirements}
                            onChange={handleChange}
                            placeholder="Bachelor"
                            className="w-full pl-2 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:border-sky-500 dark:focus:border-sky-400 outline-none transition duration-300 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100"
                        />
                    </div>

                    <div>
                        <label className="label flex items-center gap-1">
                            <Building2 className="w-4 h-4" /> Industry
                        </label>
                        <input
                            name="industry"
                            value={formData.industry}
                            onChange={handleChange}
                            placeholder="Consulting"
                            className="w-full pl-2 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:border-sky-500 dark:focus:border-sky-400 outline-none transition duration-300 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100"
                        />
                    </div>
                </div>

                {/* Lists */}
                <div>
                    <label className="label flex items-center gap-1">
                        <ListChecks className="w-4 h-4" /> Key Responsibilities
                    </label>
                    <textarea
                        name="keyResponsibilities"
                        value={formData.keyResponsibilities}
                        onChange={handleChange}
                        placeholder="Separate by commas"
                        rows={2}
                        className="w-full pl-2 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:border-sky-500 dark:focus:border-sky-400 outline-none transition duration-300 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100"
                    />
                </div>

                <div>
                    <label className="label dark:text-white text-gray-800">Requirements</label>
                    <textarea
                        name="requirements"
                        value={formData.requirements}
                        onChange={handleChange}
                        placeholder="Separate by commas"
                        rows={2}
                        className="w-full pl-2 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:border-sky-500 dark:focus:border-sky-400 outline-none transition duration-300 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100"
                    />
                </div>

                <div>
                    <label className="label dark:text-white text-gray-800">Skills</label>
                    <input
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        placeholder="SQL, Excel, Power BI"
                        className="w-full pl-2 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:border-sky-500 dark:focus:border-sky-400 outline-none transition duration-300 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100"
                    />
                </div>

                <div>
                    <label className="label dark:text-white text-gray-800">Benefits</label>
                    <input
                        name="benefits"
                        value={formData.benefits}
                        onChange={handleChange}
                        placeholder="Flexible Hours, Learning Budget"
                        className="w-full pl-2 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:border-sky-500 dark:focus:border-sky-400 outline-none transition duration-300 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100"
                    />
                </div>

                <div>
                    <label className="label dark:text-white text-gray-800">Other Requirements</label>
                    <input
                        name="otherRequirements"
                        value={formData.otherRequirements}
                        onChange={handleChange}
                        placeholder="Knowledge of Power BI"
                        className="w-full pl-2 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:border-sky-500 dark:focus:border-sky-400 outline-none transition duration-300 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100"
                    />
                </div>

                <div>
                    <label className="label flex items-center gap-1">
                        <Tags className="w-4 h-4" /> Tags
                    </label>
                    <input
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        placeholder="data, analytics"
                        className="w-full pl-2 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:border-sky-500 dark:focus:border-sky-400 outline-none transition duration-300 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100"
                    />
                </div>

                {/* Experience */}
                {/* Education & Experience */}
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <label className="label dark:text-white text-gray-800">Education Requirement</label>
                        <select
                            name="educationRequirements"
                            value={formData.educationRequirements}
                            onChange={handleChange}
                            className="w-full pl-2 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:border-sky-500 dark:focus:border-sky-400 outline-none transition duration-300 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100"
                        >
                            <option>High School</option>
                            <option>Associate</option>
                            <option>Bachelor</option>
                            <option>Master</option>
                            <option>Doctorate</option>
                            <option>Not Applicable</option>
                        </select>
                    </div>
                    <div>
                        <label className="label dark:text-white text-gray-800">Experience Level</label>
                        <select
                            name="experienceLevel"
                            value={formData.experienceLevel}
                            onChange={handleChange}
                            className="w-full pl-2 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:border-sky-500 dark:focus:border-sky-400 outline-none transition duration-300 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100"
                        >
                            <option>Entry</option>
                            <option>Mid</option>
                            <option>Senior</option>
                            <option>Director</option>
                            <option>Executive</option>
                            <option>Internship</option>
                        </select>
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">


                    <div>
                        <label className="label dark:text-white text-gray-800">Years of Experience</label>
                        <input
                            type="number"
                            name="experienceYears"
                            value={formData.experienceYears}
                            onChange={handleChange}
                            placeholder="1"
                            className="w-full pl-2 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:border-sky-500 dark:focus:border-sky-400 outline-none transition duration-300 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100"
                        />
                    </div>
                    <div>
                        <label className="label dark:text-white text-gray-800">Application Deadline</label>
                        <input
                            type="date"
                            name="applicationDeadline"
                            value={formData.applicationDeadline}
                            onChange={handleChange}
                            className="w-full pl-2 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:border-sky-500 dark:focus:border-sky-400 outline-none transition duration-300 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100"
                        />
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="flex items-center px-4 py-2 bg-primary-dark text-white rounded-lg hover:opacity-90 transition-colors w-full justify-center"
                >
                    Post Job
                </button>
            </form>
        </section>
    );
}



