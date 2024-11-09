import { useParams } from 'react-router-dom';

const BookPrefaceScreen = () => {
    const {bookTitle} = useParams();

  return (
    <div>
        Book Preface
    </div>
  )
}

export default BookPrefaceScreen
