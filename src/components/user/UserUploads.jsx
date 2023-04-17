import React, { useEffect, useState } from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import ImageCard from '../Image/ImageCard'
import { getSingleOrder } from './helper/userApiCalls'
import { isAuthenticated } from '../../utils/LS_Helper'
import { toast } from 'react-toastify'

const UserUploads = ({data,type="def"}) => {
    const [isExpanded,setIsExpanded] = useState(true)
    const [purchases,setPurchases] = useState([])
    const {user,token} = isAuthenticated()
    useEffect(()=>{
        if (type === "purchases" && token) {
            data.forEach(element => {
                getSingleOrder(user._id,token,element).then(dataa=>{
                    if(dataa?.response?.data?.error){
                        return toast.error(data?.response?.data?.error)
                    }else if(dataa.name === "AxiosError"){
                        console.log(dataa);
                        return toast.error("Faild to load purchase.")
                    }

                    setPurchases(prev=>[...prev,dataa])
                })
            });
        }
    },[token])
  return (
    <div className='w-screen mb-[10px] overflow-x-hidden'>
        <div className='select-none w-[90%] h-[50px] text-[24px] font-[500] mx-auto flex items-center justify-between rounded-t-md dark:bg-zinc-900 bg-zinc-100 border dark:border-0 border-zinc-400 text-zinc-900 dark:text-zinc-100'>
            {
                type === "def" ?  (
                    <h1 className='ml-[30px]'>My Uploads</h1>
                ) : type === "purchases" ? (
                    <h1 className='ml-[30px]'>Purchases</h1>
                ) : ''
            }
            {
                isExpanded ? (<MdKeyboardArrowUp onClick={e=>setIsExpanded(false)} className='cursor-pointer text-[40px] mr-[20px]' />) : (<MdKeyboardArrowDown onClick={e=>setIsExpanded(true)} className='cursor-pointer text-[40px] mr-[20px]' />)
            }
        </div>
        <div className={`select-none w-[90vw] px-[20px] overflow-x-hidden  ${isExpanded ? ('h-max py-[30px] border') : ('h-0 border-0 hidden ')} font-[500] mx-auto flex flex-wrap items-start gap-[10px] gap-x-auto gap-y-[10px] rounded-b-md dark:bg-zinc-700 border dark:border-0 border-zinc-400`}>
            {
                data.length > 0 && type === "def" ? data.map((element,index)=>(
                    (<ImageCard image={element} key={index} />)
                )) : data.length > 0 && type === "purchases" ? (
                    purchases.length > 0 ? purchases.map((purchase,index)=>(
                        (<ImageCard type={type} image={purchase} key={index} />)
                    )) : (
                        <h1 className='text-center text-zinc-600 dark:text-700 ml-[30px]'>Faild to load your purchases.Reload webpage!</h1>
                    )
                ) : data.length === 0 && type === "def" ? (
                    <h1 className='text-center text-zinc-600 dark:text-700 ml-[30px]'>Upload some asset to view</h1>
                ) : data.length === 0 && type === "purchases" && (
                    <h1 className='text-center text-zinc-600 dark:text-700 ml-[30px]'>No purchases found</h1>
                )
            }
        </div>
    </div>
  )
}

export default UserUploads