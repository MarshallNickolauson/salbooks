import { useParams } from 'react-router-dom';
import { useGetChapterContentByTitleAndPartAndNumberQuery, useUpdateChapterContentByTitleAndPartAndNumberMutation } from '../slices/bookApiSlice';
import { useEffect, useState } from 'react';
import quillModules from '../utils/quillModules';
import formattedBookTitle from '../utils/formatBookTitle';
import ReactQuill from 'react-quill';
import Loader from '../components/Loader';

const ChapterContentScreen = () => {
    const { bookTitle, partNumber, chapterNumber } = useParams();

    const [chapterContent, setChapterContent] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const [
        updateChapterContent,
        { isLoading: isUpdateLoading, error: isUpdateError },
    ] = useUpdateChapterContentByTitleAndPartAndNumberMutation();

    const {
        data: chapterContentData,
        isLoading: isChapterContentLoading,
        error: chapterContentError,
    } = useGetChapterContentByTitleAndPartAndNumberQuery({
        bookTitle,
        partNumber: Number(partNumber),
        chapterNumber: Number(chapterNumber),
    });

    useEffect(() => {
        if (chapterContentData) {
            setChapterContent(chapterContentData.content);
        }
    }, [chapterContentData]);

    const handleEditorChange = (content) => {
        setChapterContent(content);
    };

    const handleEditButton = async () => {
        if (isEditing) {
            try {
                await updateChapterContent({
                    bookTitle,
                    partNumber: Number(partNumber),
                    chapterNumber: Number(chapterNumber),
                    content: chapterContent,
                });
            } catch (error) {
                console.error(error);
            }
        }
        setIsEditing(!isEditing);
    };

    return isChapterContentLoading ? (
        <Loader />
    ) : chapterContentError ? (
        <p>Error: {chapterContentError}</p>
    ) : (
        <div>
            <div className='flex flex-row'>
                <h1 className='text-2xl font-bold mb-4'>
                    {formattedBookTitle(bookTitle)}
                </h1>
                <div className='ml-auto flex items-center space-x-1'>
                    <button
                        className={`py-2 w-20 text-white bg-gray-400 hover:bg-gray-500 font-bold px-4 rounded ${
                            isEditing ? '' : 'hidden'
                        }`}
                        onClick={() => setIsEditing(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className={`py-2 w-20 text-white font-bold px-4 rounded ${
                            isEditing
                                ? 'bg-green-500 hover:bg-green-600'
                                : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                        onClick={handleEditButton}
                    >
                        {isEditing ? 'Save' : 'Edit'}
                    </button>
                </div>
            </div>

            {isEditing ? (
                <ReactQuill
                    className='mt-4'
                    value={chapterContent}
                    onChange={handleEditorChange}
                    theme='snow'
                    modules={quillModules}
                />
            ) : (
                <>
                    {chapterContent === '<p><br></p>' ? (
                        <p>No content to display</p>
                    ) : (
                        <div
                            className='formatted-content'
                            dangerouslySetInnerHTML={{
                                __html: chapterContent,
                            }}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default ChapterContentScreen;
