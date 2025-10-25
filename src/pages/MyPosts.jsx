import React, { useEffect, useState } from 'react'
import dbService from '../appwrite/database'
import { Container, PostCard } from '../components'
import { useSelector } from 'react-redux' // 1. Import useSelector
import { Query } from 'appwrite' // 2. Import Query
import { Link } from 'react-router-dom' // 3. Import Link for a better empty state

function MyPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const userData = useSelector(state => state.auth.userData); // 4. Get user data

    useEffect(() => {
        if (userData) { // 5. Only fetch if user is logged in
            // 6. Fetch posts using a query for the user's ID
            // This will get ALL posts (active and inactive) for this user.
            dbService.getPosts([Query.equal("userId", userData.$id)]).then((response) => {
                if (response) {
                    setPosts(response.documents);
                }
                setLoading(false);
            });
        } else {
            setLoading(false); // 7. Stop loading if there's no user
        }
    }, [userData]); // 8. Re-run if userData changes

    if (loading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <h1 className="text-2xl font-bold dark:text-white">Loading your posts...</h1>
                </Container>
            </div>
        )
    }

    if (posts.length === 0) { // 9. Custom empty state
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <h1 className="text-2xl font-bold dark:text-white">
                        You have not created any posts yet.
                    </h1>
                     <Link to="/add-post" className="text-blue-600 dark:text-blue-400 hover:underline mt-4 inline-block">
                        Create your first post!
                    </Link>
                </Container>
            </div>
        )
    }
    
    return (
        <div className='w-full py-8'>
            <Container>
                <h1 className="text-3xl font-bold mb-6 dark:text-white">Your Posts</h1>
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

export default MyPosts