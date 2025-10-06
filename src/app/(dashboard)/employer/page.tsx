import RecentJobs from "./components/RecentJobs";

export default function EmployerDashboardPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
                Dashboard Overview
            </h1>

            {/* Stats cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-[#1f2937] rounded-2xl p-6 shadow text-center">
                    <h2 className="text-lg font-medium">Total Jobs</h2>
                    <p className="text-3xl font-bold text-primary-medium">12</p>
                </div>
                <div className="bg-white dark:bg-[#1f2937] rounded-2xl p-6 shadow text-center text">
                    <h2 className="text-lg font-medium">Total Applicants</h2>
                    <p className="text-3xl font-bold text-primary-medium">45</p>
                </div>
                <div className="bg-white dark:bg-[#1f2937] rounded-2xl p-6 shadow text-center">
                    <h2 className="text-lg font-medium">Jobs Active</h2>
                    <p className="text-3xl font-bold text-primary-medium">8</p>
                </div>
                <div className="bg-white dark:bg-[#1f2937] rounded-2xl p-6 shadow text-center">
                    <h2 className="text-lg font-medium">Jobs Closed</h2>
                    <p className="text-3xl font-bold text-primary-medium">4</p>
                </div>
            </div>
            {/* Recent Jobs */}
            <RecentJobs />
        </div>
    );
}
