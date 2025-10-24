import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector(state => state.auth.status);

    useEffect(() => {
        // Check authentication status vs. route requirement
        if (authentication && authStatus !== authentication) {
            // User is not authenticated but route requires it
            navigate("/login");
        } else if (!authentication && authStatus !== authentication) {
            // User is authenticated but route requires not being authenticated (e.g., login page)
            navigate("/");
        }
        setLoader(false);
    }, [authStatus, navigate, authentication]);

    // Show loader while checking
    return loader ? <h1 className='text-center text-2xl p-8 dark:text-white'>Loading...</h1> : <>{children}</>
}