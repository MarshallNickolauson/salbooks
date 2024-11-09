import { useParams } from 'react-router-dom';

const ChapterContentScreen = () => {
    const {bookTitle, partNumber, chapterNumber} = useParams();

  return (
    <div>
        Chapter Content
    </div>
  )
}

export default ChapterContentScreen
