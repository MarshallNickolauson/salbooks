import { Link } from 'react-router-dom'

const NotFoundScreen = () => {
    return (
        <section className='text-center flex flex-col justify-center items-center h-96'>
            <h1 className='text-6xl font-bold mb-4'>404 Not Found</h1>
            <p className='text-xl mb-5'>This page does not exist</p>
            <Link
                to='/'
                className='text-white bg-orange-400 hover:bg-orange-500 rounded-full px-3 py-3 mt-4'
            >
                Go Back
            </Link>
        </section>
    )
}

export default NotFoundScreen
