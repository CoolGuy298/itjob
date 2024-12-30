import React, { useState, useEffect } from 'react';
import { getAllJob, updateJobVisibility, getAvailableJob } from '../services/adminApi'; // Import the API functions

const Tables = () => {
    interface JobData {
        _id: string;
        title: string;
        categories: string[];
        workingTime: string;
        location: string;
        yearsOfExp: string;
        description: string;
        startDate: string;
        endDate: string;
        maxPositions: number;
        offerSalary: string;
        requiredSkills: string[];
        companyID: {
            _id: string;
            companyLogo: string;
            companyName: string;
            companyLocations: string[];
        };
        jobApplicationCount: number;
        isVisible: boolean;
    }

    const [jobs, setJobs] = useState<JobData[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortConfig, setSortConfig] = useState<{ key: keyof JobData, direction: 'ascending' | 'descending' }>({
        key: 'title',
        direction: 'ascending'
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Set the number of items per page

    // Fetch jobs when the component mounts
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await getAvailableJob();
                setJobs(response.data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    // Handle visibility toggle
    const handleVisibilityToggle = async (jobId: string, currentVisibility: boolean) => {
        try {
            const newVisibility = !currentVisibility;
            const response = await updateJobVisibility(jobId, newVisibility);
            if (response.status === 200) {
                setJobs((prevJobs) =>
                    prevJobs.map((job) =>
                        job._id === jobId ? { ...job, isVisible: newVisibility } : job
                    )
                );
            }
        } catch (error) {
            console.error('Error toggling job visibility:', error);
        }
    };

    // Sorting function
    const handleSort = (key: keyof JobData) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });

        const sortedJobs = [...jobs].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
            return 0;
        });
        setJobs(sortedJobs);
    };

    // Get the current page's jobs
    const currentJobs = jobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-semibold text-gray-700 mb-6">Job Visibility Management</h1>
            {loading ? (
                <div className="text-center">Loading jobs...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto bg-gray-100 rounded-lg">
                        <thead>
                            <tr className="bg-blue-600 text-white">
                                <th
                                    className="px-4 py-2 text-left cursor-pointer"
                                    onClick={() => handleSort('title')}
                                >
                                    Job Title
                                </th>
                                <th
                                    className="px-4 py-2 text-left cursor-pointer"
                                    onClick={() => handleSort('companyID')}
                                >
                                    Company Name
                                </th>
                                <th
                                    className="px-4 py-2 text-left cursor-pointer"
                                    onClick={() => handleSort('startDate')}
                                >
                                    Start Date
                                </th>
                                <th
                                    className="px-4 py-2 text-left cursor-pointer"
                                    onClick={() => handleSort('endDate')}
                                >
                                    End Date
                                </th>
                                <th
                                    className="px-4 py-2 text-left cursor-pointer"
                                    onClick={() => handleSort('isVisible')}
                                >
                                    Visibility
                                </th>
                                <th className="px-4 py-2 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentJobs.map((job) => (
                                <tr key={job._id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-2">{job.title}</td>
                                    <td className="px-4 py-2">{job.companyID.companyName}</td>
                                    <td className="px-4 py-2">{new Date(job.startDate).toLocaleDateString('en-GB')}</td>
                                    <td className="px-4 py-2">{new Date(job.endDate).toLocaleDateString('en-GB')}</td>
                                    <td className="px-4 py-2">
                                        <span
                                            className={`px-2 py-1 rounded-full ${job.isVisible ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                                        >
                                            {job.isVisible ? 'Visible' : 'Hidden'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => handleVisibilityToggle(job._id, job.isVisible)}
                                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        >
                                            {job.isVisible ? 'Hide' : 'Show'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-300 text-gray-600 rounded-l-md hover:bg-gray-400"
                        >
                            Previous
                        </button>
                        <span className="px-4 py-2 text-lg text-gray-700">
                            Page {currentPage}
                        </span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage * itemsPerPage >= jobs.length}
                            className="px-4 py-2 bg-gray-300 text-gray-600 rounded-r-md hover:bg-gray-400"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tables;
