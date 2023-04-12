import React from "react";
import { CgProfile } from "react-icons/cg";
import { MdOutlineMailOutline,MdAccountTree } from "react-icons/md";
import { isAuthenticated } from "../../utils/LS_Helper";

const UserDetailsCard = () => {
    const {user,token} = isAuthenticated()
    return (
        <div className="w-screen h-[250px] mt-[70px] py-[20px] flex justify-center">
            <div className="w-[90%] h-[250px] flex items-center gap-[30px] rounded-md dark:bg-zinc-900 bg-zinc-100 border dark:border-0 border-zinc-400">
                <img src={`${process.env.REACT_APP_BACKEND}/user/image/${user._id}`} className="h-[220px] w-[220px] rounded-full object-cover ml-[20px] border dark:border-0 border-zinc-400" alt="User DP" />
                <div className="select-none h-[90%] px-[30px] border-l-2 border-zinc-400 dark:border-zinc-700 ">
                    <span className="w-max flex gap-[10px] items-center text-[30px] dark:text-emerald-200 text-emerald-700">
                        <CgProfile />
                        <h1>{user.name}</h1>
                    </span>
                    <span className="w-max flex gap-[10px] mt-[10px] items-center text-[26px] dark:text-zinc-200 text-zinc-700">
                        <MdOutlineMailOutline />
                        <h1>{user.email}</h1>
                    </span>
                    <span className="w-max flex gap-[10px] mt-[10px] items-center text-[26px] dark:text-amber-200 text-amber-700">
                        <MdAccountTree />
                        <h1>{user.accountType}</h1>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default UserDetailsCard 