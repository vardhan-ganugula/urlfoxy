
const Loader = ({
    height = '200',
    width = '200',
    bgColor = 'white'

}) => {

  return (
    <div
    className='p-1 bg-transparent relative w-full min-h-[400px] flex justify-center items-center'
    >
        <div className={`border-t-2 rounded-full m-5 animate-spin`} style={{
            height: height+'px',
            width: width+'px',
            borderColor: bgColor
        }}>

        </div>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white'>
            Loading
        </div>

    </div>
  )
}

export default Loader