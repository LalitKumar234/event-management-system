import React from 'react'

const ProjectDetails = () => {
    return (
        <div className="bg-white rounded-md p-3 m-4">
            <h3 className="text-xs">Rahul</h3>
            <div className="flex gap-3">
                <p className='text-xs font-medium border-r pr-3'>
                    <span className=' font-thin text-xs'>Project ID: </span>
                    10488
                </p>
                <p className='text-xs font-medium'>
                    <span className='font-thin text-xs'>Service: </span>
                    Decor
                </p>
            </div>
        </div>
    )
}

export default ProjectDetails