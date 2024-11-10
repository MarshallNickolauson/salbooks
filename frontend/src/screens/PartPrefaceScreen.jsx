import { useParams } from 'react-router-dom';
import {
    useGetPartPrefaceByTitleAndNumberQuery,
    useUpdatePartPrefaceByTitleAndNumberMutation,
} from '../slices/bookApiSlice';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from 'react';
import quillModules from '../utils/quillModules';
import formattedBookTitle from '../utils/formatBookTitle';
import Loader from '../components/Loader';
import { useSelector } from 'react-redux';

const PartPrefaceScreen = () => {
    const { bookTitle, partNumber } = useParams();

    const [partPrefaceContent, setPartPrefaceContent] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const { userInfo } = useSelector((state) => state.auth);

    const [
        updatePartPreface,
        { isLoading: isUpdateLoading, error: isUpdateError },
    ] = useUpdatePartPrefaceByTitleAndNumberMutation();

    const {
        data: partPreface,
        isLoading: isPartPrefaceLoading,
        error: partPrefaceError,
    } = useGetPartPrefaceByTitleAndNumberQuery({
        bookTitle,
        partNumber: Number(partNumber),
    });

    useEffect(() => {
        if (partPreface) {
            setPartPrefaceContent(partPreface.preface);
        }
    }, [partPreface]);

    const handleEditorChange = (content) => {
        setPartPrefaceContent(content);
    };

    const handleEditButton = async () => {
        if (isEditing) {
            try {
                await updatePartPreface({
                    bookTitle,
                    partNumber: Number(partNumber),
                    preface: partPrefaceContent,
                });
            } catch (error) {
                console.error(error);
            }
        }
        setIsEditing(!isEditing);
    };

    return isPartPrefaceLoading ? (
        <Loader />
    ) : partPrefaceError ? (
        <p>Error: {partPrefaceError}</p>
    ) : (
        <div>
            <div className='flex flex-row'>
                <h1 className='text-2xl font-bold mb-4'>
                    {formattedBookTitle(bookTitle)}
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
                    value={partPrefaceContent}
                    onChange={handleEditorChange}
                    theme='snow'
                    modules={quillModules}
                />
            ) : (
                <>
                    {partPrefaceContent === '<p><br></p>' ? (
                        <p>No content to display</p>
                    ) : (
                        <div
                            className='formatted-content'
                            dangerouslySetInnerHTML={{
                                __html: partPrefaceContent,
                            }}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default PartPrefaceScreen;
