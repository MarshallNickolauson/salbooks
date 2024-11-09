import Header from '../components/Header';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
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

    const chapterNavigate = (bookTitle, partNumber, chapterNumber) => {
        navigate(`/books/${bookTitle}/${partNumber}/${chapterNumber}`);
    };

    return (
        <>
            <Header />
            <div className='flex min-h-screen font-roboto'>
                <div className='w-3/12 md:w-3/12'>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <div>
                            {books.map((book) => (
                                <div key={book._id}>
                                    <div className='inline-block'>
                                        <p
                                            className='py-1 px-3 hover:bg-gray-200 cursor-pointer underline'
                                            onClick={() =>
                                                toggleExpandBook(book._id)
                                            }
                                        >
                                            {formattedBookTitle(book.title)}
                                        </p>
                                    </div>

                                    <div
                                        className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
                                            expandedBookId === book._id
                                                ? 'max-h-screen'
                                                : 'max-h-0'
                                        }`}
                                    >
                                        {book.parts.map((part) => (
                                            <div
                                                key={part._id}
                                                className='inline-block'
                                            >
                                                <p
                                                    className='py-1 px-3 hover:bg-gray-200 cursor-pointer font-bold'
                                                    onClick={() => toggleExpandPart(part._id)}
                                                >
                                                    {part.title}
                                                </p>

                                                <div
                                                    className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
                                                        expandedParts[part._id]
                                                            ? 'max-h-screen'
                                                            : 'max-h-0'
                                                    }`}
                                                >
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
                <div className='w-9/12 md:w-9/12'>Content</div>
            </div>
            <Footer />
        </>
    );
};

export default MainLayout;
