import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    return (
        <div 
            onClick={() => navigate(`/description/${job._id}`)} 
            className='p-5 rounded-md shadow-lg bg-white border border-gray-200 cursor-pointer max-w-sm mx-auto transition-transform transform hover:scale-105'
            style={{ minWidth: '280px', maxWidth: '100%', overflow: 'hidden' }}
        >
            <div className='mb-2'>
                <h1 className='font-medium text-lg truncate'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500'>India</p>
            </div>
            <div className='mb-3'>
                <h1 className='font-bold text-xl my-2 truncate'>{job?.title}</h1>
                <p className='text-sm text-gray-600 line-clamp-2 overflow-hidden'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4 flex-wrap'>
                <Badge className='text-blue-700 font-bold' variant="ghost">
                    {job?.position} Positions
                </Badge>
                <Badge className='text-[#F83002] font-bold' variant="ghost">
                    {job?.jobType}
                </Badge>
                <Badge className='text-[#7209b7] font-bold' variant="ghost">
                    {job?.salary} LPA
                </Badge>
            </div>
        </div>
    )
}

export default LatestJobCards;
