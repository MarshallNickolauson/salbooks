import React, { useEffect } from 'react';
import { useGetBooksQuery } from '../slices/bookApiSlice';
import { useNavigate } from 'react-router-dom';
import formattedBookTitle from '../utils/formatBookTitle';
import Loader from '../components/Loader';

const BooksListScreen = () => {
    const { data: books, isLoading, refetch } = useGetBooksQuery();

    const navigate = useNavigate();

    useEffect(() => {
        refetch();
    }, [refetch]);

    const sortedBooks = books ? [...books].sort((a, b) => {
        if (a.volume && b.volume) {
            return a.volume - b.volume;
        }
        return 0;
    }) : [];

    return (
        <div className='p-6 bg-gray-50 min-h-screen'>
            <div className='flex flex-row justify-between'>
                <div className='text-3xl font-semibold text-gray-800 mb-6'>
                    Books List
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
                        onClick={() => navigate('/admin/books/create')}
                    >
                        Create Book
                    </button>
                </div>
            </div>
            <div className='flex flex-col space-y-2'>
                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        {sortedBooks.map((book) => (
                            <div
                                key={book._id}
                                className='bg-white shadow-sm border border-gray-200 rounded-lg p-4 hover:cursor-pointer transition-transform duration-150 hover:scale-[1.02]'
                                onClick={() =>
                                    navigate(`/admin/books/${book._id}`)
                                }
                            >
                                <p className='text-lg text-gray-900 font-medium'>
                                    {formattedBookTitle(book.title)}
                                </p>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default BooksListScreen;
