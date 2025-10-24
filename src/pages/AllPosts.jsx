import React, { useEffect, useState } from 'react'
import dbService from '../appwrite/database'
import { Container, PostCard } from '../components'
// import { useSelector } from 'react-redux' // Uncomment to filter by user

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    // const userData = useSelector(state => state.auth.userData); // For filtering

    useEffect(() => {
        // Example of fetching only the user's posts:
        // dbService.getPosts([Query.equal("userId", userData.$id)]).then((response) => {
        
        // Fetching all active posts for now:
        dbService.getPosts([]).then((response) => {
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

export default AllPosts