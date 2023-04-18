import React, { useState, useEffect }from 'react'
import { useParams } from 'react-router-dom'
import { getSingleOrder } from './helper/userApiCalls'
import { isAuthenticated } from '../../utils/LS_Helper'
import { toast } from 'react-toastify'
import Header from '../base/Header'
import OrderDetails from './OrderDetails'
import PaymentInfo from './PaymentInfo'

const Order = () => {
    const [orderInfo,setOrderInfo] = useState(undefined)
    const {orderId} = useParams()
    const {user,token} = isAuthenticated()
    useEffect(()=>{
        getSingleOrder(user._id,token,orderId).then(data => {
            if(data?.response?.data?.error){
                return toast.error(data?.response?.data?.error)
            }else if(data.name === "AxiosError"){
                return toast.error("Faild to load order information.Try again!")
            }
            console.log(data.data)
            setOrderInfo(data.data)
        })
    },[])
  return (
    <div>
        <Header currentLocation={"collection"} />
        { orderInfo && orderInfo.customer === user._id ? (
            <div className='w-screen h-[calc(100vh_-_70px)] mt-[70px] py-[10px] sm:py-[30px] px-[10px] sm:px-[30px] flex flex-col md:flex-row gap-[20px]'>
                <OrderDetails order={orderInfo} />
                <PaymentInfo order={orderInfo} />
            </div>
        ) : ("AND YOU ARE NOT AUTHORIZED MAN!")}
    </div>
  )
}

export default Order