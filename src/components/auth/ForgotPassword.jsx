import React, { useEffect, useState } from 'react'
import { BiLogIn } from 'react-icons/bi'
import { MdEmail } from 'react-icons/md'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { isAuthenticated } from '../../utils/LS_Helper'
import {requestForgotPasswordLink} from './helper/authApiCalls'

const ForgotPassword = () => {
    const [email,setEmail] = useState('')

    const [helpers,setHelpers] = useState({
        isDisabled: true,
        isLoading: false,
        validationError: ''
    })

    const {user,token} = isAuthenticated()

    const handleSubmit = e => {
        e.preventDefault()
        setHelpers({...helpers,validationError: '',isLoading: true,isDisabled: true})
        requestForgotPasswordLink({email: email}).then(response=>{
            if(response?.response?.data?.error){
                setHelpers({...helpers,validationError: '',isLoading: false,isDisabled: false})
                return toast.error(response?.response?.data?.error,{theme: 'colored'})
            }else if(response.name === "AxiosError"){
                setHelpers({...helpers,validationError: '',isLoading: false,isDisabled: false})
                return toast.error("Something went wrong.Try again.",{theme: 'colored'})
            }
            console.log(response);
            toast.success("Check email. Reset link sent.")
            setHelpers({...helpers,validationError: '',isLoading: false,isDisabled: false})
        })
    }

    useEffect(()=>{
        if(email !== ''){
            setHelpers({...helpers,isDisabled: false})
        }
    },[email])

  return (
    <div className='w-screen h-[calc(100vh_-_70px)] flex items-center justify-center fixed left-0 top-[70px]'>
        {
            user && token && (<Navigate to="/" />)
        }
        <div className='w-[400px] min-h-[200px] max-h-max px-[10px] pt-[10px] pb-[20px] rounded bg-zinc-100 border-[1px] dark:border-0 border-zinc-400 dark:bg-zinc-900'>
            <h1 className='text-[30px] dark:text-zinc-100 font-[500]'>Forgot Password</h1>
            <hr className='border-0 h-[1px] bg-zinc-400 mt-[5px]' />

            <form className='w-[100%] flex flex-col h-max'>
                <label htmlFor="email" className='w-[100%] mx-auto mt-[15px] text-[20px] text-zinc-800 dark:text-zinc-300'>Email</label>
                <span className='relative top-0 mx-auto w-[100%]'>
                    <input value={email} onChange={e=>setEmail(e.target.value)} type="email" name="email" id="email" placeholder='User email...' className='w-[100%] h-[30px] indent-[35px] outline-0 mx-auto mt-[5px] border-[1px] border-zinc-400 rounded' />
                    <MdEmail className='absolute top-[10px] left-[3px] text-[22px]' />
                </span>
                <span className='text-red-400'>{helpers.validationError}</span>

                <button onClick={handleSubmit} disabled={helpers.isDisabled} type="submit" className='w-[100%] h-[40px] text-[22px] font-[500] text-zinc-100 mx-auto bg-emerald-600 rounded mt-[10px] flex items-center justify-center gap-[15px]'>{helpers.isLoading ? ('Loading....') : (<>Find <BiLogIn className='text-[28px]' /></>)}</button>
            </form>
        </div>
    </div>
  )
}

export default ForgotPassword