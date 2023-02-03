import React, { useEffect, useState } from 'react'
import { BiLogIn } from 'react-icons/bi'
import { ImImage } from 'react-icons/im'
import { MdEmail, MdPassword } from 'react-icons/md'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { authenticate, isAuthenticated } from '../../utils/LS_Helper'
import {signUp} from './helper/authApiCalls'

const SignUpForm = () => {
    const [inputs,setInputs] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        profilePicture: '',
        accountType: 'User',
        role: 0,
        formData: new FormData()
    })

    const [previewUrl,setPreviewUrl] = useState('')

    const [isSeller,setIsSeller] = useState(false)

    const [helpers,setHelpers] = useState({
        isDisabled: true,
        isLoading: false,
        isRedirect: false,
        validationError: ''
    })

    const {email,password,name,confirmPassword,formData} = inputs
    const {user,token} = isAuthenticated()

    const handleChange = field => e => {
          const value = field === "profilePicture" ? e.target.files[0] : e.target.value
          setInputs({...inputs,[field]: value})
          formData.set(field,value)      
          
          if(field === "profilePicture"){
            const url = URL.createObjectURL(e.target.files[0])
            setPreviewUrl(url)
          }
    }

    const handleSubmit = e => {
        e.preventDefault()
        
        setHelpers({...helpers,validationError: '',isLoading: true,isDisabled: true})
        if(!validate()){
          setHelpers({...helpers,validationError: '',isLoading: false,isDisabled: false})
          return false
        }

        if(isSeller){
          setInputs({...inputs,accountType: 'Creator',role: 2})
          formData.set("accountType",'Creator')
          formData.set("role",2)
        }

        signUp(formData).then(response => {
            if(response?.response?.data?.error){
                setHelpers({...helpers,validationError: '',isLoading: false,isDisabled: false})
                return toast.error(response?.response?.data?.error,{theme: 'colored'})
            }else if(response.name === "AxiosError"){
                setHelpers({...helpers,validationError: '',isLoading: false,isDisabled: false})
                return toast.error("Something went wrong. Try again.",{theme: 'colored'})
            }else{
                authenticate(response.data)   
                setHelpers({...helpers,validationError: '',isLoading: false,isRedirect: true})
                return toast.success("Signed up. Redirecting...",{theme: 'colored'})
            }
        }).catch(err => {
            setHelpers({...helpers,validationError: '',isLoading: false,isDisabled: false})
            console.log(err);
        })
    }

    const validate = () => {
        if(name === '' || email === '' || password === '' || confirmPassword === ""){
          setHelpers({...helpers,validationError: "All fields are required!"})
          return false
        }

        if(password.length < 8){
            setHelpers({...helpers,validationError: "Password must be 8 characters"})
            return false
        }else if(!/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)){
            setHelpers({...helpers,validationError: "Password must have a special character"})
            return false
        }else if(!/\d/.test(password)){
            setHelpers({...helpers,validationError: "Password must have a number"})
            return false
        }else if(!/[A-Z]/.test(password)){
            setHelpers({...helpers,validationError: "Password must have a uppercase letter"})
            return false
        }else if(!/[a-z]/.test(password)){
            setHelpers({...helpers,validationError: "Password must have a lowercase letter"})
            return false
        }else if(password !== confirmPassword){
          setHelpers({...helpers,validationError: "Passwords did not matched"})
          return false
        }else{
            return true
        }
    }

    useEffect(()=>{
        if(email !== '' && password !== ''){
            setHelpers({...helpers,isDisabled: false})
        }
    },[inputs])

  return (
    <div className='w-screen h-[calc(100vh_-_70px)] flex items-center justify-center fixed left-0 top-[70px]'>
        {
            helpers.isRedirect && (<Navigate to="/login/in" />)
        }
        {
            user && token && (<Navigate to="/" />)
        }
        <div className='w-[400px] min-h-[200px] max-h-max px-[10px] pt-[10px] pb-[20px] rounded bg-zinc-100 border-[1px] dark:border-0 border-zinc-400 dark:bg-zinc-900'>
            <h1 className='text-[30px] dark:text-zinc-100 font-[500]'>Join us</h1>
            <hr className='border-0 h-[1px] bg-zinc-400 mt-[5px]' />

            <form className='w-[100%] flex flex-col h-max'>
                <label htmlFor="name" className='w-[100%] mx-auto mt-[5px] text-[20px] text-zinc-800 dark:text-zinc-300'>Name</label>
                <span className='relative top-0 mx-auto w-[100%]'>
                    <input value={name} onChange={e=>handleChange("name")(e)} type="text" name="name" id="name" placeholder='User fullname...' className='w-[100%] h-[30px] indent-[35px] outline-0 mx-auto mt-[5px] border-[1px] border-zinc-400 rounded' />
                    <MdEmail className='absolute top-[10px] left-[3px] text-[22px]' />
                </span>

                <label htmlFor="email" className='w-[100%] mx-auto mt-[5px] text-[20px] text-zinc-800 dark:text-zinc-300'>Email</label>
                <span className='relative top-0 mx-auto w-[100%]'>
                    <input value={email} onChange={e=>handleChange("email")(e)} type="email" name="email" id="email" placeholder='User email...' className='w-[100%] h-[30px] indent-[35px] outline-0 mx-auto mt-[5px] border-[1px] border-zinc-400 rounded' />
                    <MdEmail className='absolute top-[10px] left-[3px] text-[22px]' />
                </span>

                <label htmlFor="password" className='w-[100%] mx-auto mt-[5px] text-[20px] text-zinc-800 dark:text-zinc-300'>Password</label>
                <span className='relative top-0 mx-auto w-[100%]'>
                    <input value={password} onChange={e=>handleChange("password")(e)} type="password" name="password" id="password" placeholder='User password...' className='w-[100%] h-[30px] indent-[35px] outline-0 mx-auto mt-[5px] border-[1px] border-zinc-400 rounded' />
                    <MdPassword className='absolute top-[10px] left-[5px] text-[22px]' />
                </span>

                <label htmlFor="confirmPassword" className='w-[100%] mx-auto mt-[5px] text-[20px] text-zinc-800 dark:text-zinc-300'>Confirm Password</label>
                <span className='relative top-0 mx-auto w-[100%]'>
                    <input value={confirmPassword} onChange={e=>handleChange("confirmPassword")(e)} type="text" name="confirmPassword" id="confirmPassword" placeholder='Re-enter password...' className='w-[100%] h-[30px] indent-[35px] outline-0 mx-auto mt-[5px] border-[1px] border-zinc-400 rounded' />
                    <MdPassword className='absolute top-[10px] left-[5px] text-[22px]' />
                </span>

                <label htmlFor="profilePic" className='w-[100%] mx-auto mt-[5px] text-[20px] text-zinc-800 dark:text-zinc-300'>Profile Picture</label>
                <span className='relative top-0 mx-auto w-[100%]'>
                  <ImImage className='absolute top-[12px] left-[7px] text-[18px] z-10' />
                  <div className='border-[1px] border-zinc-400 absolute top-0 left-0 w-[100%] h-[70px] rounded dark:bg-white'>
                    <h2 id='imageTitleText' className='ml-[35px] mt-[5px]'>Click here to select picture</h2>
                    <img alt="Profile Picture" className='w-[70px] h-[68px] object-cover absolute top-0 right-0 rounded bg-zinc-400' src={previewUrl} />
                  </div>
                  <input onChange={e=>handleChange("profilePicture")(e)} type="file" multiples='false' name="profilePic" id="profilePic" className='w-[100%] cursor-pointer z-50 opacity-0 h-[30px] indent-[35px] outline-0 mx-auto mt-[5px] border-[1px] border-zinc-400 rounded' />
                </span>

                <span className='text-zinc-900 dark:text-zinc-100 font-[500] text-[20px] mt-[40px]'>
                  <input onChange={e=>setIsSeller(e.target.checked)} className='w-[15px] h-[15px]' type="checkbox" name="isSeller" id="isSeller" /> I want to sell.
                </span>

                <span className='text-red-400'>{helpers.validationError}</span>

                <button onClick={handleSubmit} disabled={helpers.isDisabled} type="submit" className='w-[100%] h-[40px] text-[22px] font-[500] text-zinc-100 mx-auto bg-emerald-600 rounded mt-[10px] flex items-center justify-center gap-[15px]'>{helpers.isLoading ? ('Loading....') : (<>Sign In <BiLogIn className='text-[28px]' /></>)}</button>
            </form>
        </div>
    </div>
  )
}

export default SignUpForm