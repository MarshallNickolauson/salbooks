import React from 'react'
import { useParams } from 'react-router-dom'

const IntroductionScreen = () => {
    const {bookTitle} = useParams()
    console.log(bookTitle)

  return (
    <div>
      introduction
    </div>
  )
}

export default IntroductionScreen
