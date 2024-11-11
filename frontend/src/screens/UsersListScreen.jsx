import { useGetAllUsersQuery } from '../slices/userApiSlice';

const UsersListScreen = () => {
    const { data: users } = useGetAllUsersQuery();
    console.log(users);

    return (
        <div className='p-6 bg-gray-50 min-h-screen'>
            <div className='text-3xl font-semibold text-gray-800 mb-6'>
                Users List
            </div>
            <div className='flex flex-col space-y-2'>
                {users.map((user) => (
                    <div
                        key={user._id}
                        className='bg-white shadow-sm border border-gray-200 rounded-lg p-4 hover:cursor-pointer transition-transform duration-150 hover:scale-[1.02]'
                        onClick={() => navigate(`/admin/users/${user._id}`)}
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
            </div>
        </div>
    );
};

export default UsersListScreen;
