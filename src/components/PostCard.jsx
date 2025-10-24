import React from 'react'
import dbService from '../appwrite/database'
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
    
    return (
        <Link to={`/post/${$id}`}>
            {/* We updated this div with new transition and hover classes
            */}
            <div className='
                w-full bg-gray-100 dark:bg-gray-800 rounded-xl p-4 shadow-md 
                transition-all duration-300 ease-in-out
                hover:shadow-xl hover:scale-[1.03] hover:-translate-y-1
            '>
                <div className='w-full justify-center mb-4'>
                    <img 
                        src={dbService.getFileView(featuredImage)} 
                        alt={title}
                        className='rounded-xl w-full h-48 object-cover' 
                    />
                </div>
                <h2 className='text-xl font-bold text-gray-900 dark:text-white truncate'>
                    {title}
                </h2>
            </div>
        </Link>
    )
}

export default PostCard