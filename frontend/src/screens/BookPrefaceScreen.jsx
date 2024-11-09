import { useParams } from 'react-router-dom';
import { useGetBookPrefaceByTitleQuery } from '../slices/bookApiSlice';

const BookPrefaceScreen = () => {
    const { bookTitle } = useParams();

    const {
        data: preface,
        error,
        isLoading,
    } = useGetBookPrefaceByTitleQuery(bookTitle);

    return isLoading ? (
        <p>Loading...</p>
    ) : error ? (
        <p>Error: {error}</p>
    ) : (
        <div>
            <h1 className='text-2xl font-bold mb-4'>{bookTitle}</h1>
            <p>{preface.preface}</p>
        </div>
    );
};

export default BookPrefaceScreen;
