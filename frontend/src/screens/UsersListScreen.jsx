import { useNavigate } from 'react-router-dom';
import { useGetAllUsersQuery } from '../slices/userApiSlice';
import Loader from '../components/Loader';
import { useEffect } from 'react';

const UsersListScreen = () => {
    const { data: users, isLoading, refetch } = useGetAllUsersQuery();

    const navigate = useNavigate();

    useEffect(() => {
        refetch();
    }, [refetch]);

    return (
        <div className='p-6 bg-gray-50 min-h-screen'>
            <div className='flex flex-row justify-between'>
                <div className='text-3xl font-semibold text-gray-800 mb-6'>
                    Users List
                </div>
                <div className='space-x-2'>
                    <button
                        className={`py-2 w-24 text-gray-800 bg-gray-300 hover:bg-gray-400 font-bold px-4 rounded`}
                        onClick={() => navigate('/admin')}
                    >
                        Go Back
                    </button>
                    <button
                        className={`py-2 w-32 text-white bg-indigo-600 hover:bg-indigo-700 font-bold px-4 rounded`}
                        onClick={() => navigate('/admin/users/create')}
                    >
                        Create User
                    </button>
                </div>
            </div>
            <div className='flex flex-col space-y-2'>
                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        {users.map((user) => (
                            <div
                                key={user._id}
                                className='bg-white shadow-sm border border-gray-200 rounded-lg p-4 hover:cursor-pointer transition-transform duration-150 hover:scale-[1.02]'
                                onClick={() =>
                                    navigate(`/admin/users/${user._id}`)
                                }
                            >
                                <div className='flex flex-row justify-between'>
                                    <p className='text-lg text-gray-900 font-medium'>
                                        {user.name} | {user.email}
                                    </p>
                                    {user.isAdmin && (
                                        <span className='text-red-600'>
                                            {'('}Admin{')'}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default UsersListScreen;
