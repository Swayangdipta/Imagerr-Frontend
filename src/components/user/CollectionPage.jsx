import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { isAuthenticated } from '../../utils/LS_Helper'
import Header from '../base/Header'
import ImageCard from '../Image/ImageCard'
import { getUser } from './helper/userApiCalls'

const CollectionPage = () => {
    const [userDetails,setUserDetails] = useState(undefined)
    const {user,token} = isAuthenticated()
    useEffect(()=>{
        if(user){
            getUser(user._id,token).then(data=>{
                if(data?.response?.data?.error){
                    toast.error(data?.response?.data?.error,{theme: 'colored'})
                    return false
                }else if(data.name === "AxiosError"){
                    toast.error("Something went wrong!",{theme: 'colored'})
                    return false      
                }

                setUserDetails(data.data)
            })          
        }

    },[])

  return (
    <div>
        <Header currentLocation="collection" />
        <h1 className='fixed z-[40] bg-white dark:bg-zinc-800 top-[70px] left-0 w-[100vw] h-max pb-2 select-none indent-[30px] text-[40px] font-[500] text-zinc-900 dark:text-zinc-100'>My Collection</h1>
        <div className='w-[calc(100vw_-_60px)] flex flex-wrap gap-[10px] h-max pt-[20px] pb-[30px] relative top-[150px] mx-auto'>
            {
                userDetails && userDetails.collections.length > 0 
                    ? userDetails.collections.map((elem,index)=>(
                        <ImageCard image={elem} key={index} />
                    )) : (
                        <h1 className='text-[30px] text-zinc-600 dark:text-zinc-600'>Loading...</h1>
                    )
            }
        </div>
    </div>
  )
}

export default CollectionPage