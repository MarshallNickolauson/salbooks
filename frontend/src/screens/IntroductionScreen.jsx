import { useParams } from 'react-router-dom';
import {
    useGetBookIntroductionByTitleQuery,
    useUpdateBookIntroductionByTitleMutation,
} from '../slices/bookApiSlice';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from 'react';

const IntroductionScreen = () => {
    const { bookTitle } = useParams();

    const [introductionContent, setIntroductionContent] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const [
        updateIntroduction,
        { isLoading: isUpdateLoading, error: isUpdateError },
    ] = useUpdateBookIntroductionByTitleMutation();

    const {
        data: introduction,
        error: getIntroductionError,
        isLoading: isIntroductionLoading,
    } = useGetBookIntroductionByTitleQuery(bookTitle);

    useEffect(() => {
        if (introduction) {
            setIntroductionContent(introduction.introduction);
        }
    }, [introduction]);

    const handleEditorChange = (content) => {
        setIntroductionContent(content);
    };

    const handleEditButton = async () => {
        if (isEditing) {
            try {
                await updateIntroduction({
                    bookTitle,
                    introduction: introductionContent,
                });
            } catch (error) {
                console.error(error);
            }
        }
        setIsEditing(!isEditing);
    };

    const formattedBookTitle = (title) => {
        return title
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (l) => l.toUpperCase());
    };

    const quillModules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'link'],
            [{ script: 'sub' }, { script: 'super' }],
        ],
    };

    return isIntroductionLoading ? (
        <p>Loading...</p>
    ) : getIntroductionError ? (
        <p>Error: {getIntroductionError}</p>
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
                    value={introductionContent}
                    onChange={handleEditorChange}
                    theme='snow'
                    modules={quillModules}
                />
            ) : (
                <>
                    {introductionContent === '<p><br></p>' ? (
                        <p>No content to display</p>
                    ) : (
                        <div
                            className='formatted-content'
                            dangerouslySetInnerHTML={{
                                __html: introductionContent,
                            }}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default IntroductionScreen;
