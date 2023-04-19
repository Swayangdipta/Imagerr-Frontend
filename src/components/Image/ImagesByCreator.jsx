import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { getImagesByCreator } from './helper/imageApiCalls'
import { toast } from 'react-toastify'
import Header from '../base/Header'
import ImageCard from './ImageCard'

const ImagesByCreator = () => {
    const {userId} = useParams()
    const [creatorInfo,setCreatorInfo] = useState(undefined)
    useEffect(()=>{
        if(typeof userId === "string"){
            getImagesByCreator(userId).then(data => {
                if(data?.response?.data?.error){
                    return toast.error(data?.response?.data?.error,{theme: 'colored'})
                  }else if(data.name === "AxiosError"){
                    return toast.error("Something went wrong!",{theme: 'colored'})
                  }

                  console.log(data.data);
          
                  setCreatorInfo(data.data)
            })
        }
    },[])
  return (
    <div>
        <Header currentLocation="collection" />
        {
            creatorInfo && (
                <div className='w-screen mt-[70px] p-[30px] py-[15px] bg-zinc-300 dark:bg-zinc-800 text-[22px] select-none font-[500] dark:text-zinc-300'>Images by {creatorInfo.name}</div>
            )
        }
        <div className='w-screen min-h-[calc(100vh_-_70px)] h-max p-[30px] pt-[15px] flex flex-wrap gap-[20px]'>
            {
                creatorInfo && creatorInfo.images.map((image,index) => (
                    <ImageCard image={image} key={index} />
                ))
            }
        </div>
    </div>
  )
}

export default ImagesByCreator