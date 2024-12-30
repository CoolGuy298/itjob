import React, { useEffect, useState } from 'react';
import { Button, Input, message } from 'antd';
import { getAllEmployee, getAllCompany, deleteEmployee, deleteCompany } from '~/services/adminApi';

const Calendar = () => {
  const [activeTab, setActiveTab] = useState('employees');
  const [employees, setEmployees] = useState([]);
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [total, setTotal] = useState(0); // Added to handle pagination properly

  useEffect(() => {
    fetchData();
  }, [activeTab, page]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'employees') {
        const response = await getAllEmployee();
        setEmployees(response.data);
        setTotal(response.data.length); // Adjust based on total count from API
      } else {
        const response = await getAllCompany();
        setEmployers(response.data);
        setTotal(response.data.length); // Adjust based on total count from API
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      message.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      if (activeTab === 'employees') {
        await deleteEmployee(id);
      } else {
        await deleteCompany(id);
      }
      message.success('Deleted successfully');
      fetchData(); // Refresh the data after deletion
    } catch (error) {
      console.error('Error deleting:', error);
      message.error('Error deleting data');
    } finally {
      setLoading(false);
    }
  };

  // Filter data based on the search query
  const filteredData = (activeTab === 'employees' ? employees : employers).filter((item) =>
    (activeTab === 'employees'
        ? item.name?.toLowerCase().includes(search.toLowerCase())
        : item.companyName?.toLowerCase().includes(search.toLowerCase())
    ) ||
    item.email?.toLowerCase().includes(search.toLowerCase())
);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold text-gray-700 mb-6">Employee and Employer Management</h1>

      <div className="mb-6">
        <Button
          type={activeTab === 'employees' ? 'primary' : 'default'}
          onClick={() => {
            setActiveTab('employees');
            setPage(1); // Reset page when switching tabs
          }}
          className={`px-4 py-2 rounded-md ${activeTab === 'employees' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800'} hover:bg-blue-700`}
        >
          Employees
        </Button>
        <Button
          type={activeTab === 'employers' ? 'primary' : 'default'}
          onClick={() => {
            setActiveTab('employers');
            setPage(1); // Reset page when switching tabs
          }}
          className={`ml-4 px-4 py-2 rounded-md ${activeTab === 'employers' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800'} hover:bg-blue-700`}
        >
          Employers
        </Button>
      </div>

      <Input
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: '20px', width: '300px' }}
        className="border rounded-md p-2"
      />

      <table className="min-w-full table-auto bg-gray-100 rounded-lg">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="px-4 py-2 text-left cursor-pointer">Name</th>
            <th className="px-4 py-2 text-left cursor-pointer">Email</th>
            {activeTab === 'employees' && (
              <th className="px-4 py-2 text-left cursor-pointer">Join Date</th>
            )}
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.slice((page - 1) * 10, page * 10).map((item) => (
            <tr key={item._id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{item.name || item.companyName}</td>
              <td className="px-4 py-2">{item.email}</td>
              {activeTab === 'employees' && (
                <td className="px-4 py-2">{new Date(item.joinDate).toLocaleDateString('en-GB')}</td>
              )}
              <td className="px-4 py-2">
                <button
                  onClick={() => handleDelete(item._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between items-center">
        <Button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          Previous
        </Button>
        <span className="text-gray-700">
          Page {page} of {Math.ceil(filteredData.length / 10)}
        </span>
        <Button
          onClick={() => setPage(page + 1)}
          disabled={page * 10 >= filteredData.length}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Calendar;
