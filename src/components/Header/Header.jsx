import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ThemeBtn from './ThemeBtn';

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate();

    const navItems = [
        { name: 'Home', slug: '/', active: true },
        { name: 'Login', slug: '/login', active: !authStatus },
        { name: 'Signup', slug: '/signup', active: !authStatus },
        { name: 'All Posts', slug: '/all-posts', active: authStatus },
        { name: 'Add Post', slug: '/add-post', active: authStatus },
    ];

    return (
        <header className='py-4 shadow bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 sticky top-0 z-50'>
            <Container>
                {/* RESPONSIVE LAYOUT:
                  - On mobile (default): flex-col, items-center, with a gap-4
                  - On desktop (md:): flex-row, justify-between
                */}
                <nav className='flex flex-col items-center gap-4 md:flex-row md:justify-between'>
                    
                    {/* Top row on mobile / Left group on desktop 
                      - This contains Logo AND Username
                    */}
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

                    {/* Bottom row on mobile / Right group on desktop
                      - This contains nav links and buttons
                    */}
                    <ul className='flex flex-wrap items-center justify-center gap-x-4 gap-y-2'>
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className='inline-block px-4 py-2 duration-200 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-full'
                                    >
                                        {item.name}
                                    </button>
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