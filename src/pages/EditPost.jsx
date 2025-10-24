import React, { useEffect, useState } from 'react'
import { Container } from '../components'
import PostForm from '../components/post-form/PostForm'
import dbService from '../appwrite/database'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            dbService.getPost(slug).then((postData) => {
                if (postData) {
                    setPost(postData);
                } else {
                    navigate('/'); // Post not found
                }
            });
        }
    }, [slug, navigate]);

    return post ? (
        <div className='py-8'>
            <Container>
                <h1 className='text-3xl font-bold mb-6 dark:text-white'>Edit Post</h1>
                <PostForm post={post} />
            </Container>
        </div>
    ) : (
         <div className="w-full py-8 mt-4 text-center">
            <Container>
                <h1 className="text-2xl font-bold dark:text-white">Loading post...</h1>
            </Container>
        </div>
    )
}

export default EditPost