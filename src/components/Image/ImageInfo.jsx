import React,{ useState } from 'react'
import {IoMdPricetag} from 'react-icons/io'
import {RxDimensions} from 'react-icons/rx'
import {BiCategory,BiLoaderAlt} from 'react-icons/bi'
import {MdMemory} from 'react-icons/md'
import {AiOutlineFileJpg,AiOutlineTags} from 'react-icons/ai'
import {FaUserCircle,FaDownload} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import {saveAs} from "file-saver"
import { placeOrder } from '../user/helper/userApiCalls'
import { isAuthenticated } from '../../utils/LS_Helper'
import {toast} from 'react-toastify'
import {v4} from 'uuid'


const ImageInfo = ({data}) => {
  const [isDownloading,setIsDownloading] = useState(false)
  const {user,token} = isAuthenticated()
  const handleDownloadFree = event => {
    setIsDownloading(true)
    let order = {
      transaction_id: v4(),
      images: [data._id],
      total_amount: data.price,
      payment_method: data.isFree ? "FREE" : "PAID",
      payment_status: data.price === 0 ? "COMPLETED" : "INCOMPLETED",
      payment_details: {}
    }

    placeOrder(user._id,token,order).then(dataa=>{
      if(dataa?.response?.data?.error){
        setIsDownloading(false)
        return toast.error(dataa?.response?.data?.error)
      }else if(dataa.name === "AxiosError"){
        setIsDownloading(false)
        return toast.error("Something went wrong.Try again!")
      }

      let url = `https://res.cloudinary.com/swayangdipta/image/upload/v1/${data.images.id}`
      saveAs(url,`A photograph by ${data.author.name}.${data.images.format}`)
      setIsDownloading(false)
      return toast.success("Order placed successfully.")
    })
  }
  return (
    <div className={`${data.images.width > data.images.height ? ('w-[100%]') : ('w-[100%]')} relative top-0  h-[100%] z-10 bg-zinc-300 dark:bg-zinc-900 rounded-r-md`}>
      <h1 className='ml-[20px] pt-[10px] text-[30px] dark:text-zinc-100 text-zinc-900 select-none'>{data.title}</h1>
      <h1 className='ml-[20px] pt-[10px] text-[20px] dark:text-zinc-300 text-zinc-800 select-none flex items-center gap-[10px] mt-[20px]'><IoMdPricetag /> {data.isFree ? ('Free') : 'Rs. '+data.price}</h1>
      <h1 className='ml-[20px] pt-[10px] text-[20px] dark:text-zinc-300 text-zinc-800 select-none flex items-center gap-[10px] mt-[5px]'><RxDimensions /> {data.images.width +' X '+data.images.height} (pexels)</h1>
      <h1 className='ml-[20px] pt-[10px] text-[20px] dark:text-zinc-300 text-zinc-800 select-none flex items-center gap-[10px] mt-[5px]'><BiCategory /> {data.category.name}</h1>
      <h1 className='ml-[20px] pt-[10px] text-[20px] dark:text-zinc-300 text-zinc-800 select-none flex items-center gap-[10px] mt-[5px]'><MdMemory />{data.images.size > 1024 ? ((data.images.size/1024).toPrecision(2) + " mb "): data.images.size+" kb"}</h1>
      <h1 className='ml-[20px] pt-[10px] text-[20px] dark:text-zinc-300 text-zinc-800 select-none flex items-center gap-[10px] mt-[5px]'><AiOutlineFileJpg /> {data.images.format}</h1>
      <div className='mx-[20px] pt-[10px] text-[20px] dark:text-zinc-300 text-zinc-800 select-none flex items-center gap-[10px] mt-[5px] flex-wrap min-h-max max-h-[80px] overflow-hidden'><AiOutlineTags /> {data.tags.length > 0 && data.tags.map((tag,index)=>(
        <span key={index} className='px-[10px] overflow-hidden h-[30px] rounded-md bg-amber-300 dark:bg-amber-700'>{tag}</span>
      ))}</div>
      <Link to={`/collections/${data.author._id}`}>
        <h1 className='ml-[20px] pt-[10px] text-[20px] dark:text-zinc-300 text-zinc-800 select-none flex items-center gap-[10px] mt-[5px]'><FaUserCircle /> <span className='underline'>{data.author.name} <span className='text-[14px]'>(view all)</span></span></h1>
      </Link>

        {
          data.isFree ? (
            <button onClick={handleDownloadFree} className='absolute bottom-[20px] mx-[20px] h-[40px] rounded-md shadow-md w-[calc(100%_-_40px)] bg-emerald-500 text-[22px] text-white font-[500] flex items-center justify-center gap-[10px]'>{
              isDownloading ? (<>Downloading... <BiLoaderAlt className='animate-spin' /></>) : (<>Download <FaDownload /></>)
            }</button>              
          ) : (
            <button className='absolute bottom-[20px] mx-[20px] h-[40px] rounded-md shadow-md w-[calc(100%_-_40px)] bg-emerald-500 text-[22px] text-white font-[500] flex items-center justify-center gap-[10px]'>Buy Now <FaDownload /> </button>              
          )
        }

    </div>
  )
}

export default ImageInfo