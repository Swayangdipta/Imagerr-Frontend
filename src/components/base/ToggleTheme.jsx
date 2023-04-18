import React, { useContext } from 'react'
import { FilterContext } from '../../context/FilterContext'

const ToggleTheme = () => {
    const [filters,setFilters] = useContext(FilterContext)
    const toggle = e => {
        setFilters({...filters,theme: filters.theme === "light" ? "dark" : "light"})
    }
  return (
    <div className='w-[48px] h-[27px] flex items-center py-[4px] px-[2px] rounded-full bg-black dark:bg-white absolute right-[90px]'>
        <div onClick={toggle} className='w-[23px] h-[23px] rounded-full duration-[1000] cursor-pointer dark:ml-[20px] bg-amber-500 dark:bg-teal-800'>

        </div>
    </div>
  )
}

export default ToggleTheme