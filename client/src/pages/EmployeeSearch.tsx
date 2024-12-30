import React, { useState } from 'react';
import axios from 'axios';
import { searchEmployee } from '~/services/api';

const EmployeeSearch = () => {
    const [skills, setSkills] = useState<string[]>([]);
    const [certificates, setCertificates] = useState<string[]>([]);
    const [education, setEducation] = useState<string>(''); // Change to string
    const [employees, setEmployees] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');

    const autoCompleteSuggestions = ['Javascript', 'Python', 'Java', 'English', 'PHP'];

    const handleSearch = async () => {
        const requestBody = {
            name: searchTerm, // Search term for name
            experience: undefined, // or set to a specific value if applicable
            skills: skills.length > 0 ? skills : undefined,
            certificates: certificates.length > 0 ? certificates : undefined,
            education: education.length > 0 ? education : undefined, // Changed to get string directly
            page: page, // Current page state
        };

        try {
            const data = await searchEmployee(requestBody);
            setEmployees(data.employees); // Assuming the response contains employees
            setTotalPages(data.totalPages); // Update total pages if returned in the response
        } catch (error) {
            console.error('Search failed:', error);
        }
    };

    const handleReset = () => {
        setSkills([]);
        setCertificates([]);
        setEducation('');
        setEmployees([]);
        setPage(1);
        setTotalPages(1);
        setSortBy('name');
        setSortOrder('asc');
        setSearchTerm('');
    };

    const handlePagination = (newPage: number) => {
        setPage(newPage);
        handleSearch();
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-semibold text-center mb-8">Employee Search</h2>

            <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
                <div className="mb-6">
                    <label className="block text-lg font-medium mb-2">Select Skills:</label>
                    <input
                        type="text"
                        list="skillSuggestions"
                        className="w-full border-gray-300 rounded-md p-2"
                        placeholder="Type skill..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onBlur={() => {
                            setSkills([...skills, searchTerm]);
                            setSearchTerm('');
                        }}
                    />
                    <datalist id="skillSuggestions">
                        {autoCompleteSuggestions.map((suggestion) => (
                            <option key={suggestion} value={suggestion} />
                        ))}
                    </datalist>
                    <p className="mt-2 text-sm text-gray-500">Selected Skills: {skills.join(', ')}</p>
                </div>

                <div className="mb-6">
                    <label className="block text-lg font-medium mb-2">Select Certificates:</label>
                    <input
                        type="text"
                        className="w-full border-gray-300 rounded-md p-2"
                        value={certificates.join(', ')} // Join to display all certificates
                        onChange={(e) => setCertificates([e.target.value])}
                        placeholder="Certificate name"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-lg font-medium mb-2">Select Education:</label>
                    <select
                        className="w-full border-gray-300 rounded-md p-2"
                        value={education}
                        onChange={(e) => setEducation(e.target.value)} // Set a single string
                    >
                        <option value="">Select Education</option>
                        <option value="High school">High school</option>
                        <option value="College">College</option>
                        <option value="Bachelor">Bachelor</option>
                        <option value="Postgraduate">Postgraduate</option>
                    </select>
                </div>

                <div className="flex space-x-4 mb-6">
                    <div className="w-1/2">
                        <label className="block text-lg font-medium mb-2">Sort by:</label>
                        <select
                            className="w-full border-gray-300 rounded-md p-2"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="name">Name</option>
                            <option value="experience">Experience</option>
                        </select>
                    </div>
                    <div className="w-1/2">
                        <label className="block text-lg font-medium mb-2">Order:</label>
                        <select
                            className="w-full border-gray-300 rounded-md p-2"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>
                </div>

                <div className="flex space-x-4">
                    <button
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                    <button
                        className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                        onClick={handleReset}
                    >
                        Reset Search
                    </button>
                </div>
            </div>

            <div className="mt-10">
                <h3 className="text-2xl font-semibold mb-4">Search Results</h3>
                {employees.length > 0 ? (
                    <div className="space-y-4">
                        {employees.map((employee) => (
                            <div key={employee._id} className="bg-white p-4 rounded-lg shadow-md">
                                <h4 className="text-xl font-semibold">{employee.name}</h4>
                                <p>
                                    <strong>Experience:</strong>  {employee.experience != null && employee.experience > 0 
                                        ? `${employee.experience} years` 
                                        : 'N/A'}
                                </p>
                                <p>
                                    <strong>Technical Skills:</strong> 
                                    {employee.skill?.technical.join(', ') || 'N/A'}
                                </p>
                                <p>
                                    <strong>Soft Skills:</strong> 
                                    {employee.skill?.soft.join(', ') || 'N/A'}
                                </p>
                                <p>
                                    <strong>Certificates:</strong> 
                                    {employee.certificates?.map((cert) => cert.name).join(', ') || 'N/A'}
                                </p>
                                <p>
                                    <strong>Education:</strong> 
                                    {employee.education?.map((edu) => edu.degree).join(', ') || 'N/A'}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-lg text-gray-500">No employees found</p>
                )}
            </div>

            <div className="flex justify-between items-center mt-8">
                <button
                    className={`py-2 px-4 rounded-md ${page === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'} `}
                    disabled={page === 1}
                    onClick={() => handlePagination(page - 1)}
                >
                    Previous
                </button>
                <span>Page {page} of {totalPages}</span>
                <button
                    className={`py-2 px-4 rounded-md ${page === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'} `}
                    disabled={page === totalPages}
                    onClick={() => handlePagination(page + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default EmployeeSearch;
