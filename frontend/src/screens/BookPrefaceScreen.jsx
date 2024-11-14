import { useParams } from 'react-router-dom';
import {
    useGetBookPrefaceByTitleQuery,
    useUpdateBookPrefaceByTitleMutation,
} from '../slices/bookApiSlice';
import { useEffect, useState } from 'react';
import quillModules from '../utils/quillModules';
import formattedBookTitle from '../utils/formatBookTitle';
import ReactQuill from 'react-quill';
import Loader from '../components/Loader';
import { useSelector } from 'react-redux';

const BookPrefaceScreen = () => {
    const { bookTitle } = useParams();

    const [prefaceContent, setPrefaceContent] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const { userInfo } = useSelector((state) => state.auth);

    const [
        updatePreface,
        { isLoading: isUpdateLoading, error: isUpdateError },
    ] = useUpdateBookPrefaceByTitleMutation();

    const {
        data: preface,
        isLoading: isPrefaceLoading,
        error: prefaceError,
    } = useGetBookPrefaceByTitleQuery(bookTitle);

    useEffect(() => {
        if (preface) {
            setPrefaceContent(preface.preface);
        }
    }, [preface]);

    const handleEditorChange = (content) => {
        setPrefaceContent(content);
    };

    const handleEditButton = async () => {
        if (isEditing) {
            try {
                await updatePreface({
                    bookTitle,
                    preface: prefaceContent,
                });
            } catch (error) {
                console.error(error);
            }
        }
        setIsEditing(!isEditing);
    };

    return isPrefaceLoading ? (
        <Loader />
    ) : prefaceError ? (
        <p>Error: {prefaceError}</p>
    ) : (
        <div className='p-4'>
            <div className='flex flex-row mb-4 items-center'>
                <h1 className='flex-1 text-xl font-bold text-center'>
                    Preface
                </h1>
                {userInfo && userInfo.isAdmin && (
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
                )}
            </div>

            {isEditing && userInfo && userInfo.isAdmin ? (
                <ReactQuill
                    className='mt-4'
                    value={prefaceContent}
                    onChange={handleEditorChange}
                    theme='snow'
                    modules={quillModules}
                />
            ) : (
                <>
                    {prefaceContent === '<p><br></p>' ? (
                        <p>No content to display</p>
                    ) : (
                        <div
                            className='formatted-content text-sm'
                            dangerouslySetInnerHTML={{
                                __html: prefaceContent,
                            }}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default BookPrefaceScreen;
