import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    useDeleteUserByIdMutation,
    useGetUserByIdQuery,
    useUpdateUserProfileMutation,
} from '../slices/userApiSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useNavigate, useParams } from 'react-router-dom';

const SingleUserScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { id: userId } = useParams();

    const { data: userInfo, isLoading } = useGetUserByIdQuery(userId);
    const [updateUserById] = useUpdateUserProfileMutation();
    const [deleteUserById] = useDeleteUserByIdMutation();

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    }, [userInfo]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords don't match");
            return;
        } else {
            try {
                const res = await updateUserById({
                    _id: userInfo._id,
                    name,
                    email,
                    password,
                }).unwrap();
                setName(res.name);
                setEmail(res.email);
                setPassword('');
                setConfirmPassword('');
                toast.success('Profile updated successfully');
            } catch (error) {
                toast.error('Failed to update profile');
            }
        }
    };

    return (
        <div className='flex items-center'>
            <div className='w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md'>
                <h2 className='text-2xl font-bold text-center'>Edit User</h2>
                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div>
                        <label
                            htmlFor='name'
                            className='block text-sm font-medium text-gray-700'
                        >
                            Name:
                        </label>
                        <input
                            type='name'
                            id='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='email'
                            className='block text-sm font-medium text-gray-700'
                        >
                            Email:
                        </label>
                        <input
                            type='email'
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='password'
                            className='block text-sm font-medium text-gray-700'
                        >
                            Password:
                        </label>
                        <input
                            type='password'
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='confirmPassword'
                            className='block text-sm font-medium text-gray-700'
                        >
                            Confirm Password:
                        </label>
                        <input
                            type='password'
                            id='confirmPassword'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        />
                    </div>
                    <div className='flex justify-center'>
                        {isLoading && <Loader />}
                    </div>
                    <div>
                        <button
                            type='submit'
                            className='w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        >
                            Update User
                        </button>
                    </div>
                    <div>
                        <button
                            type='button'
                            className='w-full px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                            onClick={async () => {
                                if (
                                    window.confirm(
                                        'Are you sure you want to delete this user?'
                                    )
                                ) {
                                    await deleteUserById(userId).unwrap();
                                    navigate('/admin/users');
                                }
                            }}
                        >
                            Delete User
                        </button>
                    </div>
                    <div>
                        <button
                            type='button'
                            className='w-full px-4 py-2 text-gray-800 bg-gray-300 hover:bg-gray-400 rounded-md focus:outline-none'
                            onClick={() => navigate('/admin/users')}
                        >
                            Go Back
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SingleUserScreen;
