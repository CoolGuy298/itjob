import { updateJobApplicationStatus } from '~/services/companyApi'
import { Button } from './ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from './ui/dialog'
import { useNavigate } from 'react-router-dom'
import { downloadCV } from '~/services/companyApi'
// import { useState } from 'react';
import { Dropdown } from 'antd'

interface JobApplicationCardProps {
    _id: string
    employeeId: {
        _id: string
        email: string
        phoneNumber: string
        name: string
    }
    jobId: {
        _id: string
        title: string
        categories: string[]
        level: string
        requriedSkills: string[]
        maxPositions: number
        yearsOfExp: string
        description: string
        workingTime: string
        offerSalary: string
        startTime: Date
        endDate: Date
        company: string
        phases: string[]
    }
    applicationDate: Date
    cv: {
        data: string
        contentType: string
    }
    status: string
}

const JobApplicationCard = (props: JobApplicationCardProps) => {
    const navigate = useNavigate()
    const token = localStorage.getItem('employerToken')!
    // const [newPhase, setNewPhase] = useState(''); 

    const handleAccept = async () => {
        const res = await updateJobApplicationStatus({ status: 'Accepted' }, props._id, token)
        if (res?.status === 200) {
            navigate('/employer/jobApplications')
            window.location.reload()
        } else {
            console.log(res)
        }
    }

    const handleReject = async () => {
        const res = await updateJobApplicationStatus({ status: 'Rejected' }, props._id, token)
        if (res?.status === 200) {
            navigate('/employer/jobApplications')
            window.location.reload()
        } else {
            console.log(res)
        }
    }

    const handleInterviewScheduled = async () => {
        const res = await updateJobApplicationStatus({ status: 'Interview Scheduled' }, props._id, token)
        if (res?.status === 200) {
            navigate('/employer/jobApplications')
            window.location.reload()
        } else {
            console.log(res)
        }
    }

    const handleNewPhase = async (newPhase: string) => {
        const res = await updateJobApplicationStatus({ status: newPhase }, props._id, token)
        if (res?.status === 200) {
            navigate('/employer/jobApplications')
            window.location.reload()
        } else {
            console.log(res)
        }
    }

    

    return (
        <div className='p-4 w-full min-w-max flex justify-between items-start bg-white rounded-md shadow-sm'>
            <div>
                <div
                    className='text-2xl font-semibold cursor-pointer hover:text-red-500'
                    onClick={() => navigate(`applicant/${props.employeeId._id}`)}
                >
                    {props.employeeId?.name}
                </div>
                <h1 className='text-md'>{props.jobId?.title}</h1>
                <h1 className='text-md'>Status: {props.status}</h1>
                <h1 className='text-md'>Application Date: {new Date(props.applicationDate).toUTCString()}</h1>
                <div className='my-4 w-full min-h-64 overflow-hidden'>
                    <span>CV: </span>
                    <a className='cursor-pointer hover:text-blue-500 underline' onClick={() => downloadCV(props._id,token)}>
                        Click Here
                    </a>

                 <div className='mt-4'>
                    <Dropdown
                        trigger={['click']}
                        overlay={
                            <div className="bg-white border rounded shadow">
                                {props.jobId.phases.map((phase) => (
                                    <div
                                        key={phase}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleNewPhase(phase)}
                                    >
                                        {phase}
                                    </div>
                                ))}
                            </div>
                        }
                    >
                        <button className="p-2 border rounded">Select Phase</button>
                    </Dropdown>
                </div>
                </div>
             
            </div>

            {/* Handling dialog buttons for Pending or Interview Scheduled statuses */}
            {!(props.status === 'Accepted' || props.status === 'Rejected') && (
    <div className='grid grid-cols-3 gap-2'>
        {/* Accept Dialog */}
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='secondary'>Accept</Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-md'>
                <DialogHeader>
                    <DialogTitle>Accept this job application?</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to accept this job application? You cannot change your
                        decision once accepted.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className='sm:justify-center px-10'>
                    <Button onClick={handleAccept}>Confirm</Button>
                    <DialogClose asChild>
                        <Button type='button' variant='secondary'>
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        {/* Reject Dialog */}
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='destructive'>Reject</Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-md'>
                <DialogHeader>
                    <DialogTitle>Reject this job application?</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to reject this job application? You cannot change your
                        decision once rejected.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className='sm:justify-center px-10'>
                    <Button onClick={handleReject}>Confirm</Button>
                    <DialogClose asChild>
                        <Button type='button' variant='secondary'>
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        {/* Interview Scheduled Dialog */}
        {props.status === 'Pending' && (
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant='green'>Schedule Interview</Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-md'>
                    <DialogHeader>
                        <DialogTitle>Schedule an Interview for this application?</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to schedule an interview for this application?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className='sm:justify-center px-10'>
                        <Button onClick={handleInterviewScheduled}>Confirm</Button>
                        <DialogClose asChild>
                            <Button type='button' variant='secondary'>
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )}
    </div>
)}

            

            {/* New Phase Dialog (Only shown if status is not Accepted or Rejected) */}
            {/* {!(props.status === 'Accepted' || props.status === 'Rejected' || props.status === 'Pending') && (
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant='green'>New Phase</Button>
                    </DialogTrigger>
                    <DialogContent className='sm:max-w-md'>
                        <DialogHeader>
                            <DialogTitle>Enter New Phase</DialogTitle>
                            <DialogDescription>
                                Please write the new phase you want to move to and confirm.
                            </DialogDescription>
                        </DialogHeader>
                        <div className='p-4'>
                            <input
                                type='text'
                                placeholder='New Phase'
                                className='border rounded-md w-full p-2'
                                value={newPhase}  // Bind input value to the state
                                onChange={(e) => setNewPhase(e.target.value)}  // Update state on input change
                            />
                        </div>
                        <DialogFooter className='sm:justify-center px-10'>
                            <Button onClick={() => handleNewPhase(newPhase)}>Confirm</Button>
                            <DialogClose asChild>
                                <Button type='button' variant='secondary'>
                                    Close
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog> */}
            {/* )} */}
        </div>
    )
}

export default JobApplicationCard
