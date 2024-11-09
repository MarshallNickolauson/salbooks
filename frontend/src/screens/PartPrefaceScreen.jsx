import { useParams } from 'react-router-dom';

const PartPrefaceScreen = () => {
    const {bookTitle, partNumber} = useParams();

  return (
    <div>
        Part Preface
    </div>
  )
}

export default PartPrefaceScreen
