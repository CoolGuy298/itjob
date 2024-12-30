import { Outlet } from 'react-router-dom'

import bgVideo from '/bg-video.mp4'
import bgImage from '/employee-auth-bg.jpg'

const EmployeeAuth = () => {
    return (
        <div className='h-screen flex justify-center items-center'>
            <div className='absolute left-0 top-0 h-full overflow-hidden'>
                {/* <video className='w-[1920px] h-[1080px] object-cover' autoPlay loop muted>
                    <source src={bgVideo} type='video/mp4' />
                </video> */}
                <img src={bgImage} alt='background' className='w-[1920px] h-[800px] object-cover' />
            </div>
            <div className='z-10 w-full flex justify-center items-center'>
                <div className='w-1/3'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default EmployeeAuth