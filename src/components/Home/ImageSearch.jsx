import React, { useContext } from 'react'
import { searchImages } from '../Image/helper/imageApiCalls'
import {toast} from 'react-toastify'
import { SearchResultContext } from '../../context/SearchResultContext'

const ImageSearch = () => {
    const [images,setImages] = useContext(SearchResultContext)

    const handleSearch = e => {
        e.preventDefault()
        if(e.target.value !== ''){
            searchImages(e.target.value).then(response => {
                if(response.name === "AxiosError"){
                    return toast.error("Something not right.Try again!")
                }else if (response?.response?.data?.error){
                    return toast.error(response?.response?.data?.error)
                }else if(response.data.data.length === 0){
                    setImages([404])
                }else{
                    setImages(response.data.data)
                }
            }).catch(e=> console.log(e))           
        }else{
            setImages([])
        }
    }
  return (
    <div className='w-[70vw] h-[70px] flex items-center justify-center'>
        <div className='w-[100%] mx-[30px] flex items-center justify-start relative top-0'>
            <form className='w-[100%] h-[40px]'>
                <input className='outline-none dark:bg-zinc-200 border-zinc-400 border-[1px] w-[100%] h-[40px] text-zinc-800 font-[500] rounded indent-2' type="text" name="search" placeholder='Search images. Ex. Nature ...' onChange={handleSearch} />
            </form>
        </div>
    </div>
  )
}

export default ImageSearch