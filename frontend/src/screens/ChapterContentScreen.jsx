import { useParams } from 'react-router-dom';
import { useGetChapterContentByTitleAndPartAndNumberQuery } from '../slices/bookApiSlice';

const ChapterContentScreen = () => {
    const { bookTitle, partNumber, chapterNumber } = useParams();

    const {
        data: chapterContent,
        error,
        isLoading,
    } = useGetChapterContentByTitleAndPartAndNumberQuery({
        bookTitle,
        partNumber: Number(partNumber),
        chapterNumber: Number(chapterNumber),
    });

    console.log(chapterContent);

    return isLoading ? (
        <p>Loading...</p>
    ) : error ? (
        <p>
            Error: {error.status} - {error.data?.message || 'An error occurred'}
        </p>
    ) : (
        <div>
            <h1 className='text-2xl font-bold mb-4'>{chapterContent.title}</h1>
            <p>{chapterContent.content}</p>
        </div>
    );
};

export default ChapterContentScreen;
