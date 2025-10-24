import React from 'react'
import { Container } from '../components'
import PostForm from '../components/post-form/PostForm' // Import from subfolder

function AddPost() {
    return (
        <div className='py-8'>
            <Container>
                <h1 className='text-3xl font-bold mb-6 dark:text-white'>Create a New Post</h1>
                <PostForm />
            </Container>
        </div>
    )
}

export default AddPost