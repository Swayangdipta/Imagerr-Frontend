import { AdvancedImage,lazyload } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen'
import {thumbnail} from "@cloudinary/url-gen/actions/resize"

import React from 'react'
import { Link } from 'react-router-dom'

const OrderDetails = ({order}) => {
    const cld = new Cloudinary({
        cloud: {
          cloudName: process.env.REACT_APP_CLDNAME
        }
      })

  return (
    <div className='w-full min-h-full h-max bg-zinc-100 dark:bg-zinc-900 rounded border dark:border-0 border-zinc-400 p-[10px] select-none'>
        <h1 className='text-[28px] text-zinc-900 dark:text-zinc-300'>Order Information</h1>
        <hr className='w-full border-0 bg-zinc-300 dark:bg-zinc-500 h-[1px] mt-[3px]' />
        
        <span className="flex gap-2 mt-[20px] items-center">
            <h3 className='text-emerald-500 font-[500] dark:font-[400] dark:text-amber-300 text-[18px]'>Order ID : </h3>
            <h3 className='dark:text-zinc-300 select-text'>{order._id}</h3>
        </span>

        <span className="flex gap-2 mt-[20px] items-center">
            <h3 className='text-emerald-500 font-[500] dark:font-[400] dark:text-amber-300 text-[18px]'>Date : </h3>
            <h3 className='dark:text-zinc-300'>{order.createdAt.substring(0,10)} / {order.createdAt.substring(11,16)}</h3>
        </span>

        <span className="flex gap-2 mt-[20px] items-center">
            <h3 className='text-emerald-500 font-[500] dark:font-[400] dark:text-amber-300 text-[18px]'>Order Status : </h3>
            <span className='flex items-center gap-2'>
                <div className={`w-[15px] h-[15px] rounded-full animate-pulse 
                ${order.order_status === "PLACED" ? ("bg-amber-400") : ("bg-emerald-400")}
                `}></div>
            <h3 className='dark:text-zinc-300'>{order.order_status}</h3>
            </span>
        </span>

        <h2 className='text-zinc-900 dark:text-zinc-300 text-[24px] mt-[20px] underline'>Images</h2>

        <div className='w-full h-max mt-[20px]'>
            {
                order.images.map((image,index)=>(
                    <Link to={`/asset/${image._id}`} key={index} >
                    <div className='flex gap-2 mb-4'>
                        <AdvancedImage className="h-[71px] w-[120px] object-cover rounded cursor-pointer" cldImg={
                                            cld.image(image.images.thumbId)
                                            .resize(thumbnail().width(120).height(71))
                                            .format("auto").quality("auto")
                        } plugins={[lazyload({rootMargin: '10px 20px 10px 30px', threshold: 0.25})]} />

                        <div className='h-[100px] flex flex-col'>
                            <h2 className='text-zinc-900 dark:text-zinc-300 h-[70px] overflow-hidden'>{image.title}</h2>
                            <h2 className='text-zinc-900 dark:text-zinc-300 h-[70px] overflow-hidden'>RS. {image.price}</h2>
                        </div>
                    </div>
                    </Link>
                ))
            }
        </div>
    </div>
  )
}

export default OrderDetails