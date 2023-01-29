import React, { useContext, useEffect } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import Home from './components/Home/Home';
import ExtendedImage from './components/Image/ExtendedImage';
import { FilterContext } from './context/FilterContext';
const Routing = () => {
  const [filters,setFilters] = useContext(FilterContext)
  useEffect(()=>{
    if(filters.theme === "dark"){
      document.documentElement.classList.add("dark")
      document.body.style.background = "#223"
    }else{
      document.documentElement.classList.remove('dark')
      document.body.style.background = "#fff"
    }
  },[filters.theme])
  return (
    <BrowserRouter>
    <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/asset/:id' element={<ExtendedImage />} />
      </Routes> 
    </BrowserRouter>
  )
}

export default Routing