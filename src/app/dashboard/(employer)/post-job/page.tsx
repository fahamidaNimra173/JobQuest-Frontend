"use client";

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
import axios from "axios";

interface FormData {
    jobTitle: string;
    companyName: string;
    companyDescription: string;
    companyGoals: string;
    location: string;
    jobType: string;
    workArrangement: string;
    jobStartDate: string;
    salaryMin: string;
    salaryMax: string;
    salaryCurrency: string;
    benefits: string;
    keyResponsibilities: string;
    requirements: string;
    otherRequirements: string;
    skills: string;
    educationRequirements: string;
    experienceLevel: string;
    experienceYears: string;
    seniorityLevel: string;
    applicationDeadline: string;
    tags: string;
}

export default function PostJobPage() {
    const router = useRouter();

    const [formData, setFormData] = useState<FormData>({
        jobTitle: "",
        companyName: "",
        companyDescription: "",
        companyGoals: "",
        location: "",
        jobType: "Full-time",
        workArrangement: "On-site",
        jobStartDate: "",
        salaryMin: "",
        salaryMax: "",
        salaryCurrency: "USD",
        benefits: "",
        keyResponsibilities: "",
        requirements: "",
        otherRequirements: "",
        skills: "",
        educationRequirements: "",
        experienceLevel: "Entry",
        experienceYears: "",
        seniorityLevel: "Entry",
        applicationDeadline: "",
        tags: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "https://job-portal-backend-xshy.onrender.com/api/jobs",
                formData,
                { withCredentials: true }
            );

            alert("Job posted successfully!");
            router.push("/dashboard/my-jobs");
        } catch (err: any) {
            console.error("Error posting job:", err.response?.data || err.message);
            alert("Failed to post job. Please try again.");
        }
    };

    return (
        <section className="p-6 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <Briefcase className="w-6 h-6 text-primary" /> Post a New Job
            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 rounded-xl p-6 space-y-6"
            >
                {/* Job Info */}
                <div className="grid gap-4 md:grid-cols-2">
                    <InputField
                        label="Job Title"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        placeholder="Frontend Developer"
                        required
                    />
                    <SelectField
                        label="Job Type"
                        name="jobType"
                        value={formData.jobType}
                        onChange={handleChange}
                        options={["Full-time", "Part-time", "Contract", "Internship"]}
                    />
                    <SelectField
                        label="Work Arrangement"
                        name="workArrangement"
                        value={formData.workArrangement}
                        onChange={handleChange}
                        options={["On-site", "Remote", "Hybrid"]}
                    />
                    <SelectField
                        label="Seniority Level"
                        name="seniorityLevel"
                        value={formData.seniorityLevel}
                        onChange={handleChange}
                        options={[
                            "Internship",
                            "Entry",
                            "Associate",
                            "Mid-Senior",
                            "Senior",
                            "Director",
                            "Executive",
                        ]}
                    />
                </div>

                {/* Company Info */}
                <InputField
                    label="Company Name"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="TechNova Innovations Ltd."
                    required
                />
                <TextareaField
                    label="Company Description"
                    name="companyDescription"
                    value={formData.companyDescription}
                    onChange={handleChange}
                    placeholder="Describe your company in at least 200 words"
                    rows={5}
                />
                <TextareaField
                    label="Company Goals"
                    name="companyGoals"
                    value={formData.companyGoals}
                    onChange={handleChange}
                    placeholder="Describe your company goals (at least 100 words)"
                    rows={3}
                />

                {/* Job Details */}
                <InputField
                    labelIcon={<MapPin className="w-4 h-4" />}
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Dhaka, Bangladesh"
                />
                <div className="grid gap-4 md:grid-cols-2">
                    <InputField
                        labelIcon={<Calendar className="w-4 h-4" />}
                        label="Start Date"
                        type="date"
                        name="jobStartDate"
                        value={formData.jobStartDate}
                        onChange={handleChange}
                    />
                    <div>
                        <label className="label flex items-center gap-1">
                            <Coins className="w-4 h-4" /> Salary (Min - Max)
                        </label>
                        <div className="flex flex-wrap gap-2">
                            <input
                                type="number"
                                name="salaryMin"
                                value={formData.salaryMin}
                                onChange={handleChange}
                                placeholder="70000"
                                className="input"
                            />
                            <input
                                type="number"
                                name="salaryMax"
                                value={formData.salaryMax}
                                onChange={handleChange}
                                placeholder="90000"
                                className="input"
                            />
                            <select
                                name="salaryCurrency"
                                value={formData.salaryCurrency}
                                onChange={handleChange}
                                className="input"
                            >
                                <option>BDT</option>
                                <option>USD</option>
                                <option>EUR</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Requirements & Skills */}
                <TextareaField
                    labelIcon={<ListChecks className="w-4 h-4" />}
                    label="Key Responsibilities"
                    name="keyResponsibilities"
                    value={formData.keyResponsibilities}
                    onChange={handleChange}
                    placeholder="Separate by commas"
                    rows={3}
                />
                <TextareaField
                    label="Requirements"
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    placeholder="Separate by commas"
                    rows={3}
                />
                <InputField
                    label="Other Requirements"
                    name="otherRequirements"
                    value={formData.otherRequirements}
                    onChange={handleChange}
                    placeholder="Knowledge of Next.js or TypeScript"
                />
                <InputField
                    label="Skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="React.js, JavaScript, Redux"
                />
                <InputField
                    label="Benefits"
                    name="benefits"
                    value={formData.benefits}
                    onChange={handleChange}
                    placeholder="Health Insurance, Paid Leave, Bonus"
                />

                {/* Education & Experience */}
                <div className="grid gap-4 md:grid-cols-2">
                    <SelectField
                        label="Education Requirement"
                        name="educationRequirements"
                        value={formData.educationRequirements}
                        onChange={handleChange}
                        options={["High School", "Associate", "Bachelor", "Master", "Doctorate", "Not Applicable"]}
                    />
                    <SelectField
                        label="Experience Level"
                        name="experienceLevel"
                        value={formData.experienceLevel}
                        onChange={handleChange}
                        options={["Entry", "Mid", "Senior", "Director", "Executive", "Internship"]}
                    />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <InputField
                        label="Years of Experience"
                        type="number"
                        name="experienceYears"
                        value={formData.experienceYears}
                        onChange={handleChange}
                        placeholder="2"
                    />
                    <InputField
                        label="Application Deadline"
                        type="date"
                        name="applicationDeadline"
                        value={formData.applicationDeadline}
                        onChange={handleChange}
                    />
                </div>

                {/* Tags */}
                <InputField
                    labelIcon={<Tags className="w-4 h-4" />}
                    label="Tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="frontend, react, hybrid"
                />

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

/* Reusable components */
const InputField = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    type = "text",
    labelIcon,
    required = false,
}: any) => (
    <div>
        <label className="label flex items-center gap-1 text-gray-800 dark:text-white">
            {labelIcon} {label}
        </label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="input w-full"
            required={required}
        />
    </div>
);

const TextareaField = ({ label, name, value, onChange, placeholder, rows = 3, labelIcon }: any) => (
    <div>
        <label className="label flex items-center gap-1 text-gray-800 dark:text-white">
            {labelIcon} {label}
        </label>
        <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            className="input w-full"
        />
    </div>
);

const SelectField = ({ label, name, value, onChange, options }: any) => (
    <div>
        <label className="label text-gray-800 dark:text-white">{label}</label>
        <select name={name} value={value} onChange={onChange} className="input w-full">
            {options.map((opt: string) => (
                <option key={opt} value={opt}>
                    {opt}
                </option>
            ))}
        </select>
    </div>
);



