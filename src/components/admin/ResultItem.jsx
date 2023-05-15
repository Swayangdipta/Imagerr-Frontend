import { Cloudinary } from '@cloudinary/url-gen'
import { thumbnail } from '@cloudinary/url-gen/actions/resize'
import React, { useState } from 'react'
import {BsPencil} from 'react-icons/bs'
import {ImBin} from 'react-icons/im'
import AddUserForm from './AddUserForm'
import UploadForm from '../Home/UploadForm'
import { FaArrowLeft } from 'react-icons/fa'
import ConfirmAndDelete from './ConfirmAndDelete'

const ResultItem = ({item,type,count}) => {
    const [isEditOpen,setIsEditOpen] = useState(false)
    const [isConfirmOpen,setIsConfirmOpen] = useState(false)
  return (
    <div className='w-full p-[10px] h-[70px] mx-auto mt-[20px] bg-zinc-100 border border-zinc-400 dark:border-0 dark:bg-black rounded-md relative top-0 flex justify-between items-center'>
        <div className='absolute top-[2px] left-[5px] text-zinc-500 dark:text-zinc-500'>#{count + 1}</div>
        
        {
            type === "users" ? (
                <>
                    <h1 className='dark:text-zinc-200 text-zinc-800'>{item.name}</h1>
                    <hr className='w-[1px] h-[90%] border-0 dark:bg-zinc-700 bg-zinc-600' />
                    <div>
                        <h1 className='dark:text-zinc-200 text-zinc-800'>{item.email}</h1>
                        <h1 className='dark:text-zinc-200 text-zinc-800'>{item._id}</h1>
                    </div>
                    <hr className='w-[1px] h-[90%] border-0 dark:bg-zinc-700 bg-zinc-600' />
                    <div>
                        <h1 className='dark:text-zinc-200 text-zinc-800'>{item.accountType}</h1>
                        <h1 className='dark:text-zinc-200 text-zinc-800'>Role: {item.role}</h1>
                    </div>
                    <hr className='w-[1px] h-[90%] border-0 dark:bg-zinc-700 bg-zinc-600' />
                    <div className='flex gap-[10px]'>
                        <BsPencil onClick={e => setIsEditOpen(true)} className='p-[7px] rounded bg-sky-500 text-[30px] cursor-pointer' />
                        <ImBin onClick={e => setIsConfirmOpen(true)} className='p-[7px] rounded bg-rose-500 text-[30px] text-white cursor-pointer' />
                    </div>
                </>                
            ) : type === "products" && (
                <>
                    <img className='w-[106px] h-[60px] cover' src={`https://res.cloudinary.com/swayangdipta/image/upload/q_auto/w_106,h_60/${item.images.thumbId}`} />
                    <hr className='w-[1px] h-[90%] border-0 dark:bg-zinc-700 bg-zinc-600' />
                    <div>
                        <h1 className='dark:text-zinc-200 text-zinc-800'>{item.title}</h1>
                    </div>
                    <hr className='w-[1px] h-[90%] border-0 dark:bg-zinc-700 bg-zinc-600' />
                    <div>
                        <h1 className='dark:text-zinc-200 text-zinc-800'>{item._id}</h1>
                        <h1 className='dark:text-zinc-200 text-zinc-800'>RS: {item.price}</h1>
                    </div>
                    <hr className='w-[1px] h-[90%] border-0 dark:bg-zinc-700 bg-zinc-600' />
                    <div className='flex gap-[10px]'>
                        <BsPencil onClick={e => setIsEditOpen(true)} className='p-[7px] rounded bg-sky-500 text-[30px] cursor-pointer' />
                        <ImBin onClick={e => setIsConfirmOpen(true)} className='p-[7px] rounded bg-rose-500 text-[30px] text-white cursor-pointer' />
                    </div>
                </>
            )

        }
        {
            isEditOpen && type === "users" ? (<div className='w-screen h-screen fixed top-0 left-0 z-[1000] bg-[#eee] dark:bg-[#222]'>
            <div onClick={e=>setIsEditOpen(false)} className='rounded-md z-[1000000] fixed top-[30px] left-[5%] p-[10px] bg-zinc-400 dark:bg-black flex items-center gap-[10px] text-zinc-900 dark:text-zinc-100 cursor-pointer shadow-lg hover:shadow-none'>
              <FaArrowLeft />
              <h1>Go back</h1>
            </div>
            <AddUserForm location='profile' type="update" userData={item} />
          </div>) 
            : isEditOpen && type === "products" && (<UploadForm />)
        }
        {
            isConfirmOpen && (<ConfirmAndDelete type={type} item={item} setIsConfirmOpen={setIsConfirmOpen} />)
        }
    </div>
  )
}

export default ResultItem