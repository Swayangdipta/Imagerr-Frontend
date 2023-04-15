import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { isAuthenticated } from '../../utils/LS_Helper'
import Header from '../base/Header'
import { getUser } from './helper/userApiCalls'
import UserDetailsCard from './UserDetailsCard'
import UserUploads from './UserUploads'

const Profile = () => {
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
        <Header currentLocation="profile" />
        <UserDetailsCard userId={user._id} />
        {
            user.role === 2 && user.accountType === "Creator" && userInfo && (<UserUploads data={userInfo.uploads} />)
        }
        <UserUploads data={userInfo.purchases} type="purchases" />
    </div>
  )
}

export default Profile