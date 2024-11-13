import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLogoutUserMutation } from '../slices/userApiSlice';
import { logout } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { FaBook } from "react-icons/fa6";

function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const [logoutUser] = useLogoutUserMutation();

    const handleLogout = async () => {
        try {
            const res = await logoutUser().unwrap();
            dispatch(logout());
            toast.success("You've been logged out!");
        } catch (error) {
            console.error('Failed to logout:', error);
        }
    };

    return (
        <nav className='bg-mainBluishWhite/70 backdrop-blur-lg rounded-br-xl drop-shadow-lg'>
            <div className='w-full px-3'>
                <div className='relative flex items-center justify-between h-16'>
                    <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type='button'
                            className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                            aria-controls='mobile-menu'
                            aria-expanded={isOpen}
                        >
                            <span className='sr-only'>Open main menu</span>
                            {!isOpen ? (
                                <svg
                                    className='block h-6 w-6'
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                    aria-hidden='true'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M4 6h16M4 12h16M4 18h16'
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className='block h-6 w-6'
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                    aria-hidden='true'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M6 18L18 6M6 6l12 12'
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                    <div className='flex-1 flex justify-center sm:justify-between'>
                        <div className='flex-shrink-0 flex items-center space-x-2'>
                            <FaBook size={25} className='mt-1' />
                            <Link
                                to='/'
                                className='text-gray-900 tracking-wide rounded-md text-xl'
                            >
                                Studies in Abundant Living
                            </Link>
                        </div>
                        <div className='hidden sm:block sm:ml-6'>
                            <div className='flex flex-row justify-end space-x-5 pr-2'>
                                <Link
                                    to='/'
                                    className='text-gray-900 py-2 rounded-md text-md font-medium hover:underline underline-offset-[10px]'
                                >
                                    Dashboard
                                </Link>
                                {userInfo ? (
                                    <>
                                        <Link
                                            to='/profile'
                                            className='text-gray-900 py-2 rounded-md text-md font-medium hover:underline underline-offset-[10px]'
                                        >
                                            Hi, {userInfo.name}
                                        </Link>
                                        {userInfo.isAdmin && (
                                            <Link
                                                to='/admin'
                                                className='text-gray-900 py-2 rounded-md text-md font-medium hover:underline underline-offset-[10px]'
                                            >
                                                Admin
                                            </Link>
                                        )}
                                        <p
                                            onClick={handleLogout}
                                            className='text-gray-900 py-2 rounded-md text-md font-medium cursor-pointer hover:underline underline-offset-[10px]'
                                        >
                                            Logout
                                        </p>
                                    </>
                                ) : (
                                    <Link
                                        to='/login'
                                        className='text-gray-900 px-3 py-2 rounded-md text-sm font-medium'
                                    >
                                        Login
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu, show/hide based on menu state */}
            {isOpen && (
                <div className='sm:hidden' id='mobile-menu'>
                    <div className='px-2 pt-2 pb-3 space-y-1'>
                        <a
                            href='#'
                            className='text-gray-900 block px-3 py-2 rounded-md text-base font-medium'
                        >
                            Dashboard
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Header;
