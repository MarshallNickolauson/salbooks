import Header from '../components/Header';
import { Outlet, useNavigate } from 'react-router-dom';
import { useGetBooksQuery } from '../slices/bookApiSlice';
import { useState } from 'react';

const MainLayout = () => {
    const [expandedBookId, setExpandedBookId] = useState(null);
    const [expandedParts, setExpandedParts] = useState({});

    const navigate = useNavigate();

    const { data: books, error, isLoading } = useGetBooksQuery();

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

    const bookIntroductionNavigate = (bookTitle) => {
        navigate(`/books/${bookTitle}/introduction`);
    };

    const bookPrefaceNavigate = (bookTitle) => {
        navigate(`/books/${bookTitle}/preface`);
    };

    const partPrefaceNavigate = (bookTitle, partNumber) => {
        navigate(`/books/${bookTitle}/${partNumber}/preface`);
    };

    const chapterNavigate = (bookTitle, partNumber, chapterNumber) => {
        navigate(`/books/${bookTitle}/${partNumber}/${chapterNumber}`);
    };

    return (
        <>
            <Header />
            <div className='flex max-h-[80vh] font-roboto'>
                <div className='w-3/12 md:w-3/12'>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <div>
                            {books.map((book) => (
                                <div key={book._id}>
                                    <p
                                        className='py-1 px-3 hover:bg-gray-200 cursor-pointer underline'
                                        onClick={() =>
                                            toggleExpandBook(book._id)
                                        }
                                    >
                                        {formattedBookTitle(book.title)}
                                    </p>

                                    <div
                                        className={`transition-max-height duration-300 ease-in-out overflow-auto pl-3 ${
                                            expandedBookId === book._id
                                                ? 'max-h-[80vh]'
                                                : 'max-h-0'
                                        }`}
                                    >
                                        <p
                                            className='py-1 px-3 hover:bg-gray-200 cursor-pointer'
                                            onClick={() =>
                                                bookIntroductionNavigate(
                                                    book.title
                                                )
                                            }
                                        >
                                            Introduction
                                        </p>
                                        <p
                                            className='py-1 px-3 hover:bg-gray-200 cursor-pointer'
                                            onClick={() =>
                                                bookPrefaceNavigate(book.title)
                                            }
                                        >
                                            Preface
                                        </p>
                                        {book.parts.map((part) => (
                                            <div key={part._id}>
                                                <p
                                                    className='py-1 px-3 hover:bg-gray-200 cursor-pointer font-bold'
                                                    onClick={() =>
                                                        toggleExpandPart(
                                                            part._id
                                                        )
                                                    }
                                                >
                                                    {part.title}
                                                </p>

                                                <div
                                                    className={`transition-max-height duration-300 ease-in-out overflow-auto pl-3 ${
                                                        expandedParts[part._id]
                                                            ? 'max-h-[80vh]'
                                                            : 'max-h-0'
                                                    }`}
                                                >
                                                    <p
                                                        className='py-1 px-3 hover:bg-gray-200 cursor-pointer'
                                                        onClick={() =>
                                                            partPrefaceNavigate(
                                                                book.title,
                                                                part.part
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
                                                                className='py-1 px-3 hover:bg-gray-200 cursor-pointer'
                                                                onClick={() =>
                                                                    chapterNavigate(
                                                                        book.title,
                                                                        part.part,
                                                                        chapter.chapter
                                                                    )
                                                                }
                                                            >
                                                                {chapter.title}
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
                <div className='w-9/12 md:w-9/12'>
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default MainLayout;
