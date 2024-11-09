import { useParams } from 'react-router-dom'

const IntroductionScreen = () => {
    const {bookTitle} = useParams()

  return (
    <div>
      Book Introduction
    </div>
  )
}

export default IntroductionScreen
