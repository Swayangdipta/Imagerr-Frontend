import React, { useState, useEffect } from 'react'
import {HiMagnifyingGlassCircle} from 'react-icons/hi2'
import {FaArrowLeft} from 'react-icons/fa'
import ResultItem from './ResultItem'
import { searchUser } from './helper/adminApiCalls'
import { isAuthenticated } from '../../utils/LS_Helper'
import { toast } from 'react-toastify'
import { searchImages } from '../Image/helper/imageApiCalls'
const Search = ({type,setIsSearchOpen = f=>f}) => {
    const [results,setResults] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [query,setQuery] = useState('')
    const {user,token} = isAuthenticated()

    const handleSubmit = e =>{
        e.preventDefault()
        setResults([])
        setIsLoading(true)
        if(type === "users"){
            if(query !== ''){
                searchUser(user._id,token,query).then(response => {
                    if(response?.response?.data?.error){
                        setIsLoading(false)
                        return toast.error(response?.response?.data?.error,{theme: 'colored'})
                    }else if(response.name === "AxiosError"){
                        setIsLoading(false)
                        return toast.error("Something went wrong. Try again.",{theme: 'colored'})
                    }
                    setIsLoading(false)
                    setResults(response.data.data)
                }).catch(err => {
                    setIsLoading(false)
                    return toast.error("Something went wrong. Try again.",{theme: 'colored'})
                })                
            }
        }else if(type === "products"){
            if(query !== ''){
                searchImages(query).then(response => {
                    if(response.name === "AxiosError"){
                        setIsLoading(false)
                        return toast.error("Something not right.Try again!")
                    }else if (response?.response?.data?.error){
                        setIsLoading(false)
                        return toast.error(response?.response?.data?.error)
                    }else if(response.data.data.length === 0){
                        setIsLoading(false)
                        return toast.error("No images found!")
                    }else{
                        setIsLoading(false)
                        setResults(response.data.data)
                    }
                }).catch(err=> {
                    console.log(err);
                    setIsLoading(false)
                })           
            }
        }
    }

  return (
    <div className='w-screen h-screen fixed top-0 left-0 z-[1000] bg-[#eee] dark:bg-[#222]'>

        <div onClick={e=>setIsSearchOpen(false)} className='rounded-md fixed top-[15px] left-[5%] p-[10px] bg-zinc-400 dark:bg-black flex items-center gap-[10px] text-zinc-900 dark:text-zinc-100 cursor-pointer shadow-lg hover:shadow-none'>
            <FaArrowLeft />
            <h1>Go back</h1>
        </div>

        <form onSubmit={handleSubmit} className='w-[90%] h-[40px] relative top-0 mt-[70px] mx-auto'>
            <input onChange={e=>setQuery(e.target.value)} className='w-full h-full rounded-full outline-0 border-0 shadow-lg indent-14' type="text" placeholder='Enter your query...id,name,email,title' />
            <HiMagnifyingGlassCircle className='absolute top-0 left-0 text-[40px]' />
        </form>
    
        {/* Search Results */}
        <div className='w-[90%] h-[calc(100vh_-_160px)] overflow-y-scroll mt-[30px] mx-auto'>
             {
                isLoading ? (<h1 className='text-[40px] text-center dark:text-zinc-500 select-none'>Loading...</h1>) : results.length === 0 && (<h1 className='text-[40px] text-center dark:text-zinc-500 select-none'>No results...</h1>)
             }
             {
                results.length > 0 && results.map((item,index)=>(
                    <ResultItem item={item} type={type} key={index} count={index} />
                ))
             }
        </div>
    </div>
  )
}

export default Search