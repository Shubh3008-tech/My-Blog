import React, { useEffect, useState } from 'react'
import dbService from '../appwrite/database'
import { Container, PostCard } from '../components'
import { useSelector } from 'react-redux' // 1. Import useSelector
import { Link } from 'react-router-dom' // 2. Import Link for the login prompt

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    // 3. Get the user's login status from Redux
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        // 4. Only fetch posts IF the user is logged in
        if (authStatus) {
            dbService.getPosts().then((response) => { 
                if (response) {
                    setPosts(response.documents);
                }
                setLoading(false);
            });
        } else {
            // 5. If not logged in, don't fetch posts and stop loading
            setPosts([]);
            setLoading(false);
        }
    }, [authStatus]); // Re-run this effect when login status changes

    if (loading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <h1 className="text-2xl font-bold dark:text-white">Loading...</h1>
                </Container>
            </div>
        )
    }

    // --- NEW LOGIC ---
    // 6. If the user is NOT logged in, show this welcome message
    if (!authStatus) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <h1 className="text-2xl font-bold dark:text-white mb-4">
                        Welcome to Blogit!
                    </h1>
                    <p className="text-lg dark:text-gray-300">
                        Please <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline">log in</Link> or <Link to="/signup" className="text-blue-600 dark:text-blue-400 hover:underline">sign up</Link> to view and create posts.
                    </p>
                </Container>
            </div>
        )
    }
    // --- END OF NEW LOGIC ---


    // 7. If the user IS logged in, but there are no posts
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

    // 8. If the user IS logged in and there ARE posts
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