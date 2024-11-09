import { useParams } from 'react-router-dom';
import { useGetBookIntroductionByTitleQuery } from '../slices/bookApiSlice';

const IntroductionScreen = () => {
    const { bookTitle } = useParams();

    const {
        data: introduction,
        error,
        isLoading,
    } = useGetBookIntroductionByTitleQuery(bookTitle);

    return isLoading ? (
        <p>Loading...</p>
    ) : error ? (
        <p>Error: {error}</p>
    ) : (
        <div>
            <h1 className='text-2xl font-bold mb-4'>{bookTitle}</h1>
            <p>{introduction.introduction}</p>
        </div>
    );
};

export default IntroductionScreen;
