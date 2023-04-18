import React, { useContext, useEffect } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {toast, ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import AuthPage from './components/auth/AuthPage';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import Home from './components/Home/Home';
import ExtendedImage from './components/Image/ExtendedImage';
import { getImages } from './components/Image/helper/imageApiCalls';
import CollectionPage from './components/user/CollectionPage';
import Profile from './components/user/Profile';
import { FilterContext } from './context/FilterContext';
import { ImageContext } from './context/ImageContext';
import Order from './components/user/Order';
const Routing = () => {
  const [filters,setFilters] = useContext(FilterContext)
  const [images,setImages] = useContext(ImageContext)

  useEffect(()=>{
    if(filters.theme === "dark"){
      document.documentElement.classList.add("dark")
      document.body.style.background = "#223"
    }else{
      document.documentElement.classList.remove('dark')
      document.body.style.background = "#fff"
    }
  },[filters.theme])

  useEffect(()=>{
      if(filters.sort === 'oldest'){
        let sorted = images.sort((a,b)=>{
          return new Date(a.createdAt)  - new Date(b.createdAt)
        })
        setImages(sorted)
      }else{
        let sorted = images.sort((a,b)=>{
          return new Date(b.createdAt)  - new Date(a.createdAt)
        })
        setImages(sorted)
      }
  },[filters.sort])

  useEffect(()=>{
    getImages(100).then(data=>{
      if(data?.response?.data?.error){
        return toast.error(data?.response?.data?.error,{theme: 'colored'})
      }else if(data.name === "AxiosError"){
        return toast.error("Faild to load images!",{theme: 'colored'})
      }

      setImages(data.data)
    })
  },[])
  return (
    <BrowserRouter>
    <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/asset/:id' element={<ExtendedImage />} />
        <Route path='/login/:type' element={<AuthPage />} />
        <Route path='/forgot' element={<ForgotPassword />} />
        <Route path='/password/reset/:resetToken' element={<ResetPassword />} />
        <Route path='/collections' element={<CollectionPage />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/order/:orderId' element={<Order />} />
      </Routes> 
    </BrowserRouter>
  )
}

export default Routing