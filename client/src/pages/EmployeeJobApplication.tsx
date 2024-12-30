import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '~/components/ui/button';
import { deleteJobApplication, searchJobApplicationsByEmployeeId, downloadCV } from '~/services/api';
import { RootState } from '~/store';
// import { useNavigate } from 'react-router-dom';
// import { searchJobs } from '~/services/api';
type JobApplication = {
  _id: string;
  employeeId: string;
  jobId: {
    _id: string;
    title: string;
    categories: string[];
    level: string;
    requiredSkills: string[];
    maxPositions: number;
    yearsOfExperience: number;
    description: string;
    workingTime: string;
    offerSalary: number;
    startDate: string;
    endDate: string;
    companyID: string;
  } | null;
  cv: {
    data: string;
    contentType: string;
  };
  status: string;
  applicationDate: string;
};

const EmployeeJobApplication = () => {
  const employee = useSelector((state: RootState) => state.employeeAuth.employee);
  // const navigate = useNavigate();
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  // const [pageSize] = useState(5); // Set your desired page size
  const [totalPages, setTotalPages] = useState(0);
  // const [searchTitle, setSearchTitle] = useState('')
  const token = useSelector((state: RootState) => state.employeeAuth.employeeToken)
   
  
 

  useEffect(() => {
  
    const fetchJobApplications = async () => {
      if (!token || !employee?._id) {
        setLoading(false);
        return <div>Loading...</div>;;
      }

      setLoading(true);
      console.log(token)
   

      try {
    
        const res = await searchJobApplicationsByEmployeeId(
          { page },
          employee._id,
          token
        );
        setJobApplications(res?.data?.jobApplications || []);
        setTotalPages(res?.data?.totalPages || 0);
      } catch (error) {
        console.error('Error fetching job applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobApplications();
  }, [employee, token, page]);

  const handleDelete = async (id: string) => {
    try {
      await deleteJobApplication(id);
      // Refetch applications after delete
      setJobApplications((prev) => prev.filter((app) => app._id !== id));
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  if (!employee) return null;

  if (loading) {

    return <div>Loading...</div>;
  }

  if (jobApplications.length === 0) {
    return (
      <div className="my-8 mx-auto p-8 w-2/3 bg-white rounded-lg min-w-max">
        <div className="mb-4 text-2xl font-bold">You have not applied for any jobs yet</div>
        <Link to="/">
          <span className="text-sm underline">Search for jobs here</span>
        </Link>
      </div>
    );
  }


  return (
    <div className="my-8 mx-auto p-8 w-2/3 bg-white rounded-lg min-w-max">
      <h1 className="text-3xl font-bold">Your Job Applications</h1>

      <div className="my-8 grid grid-cols-[1fr] gap-4">
        {jobApplications.map((jobApplication) => (
          <div key={jobApplication._id} className="p-4 hover:bg-gray-50 rounded-lg flex gap-4">
            <div className="grow min-h-max">
              <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold"  onClick={() =>{
    if (jobApplication.jobId) {
      console.log(jobApplication.jobId._id); // Log job ID to the console
      // Navigate to the job page
    
      
    } } }>
    {jobApplication.jobId ? jobApplication.jobId.title : 'Job title not available'}
</h1>
                {jobApplication.status === 'Pending' && (
                  <Button variant="destructive" onClick={() => handleDelete(jobApplication._id)}>
                    Cancel
                  </Button>
                )}
              </div>
              <p>
                <span className="font-semibold mr-4">Status: </span>
                <span
                  className={`${
                    jobApplication.status === 'Accepted'
                      ? 'text-red-500'
                      : jobApplication.status === 'Rejected'
                      ? 'text-lime-600'
                      : ''
                  }`}
                >
                  {jobApplication.status}
                </span>
              </p>
              <p>
                <span className="font-semibold mr-4">Application Date: </span>
                {jobApplication.applicationDate.slice(0, 10)}
              </p>
              <p>
                <span className="font-semibold mr-4">Maximum positions: </span>
                {jobApplication.jobId ? jobApplication.jobId.maxPositions : 'N/A'}
              </p>
              <p>
                <span className="font-semibold mr-4">Start Date: </span>
                {jobApplication.jobId ? jobApplication.jobId.startDate.slice(0, 10) : 'N/A'}
              </p>
              <p>
                <span className="font-semibold mr-4">End Date: </span>
                {jobApplication.jobId ? jobApplication.jobId.endDate.slice(0, 10) : 'N/A'}
              </p>
              <span className="font-semibold mr-4">CV: </span>
              <a
                className="cursor-pointer hover:text-blue-500 underline"
                onClick={() => 
                  
                  downloadCV(jobApplication._id,token)
                }
              >
                Download your CV here
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <Button disabled={page === 0} onClick={() => handlePageChange(page - 1)}>
          Previous
        </Button>
        <span>
          Page {page + 1} of {totalPages}
        </span>
        <Button disabled={page + 1 === totalPages} onClick={() => handlePageChange(page + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default EmployeeJobApplication;
