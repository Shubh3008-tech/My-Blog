import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import dbService from '../appwrite/database';
import { Container, PostCard } from '../components';

function Profile() {
    const userData = useSelector((state) => state.auth.userData);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userData) {
            dbService.getUserPosts(userData.$id).then((response) => {
                if (response) {
                    setPosts(response.documents);
                }
                setLoading(false);
            });
        }
    }, [userData]);

    if (loading) {
        return (
            <Container>
                <h1 className="text-2xl text-center p-8 dark:text-white">Loading profile...</h1>
            </Container>
        );
    }

    return (
        <div className="w-full py-8">
            <Container>
                {/* Profile Info Box */}
                <div className="bg-gray-100 dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg mb-8">
                    <h1 className="text-4xl font-bold text-blue-700 dark:text-blue-400 mb-4">
                        {userData.name}
                    </h1>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
                        <span className="font-semibold">Email:</span> {userData.email}
                    </p>
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                        <span className="font-semibold">Total Posts:</span> {posts.length}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                        Account Created: {new Date(userData.$createdAt).toLocaleDateString()}
                    </p>
                </div>

                {/* User's Posts Section */}
                <h2 className="text-3xl font-bold mb-6 dark:text-white">Your Posts</h2>
                
                {posts.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-400">
                        You have not created any posts yet. 
                        <Link to="/add-post" className="text-blue-600 hover:underline ml-1">Create one?</Link>
                    </p>
                ) : (
                    // We can reuse our PostCard component here!
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                        {posts.map((post) => (
                            <div key={post.$id}>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
}

export default Profile;