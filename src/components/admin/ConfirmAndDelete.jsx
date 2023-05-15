import React, { useState } from 'react'
import { isAuthenticated } from '../../utils/LS_Helper'
import { deleteProductByAdmin, deleteUserByAdmin } from './helper/adminApiCalls'
import { toast } from 'react-toastify'

const ConfirmAndDelete = ({type,item,setIsConfirmOpen = f=>f}) => {
    const [helpers,setHelpers] = useState({
        isDisabled: true,
        isLoading: false,
        isRedirect: false,
        validationError: ''
    })
    const {user,token} = isAuthenticated()

    const handleDelete = e => {
        e.preventDefault()
        setHelpers({...helpers,isLoading: true})
        if(type === "users"){
            deleteUserByAdmin(item._id,user._id,token).then(response => {
                console.log(response);
                if(response?.response?.data?.error){
                    setHelpers({...helpers,validationError: '',isLoading: false,isDisabled: false})
                    return toast.error(response?.response?.data?.error,{theme: 'colored'})
                }else if(response.name === "AxiosError"){
                    setHelpers({...helpers,validationError: '',isLoading: false,isDisabled: false})
                    setIsConfirmOpen(false)
                    return toast.error("Refresh the page please.",{theme: 'colored'})
                }else{ 
                    setHelpers({...helpers,validationError: '',isLoading: false,isRedirect: false})
                    setIsConfirmOpen(false)
                    return toast.success("User removed",{theme: 'colored'})
                }
            })            
        }else{
            deleteProductByAdmin(item._id,item.author._id,user._id,token).then(response => {
                console.log(response);
                if(response?.response?.data?.error){
                    setHelpers({...helpers,validationError: '',isLoading: false,isDisabled: false})
                    return toast.error(response?.response?.data?.error,{theme: 'colored'})
                }else if(response.name === "AxiosError"){
                    setHelpers({...helpers,validationError: '',isLoading: false,isDisabled: false})
                    return toast.error("Something went wrong. Try again.",{theme: 'colored'})
                }else{ 
                    setHelpers({...helpers,validationError: '',isLoading: false,isRedirect: false})
                    setIsConfirmOpen(false)
                    return toast.success("Product removed",{theme: 'colored'})
                }
            })  
        }

    }

  return (
    <div className='z-[200000] w-screen h-screen fixed top-0 left-0 flex items-center justify-center'>
        <div className='w-[300px] h-[250px] rounded-md bg-red-700 p-4 relative top-0'>
            <div className='text-center'>
                <h1 className='text-[30px] font-[500] text-white'>Are you sure?</h1>
                <h2 className='text-[18px] text-white'>Remove this {type === 'users' ? "user" : "product"} :</h2>
                <h2 className='text-[20px] font-[500] text-white'>{type === "users" ? (item.name) : (item.title) }</h2>
                <h2 className='text-[17px] font-[500] text-white'>Id: {item._id}</h2>
            </div>

            <div className='absolute bottom-[5%] left-[5%] w-[90%] flex justify-between gap-[10px]'>
                <div onClick={e=>setIsConfirmOpen(false)} className='bg-emerald-500 h-[40px] w-full cursor-pointer rounded shadow-lg hover:shadow-none flex items-center justify-center text-white font-[500]'>
                    Cancel
                </div>
                {
                    helpers.isLoading ? (
                    <div className='bg-rose-500 h-[40px] w-full cursor-pointer rounded shadow-lg hover:shadow-none flex items-center justify-center text-white font-[500]'>
                        Removing...
                    </div>
                    ) : (
                    <div onClick={handleDelete} className='bg-rose-500 h-[40px] w-full cursor-pointer rounded shadow-lg hover:shadow-none flex items-center justify-center text-white font-[500]'>
                        Remove
                    </div>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default ConfirmAndDelete