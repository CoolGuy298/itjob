import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import background from '/employer-home.png'



const CompanyHome = () => {
    const navigate = useNavigate();

    return (
        <div className='w-full relative mx-auto items-center justify-center'>
            <div className='bg-blue-50'>
                <div className='h-32 w-full'></div>
                <div className='z-10 w-3/4 h-100 mx-auto'>
                    <img
                        src={background}
                        alt='background'
                        className='w-full h-full object-fit object-center brightness-105'
                    />
                </div>
            </div>
            <div className='absolute relative -top-16 flex flex-col w-1/2 px-4 py-3 h-full bg-white items-center justify-center rounded-3xl mx-auto'>
                <div className='flex text-3xl font-black text-blue-800 pt-3'>Start your own recuiter website now</div>
                <div className='flex pt-2 mb-6'>
                    <Link to='/employer/jobs'>
                        <button className='bg-[#ff7900] hover:bg-[#ff9f00] font-semibold text-white text-lg px-6 py-2 rounded-full mt-4 mr-8'>
                            Jobs
                        </button>
                    </Link>
                    <Link to='/employer/jobApplications'>
                        <button className='bg-[#ff7900] hover:bg-[#ff9f00] font-semibold text-white text-lg px-6 py-2 rounded-full mt-4 mr-8'>
                            Job Applications
                        </button>
                    </Link>
                  
                </div>
            </div>
        </div>
    )

}
export default CompanyHome