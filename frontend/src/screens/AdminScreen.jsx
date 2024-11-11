import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminScreen = () => {
    const navigate = useNavigate();

    const panelSelection = {
        user: 'User',
        book: 'Book',
    };

    return (
        <div className='p-6 bg-gray-50 min-h-screen'>
            <div className='text-3xl font-semibold text-gray-800 mb-6'>Admin Panel</div>
            <div className='flex flex-col space-y-2'>
                {Object.values(panelSelection).map((panel) => (
                    <div
                        key={panel}
                        className='bg-white shadow-sm border border-gray-200 rounded-lg p-4 hover:cursor-pointer transition-transform duration-150 hover:scale-[1.02]'
                        onClick={() => navigate(`/admin/${panel.toLowerCase()}s`)}
                    >
                        <p className='text-lg text-gray-900 font-medium'>Manage {panel}s</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminScreen;