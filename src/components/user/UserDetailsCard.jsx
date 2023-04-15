import React,{ useState } from "react";
import { CgProfile,CgClose } from "react-icons/cg";
import { MdOutlineMailOutline,MdAccountTree } from "react-icons/md";
import { ImPencil } from "react-icons/im";
import { isAuthenticated } from "../../utils/LS_Helper";
import SignUpForm from "../auth/SignUpForm";

const UserDetailsCard = () => {
    const [isFormOpen,setIsFormOpen] = useState(false)
    const {user,token} = isAuthenticated()
    return (
        <div className="w-screen h-[250px] mt-[70px] py-[20px] flex justify-center">
            <div className="w-[90%] h-[250px] flex items-center gap-[30px] rounded-md dark:bg-zinc-900 bg-zinc-100 border dark:border-0 border-zinc-400 relative top-0">
                <div onClick={e=> setIsFormOpen(true)} className="absolute top-[15px] right-[15px] w-[35px] h-[35px] rounded bg-sky-500 cursor-pointer flex items-center justify-center text-zinc-800 shadow-xl hover:shadow-none hover:bg-sky-400"><ImPencil /></div>
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
            {
                isFormOpen && (
                    <div className="z-[1000] w-screen h-screen fixed top-0 left-0 flex items-center justify-center bg-[#00000080]">
                        <div className="relative top-0 w-[400px] h-[300px] rounded">
                            <div onClick={e=>setIsFormOpen(false)} className="w-[40px] z-[1000] h-[40px] bg-red-500 rounded flex items-center justify-center cursor-pointer absolute right-[10px] shadow-xl hover:shadow-none hover:bg-red-400">
                                <CgClose className="text-white font-[500] text-[24px]" /> 
                            </div>
                        </div>
                        <SignUpForm location="profile" />
                    </div>
                )
            }
        </div>
    )
}

export default UserDetailsCard 