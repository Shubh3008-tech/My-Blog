import React, { useEffect, useState } from 'react'
import dbService from '../appwrite/database'
import { Container, PostCard } from '../components'

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Call with no arguments to use the default query (status == "active")
        dbService.getPosts().then((response) => { 
            if (response) {
                setPosts(response.documents);
            }
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <h1 className="text-2xl font-bold dark:text-white">Loading...</h1>
                </Container>
            </div>
        )
    }

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <h1 className="text-2xl font-bold dark:text-white">
                        No active posts found.
                    </h1>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                    {posts.map((post) => (
                        <div key={post.$id}>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home