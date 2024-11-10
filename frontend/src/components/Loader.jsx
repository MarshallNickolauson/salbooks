import Spinner from 'react-spinners/ClipLoader'

const Loader = () => {
  return (
    <Spinner 
        size={50}
        color={"#123abc"}
        loading={true}
    />
  )
}

export default Loader
