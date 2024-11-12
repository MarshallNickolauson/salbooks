import Header from '../components/Header';
import { Outlet, useNavigate } from 'react-router-dom';
import { useGetBooksQuery } from '../slices/bookApiSlice';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = () => {
    const [expandedBookId, setExpandedBookId] = useState(null);
    const [expandedParts, setExpandedParts] = useState({});

    const navigate = useNavigate();

    const { data: books, error, isLoading, refetch } = useGetBooksQuery();

    useEffect(() => {
        refetch();
    }, [refetch]);

    const formattedBookTitle = (title) => {
        return title
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (l) => l.toUpperCase());
    };

    const toggleExpandBook = (bookId) => {
        setExpandedBookId(bookId === expandedBookId ? null : bookId);
    };

    const toggleExpandPart = (partId) => {
        setExpandedParts((prevExpandedParts) => ({
            ...prevExpandedParts,
            [partId]: !prevExpandedParts[partId],
        }));
    };

    const sortedBooks = books ? [...books].sort((a, b) => {
        if (a.volume && b.volume) {
            return a.volume - b.volume;
        }
        return 0;
    }) : [];

    return (
        <>
            <Header />
            <ToastContainer />
            {/* Sidebar */}
            <div className='flex h-[90vh] font-roboto'>
                <div className='w-3/12 md:w-3/12 flex flex-col h-full overflow-hidden bg-gray-100 p-2 shadow-lg'>
                    <div className='flex-1 overflow-y-auto'>
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <div>
                                {sortedBooks.map(
                                    (book) => (
                                        (
                                            <div
                                                key={book._id}
                                                className='mb-2'
                                            >
                                                <div
                                                    className={`flex items-center justify-between py-1 px-3 bg-white rounded-lg border-2 border-[${book.color}] cursor-pointer hover:bg-gray-200 transition`}
                                                    onClick={() =>
                                                        toggleExpandBook(
                                                            book._id
                                                        )
                                                    }
                                                >
                                                    <span>
                                                        {formattedBookTitle(book.title)}
                                                    </span>
                                                    <svg
                                                        className={`w-5 h-5 transform transition-transform ${
                                                            expandedBookId ===
                                                            book._id
                                                                ? 'rotate-180'
                                                                : ''
                                                        }`}
                                                        fill='none'
                                                        stroke='currentColor'
                                                        viewBox='0 0 24 24'
                                                        xmlns='http://www.w3.org/2000/svg'
                                                    >
                                                        <path
                                                            strokeLinecap='round'
                                                            strokeLinejoin='round'
                                                            strokeWidth='2'
                                                            d='M19 9l-7 7-7-7'
                                                        ></path>
                                                    </svg>
                                                </div>

                                                <div
                                                    className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
                                                        expandedBookId ===
                                                        book._id
                                                            ? 'max-h-screen'
                                                            : 'max-h-0'
                                                    }`}
                                                >
                                                    <p
                                                        className='py-1 px-3 hover:bg-gray-200 cursor-pointer rounded-lg'
                                                        onClick={() =>
                                                            navigate(
                                                                `/books/${book.title}/introduction`
                                                            )
                                                        }
                                                    >
                                                        Introduction
                                                    </p>
                                                    <p
                                                        className='py-1 px-3 hover:bg-gray-200 cursor-pointer rounded-lg'
                                                        onClick={() =>
                                                            navigate(
                                                                `/books/${book.title}/preface`
                                                            )
                                                        }
                                                    >
                                                        Preface
                                                    </p>
                                                    {book.parts.map((part) => (
                                                        <div
                                                            key={part._id}
                                                            className='pl-3'
                                                        >
                                                            <div
                                                                className='flex items-center justify-between py-1 px-3 hover:bg-gray-200 cursor-pointer rounded-lg'
                                                                onClick={() =>
                                                                    toggleExpandPart(
                                                                        part._id
                                                                    )
                                                                }
                                                            >
                                                                <span>
                                                                    {part.title}
                                                                </span>
                                                                <svg
                                                                    className={`w-4 h-4 transform transition-transform ${
                                                                        expandedParts[
                                                                            part
                                                                                ._id
                                                                        ]
                                                                            ? 'rotate-180'
                                                                            : ''
                                                                    }`}
                                                                    fill='none'
                                                                    stroke='currentColor'
                                                                    viewBox='0 0 24 24'
                                                                    xmlns='http://www.w3.org/2000/svg'
                                                                >
                                                                    <path
                                                                        strokeLinecap='round'
                                                                        strokeLinejoin='round'
                                                                        strokeWidth='2'
                                                                        d='M19 9l-7 7-7-7'
                                                                    ></path>
                                                                </svg>
                                                            </div>
                                                            <div
                                                                className={`pl-3 transition-max-height duration-300 ease-in-out overflow-hidden ${
                                                                    expandedParts[
                                                                        part._id
                                                                    ]
                                                                        ? 'max-h-screen'
                                                                        : 'max-h-0'
                                                                }`}
                                                            >
                                                                <p
                                                                    className='py-1 px-3 hover:bg-gray-200 cursor-pointer rounded-lg'
                                                                    onClick={() =>
                                                                        navigate(
                                                                            `/books/${book.title}/${part.part}/preface`
                                                                        )
                                                                    }
                                                                >
                                                                    Preface
                                                                </p>
                                                                {part.chapters.map(
                                                                    (
                                                                        chapter
                                                                    ) => (
                                                                        <p
                                                                            key={
                                                                                chapter._id
                                                                            }
                                                                            className='py-1 px-3 hover:bg-gray-200 cursor-pointer rounded-lg'
                                                                            onClick={() =>
                                                                                navigate(
                                                                                    `/books/${book.title}/${part.part}/${chapter.chapter}`
                                                                                )
                                                                            }
                                                                        >
                                                                            {
                                                                                chapter.title
                                                                            }
                                                                        </p>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    )
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Main content area */}
                <div className='flex-1 overflow-y-auto p-4'>
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default MainLayout;
