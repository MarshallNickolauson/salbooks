import Header from '../components/Header';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useGetBooksQuery } from '../slices/bookApiSlice';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import formattedBookTitle from '../utils/formatBookTitle';
import hexToRgba from '../utils/hexToRgba';

const MainLayout = () => {
    const [expandedBookId, setExpandedBookId] = useState(null);
    const [expandedParts, setExpandedParts] = useState({});
    const [currentColor, setCurrentColor] = useState('#000000');

    const hoverColor = 'hover:bg-slate-50/60';
    const currentItemColor = 'bg-slate-50/90 hover:bg-none';

    const navigate = useNavigate();

    const location = useLocation();

    const { data: books, error, isLoading, refetch } = useGetBooksQuery();

    const getPathBookName = () => {
        const pathParts = location.pathname.split('/');
        return pathParts.length > 2 ? pathParts[2] : null;
    };

    useEffect(() => {
        const bookTitle = getPathBookName();
        if (bookTitle && books) {
            const matchedBook = books.find((book) => book.title === bookTitle);
            if (matchedBook) {
                setExpandedBookId(matchedBook._id);
                const partNumber = location.pathname.split('/')[3];
                if (partNumber) {
                    const matchedPart = matchedBook.parts.find(
                        (part) => part.part === parseInt(partNumber)
                    );
                    if (matchedPart) {
                        setExpandedParts((prevExpandedParts) => ({
                            ...prevExpandedParts,
                            [matchedPart._id]: true,
                        }));
                    }
                }
            }
        }
    }, [location, books]);

    useEffect(() => {
        refetch();
    }, [refetch]);

    const toggleExpandBook = (bookId) => {
        setExpandedBookId(bookId === expandedBookId ? null : bookId);
    };

    const toggleExpandPart = (partId) => {
        setExpandedParts((prevExpandedParts) => ({
            ...prevExpandedParts,
            [partId]: !prevExpandedParts[partId],
        }));
    };

    const isActive = (path) => {
        const currentPath = location.pathname;
        return currentPath.includes(path);
    };

    useEffect(() => {
        const bookTitle = location.pathname.split('/')[2];
        if (bookTitle && books) {
            const matchedBook = books.find((book) => book.title === bookTitle);
            if (matchedBook && expandedBookId === matchedBook._id) {
                setCurrentColor(matchedBook.color);
            }
        }
    }, [location, books, expandedBookId]);

    const sortedBooks = books
        ? [...books].sort((a, b) => {
              if (a.volume && b.volume) {
                  return a.volume - b.volume;
              }
              return 0;
          })
        : [];

    return (
        <div className='h-screen flex flex-col'>
            <div className='fixed top-0 left-0 right-0 z-10'>
                <Header />
            </div>

            <ToastContainer />
            {/* Main container holding sidebar and content */}
            <div className='flex h-full pt-[65px]'>
                {/* Sidebar */}
                <div
                    className='w-[300px] flex flex-col h-full overflow-y-auto pt-2 pr-3 shadow-lg bg-mainBluishWhite/60 backdrop-blur-lg rounded-tr-xl'
                >
                    <div className='flex-1'>
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <div>
                                {sortedBooks.map((book) => (
                                    <div key={book._id} className='mb-2'>
                                        <div
                                            className={`flex items-center justify-between py-1 px-3 bg-transparent rounded-r-full  cursor-pointer transition ${hoverColor}`}
                                            style={{
                                                
                                                backgroundColor: hexToRgba(
                                                    book.color,
                                                    expandedBookId === book._id
                                                        ? 0.5
                                                        : 0.2
                                                ),
                                            }}
                                            onClick={() => {
                                                toggleExpandBook(book._id);
                                            }}
                                        >
                                            <span>
                                                {formattedBookTitle(book.title)}
                                            </span>
                                            <svg
                                                className={`w-5 h-5 transform transition-transform ${
                                                    expandedBookId === book._id
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
                                        {/* Parts of the book */}
                                        <div
                                            className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
                                                expandedBookId === book._id
                                                    ? 'max-h-screen'
                                                    : 'max-h-0'
                                            }`}
                                        >
                                            <p
                                                className={`py-1 px-3 cursor-pointer rounded-r-full transition-all duration-150 ${
                                                    isActive(
                                                        `/books/${book.title}/introduction`
                                                    )
                                                        ? currentItemColor
                                                        : hoverColor
                                                }`}
                                                onClick={() =>
                                                    navigate(
                                                        `/books/${book.title}/introduction`
                                                    )
                                                }
                                            >
                                                Introduction
                                            </p>
                                            <p
                                                className={`py-1 px-3 cursor-pointer rounded-r-full transition-all duration-150 ${
                                                    isActive(
                                                        `/books/${book.title}/preface`
                                                    )
                                                        ? currentItemColor
                                                        : hoverColor
                                                }`}
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
                                                        className={`flex items-center justify-between py-1 px-3 cursor-pointer rounded-full transition-all duration-150 ${hoverColor}`}
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
                                                                    part._id
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
                                                            className={`py-1 px-3 cursor-pointer rounded-full transition-all duration-150 ${
                                                                isActive(
                                                                    `/books/${book.title}/${part.part}/preface`
                                                                )
                                                                    ? currentItemColor
                                                                    : hoverColor
                                                            }`}
                                                            onClick={() =>
                                                                navigate(
                                                                    `/books/${book.title}/${part.part}/preface`
                                                                )
                                                            }
                                                        >
                                                            Preface
                                                        </p>
                                                        {part.chapters.map(
                                                            (chapter) => (
                                                                <p
                                                                    key={
                                                                        chapter._id
                                                                    }
                                                                    className={`py-1 px-3 cursor-pointer rounded-full transition-all duration-150 ${
                                                                        isActive(
                                                                            `/books/${book.title}/${part.part}/${chapter.chapter}`
                                                                        )
                                                                            ? currentItemColor
                                                                            : hoverColor
                                                                    }`}
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
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Main content area */}
                <div
                    className='flex-1 overflow-y-auto bg-white/70 backdrop-blur-lg border-b-0 shadow-gray-500 shadow-xl rounded-t-xl mx-4'
                >
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
