import { Cloudinary } from '@cloudinary/url-gen'
import { thumbnail } from '@cloudinary/url-gen/actions/resize'
import React from 'react'
import {BsPencil} from 'react-icons/bs'
import {ImBin} from 'react-icons/im'

const ResultItem = ({item,type,count}) => {
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
                        <BsPencil className='p-[7px] rounded bg-sky-500 text-[30px] cursor-pointer' />
                        <ImBin className='p-[7px] rounded bg-rose-500 text-[30px] text-white cursor-pointer' />
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
                        <BsPencil className='p-[7px] rounded bg-sky-500 text-[30px] cursor-pointer' />
                        <ImBin className='p-[7px] rounded bg-rose-500 text-[30px] text-white cursor-pointer' />
                    </div>
                </>
            )

        }

    </div>
  )
}

export default ResultItem