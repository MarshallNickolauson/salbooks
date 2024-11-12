import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FaPlus, FaTrash } from 'react-icons/fa';
import {
    useDeleteBookByIdMutation,
    useGetBookByIdQuery,
    useUpdateBookMutation,
} from '../slices/bookApiSlice';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import formattedBookTitle from '../utils/formatBookTitle';
import reverseFormattedBookTitle from '../utils/reverseFormatBookTitle';

const SingleBookScreen = () => {
    const { id: bookId } = useParams();
    const {
        data: bookData,
        isLoading: isFetching,
        error,
        refetch,
    } = useGetBookByIdQuery(bookId);

    useEffect(() => {
        refetch();
    }, [refetch]);

    const [updateBook, { isLoading }] = useUpdateBookMutation();

    const [deleteBookById, { isLoading: isDeleting }] = useDeleteBookByIdMutation();

    const navigate = useNavigate();

    const [book, setBook] = useState({
        _id: bookId,
        title: '',
        parts: [],
        aboutAuthor: '',
        color: '#00FFFF',
    });

    useEffect(() => {
        if (bookData) {
            setBook({
                title: bookData.title,
                parts: bookData.parts,
                aboutAuthor: bookData.aboutAuthor,
                color: bookData.color,
            });
        }
    }, [bookData]);

    const handleAddPart = () => {
        setBook((prevBook) => ({
            ...prevBook,
            parts: [
                ...prevBook.parts,
                {
                    part: prevBook.parts.length + 1,
                    title: '',
                    chapters: [],
                },
            ],
        }));
    };

    const handleRemovePart = (index) => {
        setBook((prevBook) => ({
            ...prevBook,
            parts: prevBook.parts.filter((_, i) => i !== index),
        }));
    };

    const handleAddChapter = (partIndex) => {
        setBook((prevBook) => {
            const updatedParts = [...prevBook.parts];
            updatedParts[partIndex] = {
                ...updatedParts[partIndex],
                chapters: [
                    ...updatedParts[partIndex].chapters,
                    {
                        chapter: updatedParts[partIndex].chapters.length + 1,
                        title: '',
                    },
                ],
            };
            return { ...prevBook, parts: updatedParts };
        });
    };

    const handleRemoveChapter = (partIndex, chapterIndex) => {
        setBook((prevBook) => {
            const updatedParts = [...prevBook.parts];
            updatedParts[partIndex] = {
                ...updatedParts[partIndex],
                chapters: updatedParts[partIndex].chapters.filter(
                    (_, i) => i !== chapterIndex
                ),
            };
            return { ...prevBook, parts: updatedParts };
        });
    };

    const handleInputChange = (e, key) => {
        const { value } = e.target;
        setBook((prevBook) => ({ ...prevBook, [key]: value }));
    };

    const handlePartInputChange = (e, index, key) => {
        const { value } = e.target;
        setBook((prevBook) => {
            const updatedParts = [...prevBook.parts];
            updatedParts[index][key] = value;
            return { ...prevBook, parts: updatedParts };
        });
    };

    const handleChapterInputChange = (e, partIndex, chapterIndex, key) => {
        const { value } = e.target;
        setBook((prevBook) => {
            const updatedParts = [...prevBook.parts];
            updatedParts[partIndex].chapters[chapterIndex][key] = value;
            return { ...prevBook, parts: updatedParts };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            book.title = reverseFormattedBookTitle(book.title);
            const res = await updateBook({ id: bookId, book }).unwrap();
            toast.success('Book updated successfully');
            navigate('/admin/books');
        } catch (error) {
            console.log(error);
            toast.error(`${error.data?.message || 'An error occurred'}`);
        }
    };

    if (isFetching) return <Loader />;

    if (error) {
        return <p>Error loading book data</p>;
    }

    return (
        <div className='flex items-center'>
            <div className='w-full max-w-3xl p-8 space-y-6 bg-white rounded-lg shadow-md'>
                <h2 className='text-2xl font-bold text-center'>Edit Book</h2>
                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div>
                        <label
                            htmlFor='title'
                            className='block text-sm font-medium text-gray-700'
                        >
                            Book Title:
                        </label>
                        <input
                            type='text'
                            id='title'
                            value={formattedBookTitle(book.title)}
                            onChange={(e) => handleInputChange(e, 'title')}
                            required
                            className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        />
                    </div>
                    <div className='flex flex-row space-x-2 items-center'>
                        <label
                            htmlFor='color'
                            className='block text-sm font-medium text-gray-700'
                        >
                            Book Color:
                        </label>
                        <input
                            type='color'
                            id='color'
                            value={book.color}
                            onChange={(e) => handleInputChange(e, 'color')}
                            className='w-16 h-7 p-0 border-none cursor-pointer'
                        />
                    </div>
                    {book.parts.map((part, partIndex) => (
                        <div
                            key={partIndex}
                            className='p-4 border border-gray-300 rounded-md'
                        >
                            <div className='flex items-center justify-between'>
                                <h3 className='text-lg font-semibold'>
                                    Part {part.part}
                                </h3>
                                <button
                                    type='button'
                                    onClick={() => handleRemovePart(partIndex)}
                                    className='text-red-600'
                                >
                                    <FaTrash />
                                </button>
                            </div>
                            <div className='space-y-3'>
                                <label className='block text-sm font-medium text-gray-700'>
                                    Title:
                                </label>
                                <input
                                    type='text'
                                    value={part.title}
                                    onChange={(e) =>
                                        handlePartInputChange(
                                            e,
                                            partIndex,
                                            'title'
                                        )
                                    }
                                    required
                                    className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                />
                            </div>
                            {part.chapters.map((chapter, chapterIndex) => (
                                <div
                                    key={chapterIndex}
                                    className='mt-4 p-4 border border-gray-200 rounded-md'
                                >
                                    <div className='flex items-center justify-between'>
                                        <h4 className='text-md font-bold'>
                                            Chapter {chapter.chapter}
                                        </h4>
                                        <div className='flex space-x-2'>
                                            <button
                                                type='button'
                                                onClick={() =>
                                                    handleRemoveChapter(
                                                        partIndex,
                                                        chapterIndex
                                                    )
                                                }
                                                className='text-red-600'
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700'>
                                            Title:
                                        </label>
                                        <input
                                            type='text'
                                            value={chapter.title}
                                            onChange={(e) =>
                                                handleChapterInputChange(
                                                    e,
                                                    partIndex,
                                                    chapterIndex,
                                                    'title'
                                                )
                                            }
                                            required
                                            className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                        />
                                    </div>
                                </div>
                            ))}
                            <button
                                type='button'
                                onClick={() => handleAddChapter(partIndex)}
                                className='mt-2 inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700'
                            >
                                <FaPlus className='mr-1' /> Add Chapter
                            </button>
                        </div>
                    ))}
                    <button
                        type='button'
                        onClick={handleAddPart}
                        className='inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700'
                    >
                        <FaPlus className='mr-1' /> Add Part
                    </button>
                    <div>
                        <button
                            type='submit'
                            className='w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        >
                            Save Changes
                        </button>
                    </div>
                    <div>
                        <button
                            type='button'
                            className='w-full px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                            onClick={async () => {
                                if (
                                    window.confirm(
                                        'Are you sure you want to delete this book?'
                                    )
                                ) {
                                    await deleteBookById(bookId).unwrap();
                                    navigate('/admin/books');
                                }
                            }}
                        >
                            Delete Book
                        </button>
                    </div>
                    <div>
                        <button
                            type='button'
                            className='w-full px-4 py-2 text-gray-800 bg-gray-300 hover:bg-gray-400 rounded-md focus:outline-none'
                            onClick={() => navigate('/admin/books')}
                        >
                            Go Back
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SingleBookScreen;
