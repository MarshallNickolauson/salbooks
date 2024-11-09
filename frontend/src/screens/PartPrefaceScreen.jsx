import { useParams } from 'react-router-dom';
import { useGetPartPrefaceByTitleAndNumberQuery } from '../slices/bookApiSlice';

const PartPrefaceScreen = () => {
    const { bookTitle, partNumber } = useParams();
    console.log(bookTitle, partNumber);

    const {
        data: partPreface,
        error,
        isLoading,
    } = useGetPartPrefaceByTitleAndNumberQuery({
        bookTitle,
        partNumber: Number(partNumber),
    });

    return isLoading ? (
        <p>Loading...</p>
    ) : error ? (
        <p>
            Error: {error.status} - {error.data?.message || 'An error occurred'}
        </p>
    ) : (
        <div>
            <h1 className='text-2xl font-bold mb-4'>{bookTitle}</h1>
            <p>{partPreface.preface}</p>
        </div>
    );
};

export default PartPrefaceScreen;
