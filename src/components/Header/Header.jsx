import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
// 1. Import NavLink instead of just Link
import { Link, NavLink, useNavigate } from 'react-router-dom' 
import { useSelector } from 'react-redux'
import ThemeBtn from './ThemeBtn';

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate(); // Still needed for LogoutBtn etc.

    const navItems = [
        { name: 'Home', slug: '/', active: true },
        { name: 'Login', slug: '/login', active: !authStatus },
        { name: 'Signup', slug: '/signup', active: !authStatus },
        { name: 'My Posts', slug: '/my-posts', active: authStatus },
        { name: 'Add Post', slug: '/add-post', active: authStatus },
    ];

    return (
        <header className='py-4 shadow bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 sticky top-0 z-50'>
            <Container>
                <nav className='flex flex-col items-center gap-4 md:flex-row md:justify-between'>
                    
                    <div className='flex flex-col items-center gap-3 md:flex-row md:gap-4'>
                        <div className='flex-shrink-0'>
                            <Link to='/'>
                                <Logo width='100px' />
                            </Link>
                        </div>
                        {authStatus && userData && (
                            <div>
                                <Link 
                                    to="/profile" 
                                    className='text-xl font-bold text-blue-700 dark:text-blue-400 hover:opacity-80 transition-opacity text-center block'
                                    title="View Profile"
                                >
                                    {userData.name}
                                </Link>
                            </div>
                        )}
                    </div>

                    <ul className='flex flex-wrap items-center justify-center gap-x-4 gap-y-2'>
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    {/* 2. Replace <button> with <NavLink> */}
                                    <NavLink
                                        to={item.slug}
                                        // 3. Define styles for active/inactive links
                                        className={({ isActive }) => `
                                            inline-block px-4 py-2 rounded-full duration-200
                                            ${isActive 
                                                ? "bg-blue-100 dark:bg-gray-700 text-blue-700 dark:text-white font-semibold" 
                                                : "hover:bg-blue-100 dark:hover:bg-gray-700"
                                            }
                                        `}
                                    >
                                        {item.name}
                                    </NavLink>
                                </li>
                            ) : null
                        )}

                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                        <li className='ml-2'>
                            <ThemeBtn />
                        </li>
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header