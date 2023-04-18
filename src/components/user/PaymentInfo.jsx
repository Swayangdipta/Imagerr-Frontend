import React from 'react'

const PaymentInfo = ({order}) => {
  return (
    <div className='w-full min-h-[50%] h-max bg-zinc-100 dark:bg-zinc-900 rounded border dark:border-0 border-zinc-400 p-[10px] select-none'>
        <h1 className='text-[28px] text-zinc-900 dark:text-zinc-300'>Payment Information</h1>
        <hr className='w-full border-0 bg-zinc-300 dark:bg-zinc-500 h-[1px] mt-[3px]' />

        <span className="flex gap-2 mt-[20px] items-center">
            <h3 className='text-emerald-500 font-[500] dark:font-[400] dark:text-amber-300 text-[18px]'>Transaction ID : </h3>
            <h3 className='dark:text-zinc-300 select-text'>{order.transaction_id}</h3>
        </span>

        <span className="flex gap-2 mt-[20px] items-center">
            <h3 className='text-emerald-500 font-[500] dark:font-[400] dark:text-amber-300 text-[18px]'>Total Amount : </h3>
            <h3 className='dark:text-zinc-300 select-text'>RS. {order.total_amount}</h3>
        </span>

        <span className="flex gap-2 mt-[20px] items-center">
            <h3 className='text-emerald-500 font-[500] dark:font-[400] dark:text-amber-300 text-[18px]'>Payment Method : </h3>
            <h3 className='dark:text-zinc-300 select-text'>{order.payment_method}</h3>
        </span>

        <span className="flex gap-2 mt-[20px] items-center">
            <h3 className='text-emerald-500 font-[500] dark:font-[400] dark:text-amber-300 text-[18px]'>Payment Status : </h3>
            <span className='flex items-center gap-2'>
                <div className={`w-[15px] h-[15px] rounded-full animate-pulse 
                ${order.payment_status === "COMPLETED" ? ("bg-emerald-400") 
                : order.payment_status === "PROCESSING" ? ("bg-amber-400") 
                : order.payment_status === "FAILED" && ("bg-red-400")
              }
                `}></div>
            <h3 className='dark:text-zinc-300'>{order.payment_status}</h3>
            </span>
        </span>
    </div>
  )
}

export default PaymentInfo