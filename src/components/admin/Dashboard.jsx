import React, {useState,useEffect} from 'react'
import { Navigate, Link } from 'react-router-dom'
import { isAuthenticated } from '../../utils/LS_Helper'
import { getUser } from '../user/helper/userApiCalls'
import Header from '../base/Header'
import UserDetailsCard from '../user/UserDetailsCard'
import UserUploads from '../user/UserUploads'
import { toast } from 'react-toastify'

const Dashboard = () => {
  const [userInfo,setUserInfo] = useState(undefined)
  const {user,token} = isAuthenticated()

  useEffect(()=>{
      if(user){
          getUser(user._id,token).then(data=>{
              if(data?.response?.data?.error){
                  toast.error(data?.response?.data?.error,{theme: 'colored'})
                  return false
              }else if(data.name === "AxiosError"){
                  toast.error("Something went wrong!",{theme: 'colored'})
                  return false      
              } 
              console.log(data);
              setUserInfo(data.data)
          })          
      }
  },[])
  return (
    <div>
      {
        user.role <= 2 && (<Navigate to="/" />)
      }

        <Header currentLocation="profile" />
        <UserDetailsCard userId={user._id} />

        <div className='w-[90%] flex flex-wrap justify-start gap-[20px] h-max mb-[20px] mx-auto'>

          <Link to="/admin/manage/users">
          <div className='cursor-pointer shadow-xl hover:shadow-none w-[160px] h-[80px] rounded-md border border-zinc-400 dark:border-0 bg-amber-300 dark:bg-amber-300 flex justify-center items-center'>
            <h1 className='text-[22px]'>
              Manage User
            </h1>
          </div>
          </Link>

          <Link to="/admin/manage/products" >
          <div className='cursor-pointer shadow-xl hover:shadow-none w-[160px] h-[80px] rounded-md border border-zinc-400 dark:border-0 bg-emerald-300 dark:bg-emerald-300 flex justify-center items-center'>
            <h1 className='text-[22px] text-center'>
              Manage Product
            </h1>
          </div>
          </Link>

        </div>
        {
            userInfo && (<UserUploads data={userInfo.uploads} />)
        }
        {
            userInfo && (<UserUploads data={userInfo.purchases} type="purchases" />)
        }
    </div>
  )
}

export default Dashboard