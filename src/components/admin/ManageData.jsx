import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import Header from '../base/Header'
import Search from './Search'
import { getAllImages, getAllUsers } from './helper/adminApiCalls'
import { isAuthenticated } from '../../utils/LS_Helper'
import { toast } from 'react-toastify'
import ResultItem from './ResultItem'
import UploadForm from '../Home/UploadForm'
import AddUserForm from './AddUserForm'
import { FaArrowLeft } from 'react-icons/fa'

const ManageData = () => {
    const [results,setResults] = useState([])
    const [isSearchOpen,setIsSearchOpen] = useState(false)
    const [isAddOpen,setIsAddOpen] = useState(false)
    const {type} = useParams()
    const {user,token} = isAuthenticated()

    const getUser = () => {
      getAllUsers(user._id,token).then(response => {
        if(response?.response?.data?.error){
          return toast.error(response?.response?.data?.error,{theme: 'colored'})
        }else if(response.name === "AxiosError"){
            return toast.error("Something went wrong. Try again.",{theme: 'colored'})
        }

        setResults(response.data)

      }).catch(e => {
        console.log(e);
        return toast.error("Something went wrong. Try again.",{theme: 'colored'})
      })
    }

    const getImages = () => {
      getAllImages(user._id,token).then(response => {
        if(response?.response?.data?.error){
          return toast.error(response?.response?.data?.error,{theme: 'colored'})
        }else if(response.name === "AxiosError"){
            return toast.error("Something went wrong. Try again.",{theme: 'colored'})
        }

        setResults(response.data)
      }).catch(e => {
        console.log(e);
        return toast.error("Something went wrong. Try again.",{theme: 'colored'})
      })
    }

    useEffect(()=>{
        if(type === "users"){
          getUser()
        }else if(type === "products"){
          getImages()
        }
    },[])
  return (
    <div>
      <Header currentLocation="profile" />

      <div className='w-[90%] h-max mx-auto mt-[100px] flex justify-start items-center flex-wrap gap-[30px]'>

        {
          type === "users" ? (
            <>
              <div onClick={e=>setIsAddOpen(true)} className='rounded shadow-lg hover:shadow-none cursor-pointer h-[60px] w-[120px] bg-zinc-100 border border-zinc-400 dark:border-0 dark:bg-zinc-900 flex justify-center items-center'>
                <h1 className='text-zinc-900 dark:text-zinc-300'>Add User</h1>
              </div>
              <div onClick={e=>setIsSearchOpen(true)} className='rounded shadow-lg hover:shadow-none cursor-pointer h-[60px] w-[120px] bg-zinc-100 border border-zinc-400 dark:border-0 dark:bg-zinc-900 flex justify-center items-center'>
                <h1 className='text-zinc-900 dark:text-zinc-300'>Search User</h1>
              </div>
            </>
          ) : (
            <>
            <div onClick={e=>setIsAddOpen(true)} className='rounded shadow-lg hover:shadow-none cursor-pointer h-[60px] w-[120px] bg-zinc-100 border border-zinc-400 dark:border-0 dark:bg-zinc-900 flex justify-center items-center'>
              <h1 className='text-zinc-900 dark:text-zinc-300'>Add Image</h1>
            </div>
            <div onClick={e=>setIsSearchOpen(true)} className='rounded shadow-lg hover:shadow-none cursor-pointer h-[60px] w-[120px] bg-zinc-100 border border-zinc-400 dark:border-0 dark:bg-zinc-900 flex justify-center items-center'>
              <h1 className='text-zinc-900 dark:text-zinc-300'>Search Image</h1>
            </div>
            </>
          )
        }

        {/* <Search type={type} /> */}
      </div>

      <div className='w-[90%] h-max pb-[30px] mx-auto mt-[30px]'>
        {/* Pagination will be added sometime in future */}
        <h1 className='text-[24px] dark:text-zinc-100 underline'>
          All {type.charAt(0).toUpperCase()+type.substring(1)}
        </h1>

        {
          results.length > 0 && results.map((item,index)=>(
            <ResultItem item={item} type={type} key={index} count={index} />
          ))
        }
      </div>
      {
        isSearchOpen && (<Search type={type} setIsSearchOpen={setIsSearchOpen} />)
      }
      {
        isAddOpen && type === "users" ? (<div className='w-screen h-screen fixed top-0 left-0 z-[1000] bg-[#eee] dark:bg-[#222]'>
          <div onClick={e=>setIsAddOpen(false)} className='rounded-md z-[1000000] fixed top-[30px] left-[5%] p-[10px] bg-zinc-400 dark:bg-black flex items-center gap-[10px] text-zinc-900 dark:text-zinc-100 cursor-pointer shadow-lg hover:shadow-none'>
            <FaArrowLeft />
            <h1>Go back</h1>
          </div>
          <AddUserForm location='profile' type="add" userData={null} />
        </div>) 
        : isAddOpen && type === "products" && (<UploadForm setIsFormOpen={setIsAddOpen} />)
      }
    </div>
  )
}

export default ManageData