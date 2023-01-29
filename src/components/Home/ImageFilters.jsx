import React, { useState, useContext } from 'react'
import { FilterContext } from '../../context/FilterContext'

const ImageFilters = () => {
    const [activeFilters,setActiveFilters] = useState({
        sort: 'oldest',
        category: 'all',
        view: 'cozy',
        theme: "light"
    })

    const [filters,setFilters] = useContext(FilterContext)

    const handleClick = e => sect => {
        handleUIChange(e,sect)

        setFilters({...filters,[sect]: e.target.id})
    }

    const handleUIChange = (e,sect) => {
        if(sect === "sort"){
            document.getElementById(activeFilters.sort).classList.remove("bg-blue-900")
            document.getElementById(activeFilters.sort).classList.remove("border-blue-900")
            document.getElementById(activeFilters.sort).classList.remove("text-white")
            document.getElementById(activeFilters.sort).classList.add("bg-white")
            document.getElementById(activeFilters.sort).classList.add("border-white")            
        }else if(sect === "view"){
            document.getElementById(activeFilters.view).classList.remove("bg-blue-900")
            document.getElementById(activeFilters.view).classList.remove("border-blue-900")
            document.getElementById(activeFilters.view).classList.remove("text-white")
            document.getElementById(activeFilters.view).classList.add("bg-white")
            document.getElementById(activeFilters.view).classList.add("border-white")  
        }else if(sect === "theme"){
            document.getElementById(activeFilters.theme).classList.remove("bg-blue-900")
            document.getElementById(activeFilters.theme).classList.remove("border-blue-900")
            document.getElementById(activeFilters.theme).classList.remove("text-white")
            document.getElementById(activeFilters.theme).classList.add("bg-white")
            document.getElementById(activeFilters.theme).classList.add("border-white")   
        }else{
            document.getElementById(activeFilters.category).classList.remove("bg-blue-900")
            document.getElementById(activeFilters.category).classList.remove("border-blue-900")
            document.getElementById(activeFilters.category).classList.remove("text-white")
            document.getElementById(activeFilters.category).classList.add("bg-white")
            document.getElementById(activeFilters.category).classList.add("border-white")  
        }


        e.target.classList.add("bg-blue-900")
        e.target.classList.add("border-blue-900")
        e.target.classList.add("text-white")
        e.target.classList.remove("bg-white")
        e.target.classList.remove("border-white")
        setActiveFilters({...activeFilters,[sect]: e.target.id})
    }
  return (
    <div className='w-[25%] z-0 min-h-[200px] h-max py-[10px] rounded dark:bg-zinc-900 dark:border-0 bg-zinc-200 border-zinc-400 border-[1px]'>
        <section className='w-[95%] max-h-[150px] h-max mx-auto'>
            <h2 className='text-[20px] font-[600] dark:text-zinc-100'>Sort By</h2>
            <div className='flex gap-[10px] my-[5px] w-[100%] flex-wrap'>
                <button onClick={e=>handleClick(e)("sort")} id="oldest" className='px-[10px] text-[18px] rounded border-2 border-white bg-white hover:shadow-lg'>Oldest</button>
                <button onClick={e=>handleClick(e)("sort")} id="newest" className='px-[10px] text-[18px] rounded border-2 border-white bg-white hover:shadow-lg'>Newest</button>                             
            </div>
        </section>
        <section className='w-[95%] max-h-[150px] h-max mx-auto mt-[10px]'>
            <h2 className='text-[20px] font-[600] dark:text-zinc-100'>Category</h2>
            <div className='flex gap-[10px] my-[5px] w-[100%] flex-wrap'>
                <button id="all" onClick={e=>handleClick(e)("category")} className='px-[10px] text-[18px] rounded border-2 border-blue-900 bg-blue-900 text-white hover:shadow-lg'>All</button>
                <button id="nature" onClick={e=>handleClick(e)("category")} className='px-[10px] text-[18px] rounded border-2 border-white bg-white hover:shadow-lg'>Nature</button>
                <button id="landscapes" onClick={e=>handleClick(e)("category")} className='px-[10px] text-[18px] rounded border-2 border-white bg-white hover:shadow-lg'>Landscapes</button>                             
                <button id="abstract" onClick={e=>handleClick(e)("category")} className='px-[10px] text-[18px] rounded border-2 border-white bg-white hover:shadow-lg'>Abstract</button>                             
            </div>
        </section>
        <section className='w-[95%] max-h-[150px] h-max mx-auto mt-[10px]'>
            <h2 className='text-[20px] font-[600] dark:text-zinc-100'>View</h2>
            <div className='flex gap-[10px] my-[5px] w-[100%] flex-wrap'>
                <button id="compact" onClick={e=>handleClick(e)("view")} className='px-[10px] text-[18px] rounded border-2 border-white bg-white hover:shadow-lg'>Compact</button>
                <button id="cozy" onClick={e=>handleClick(e)("view")} className='px-[10px] text-[18px] rounded border-2 border-blue-900 bg-blue-900 text-white hover:shadow-lg'>Normal</button>                             
                <button id="small" onClick={e=>handleClick(e)("view")} className='px-[10px] text-[18px] rounded border-2 border-white bg-white hover:shadow-lg'>Small</button>                             
                <button id="large" onClick={e=>handleClick(e)("view")} className='px-[10px] text-[18px] rounded border-2 border-white bg-white hover:shadow-lg'>Large</button>                             
            </div>
        </section>
        <section className='w-[95%] max-h-[150px] h-max mx-auto mt-[10px]'>
            <h2 className='text-[20px] font-[600] dark:text-zinc-100'>Theme</h2>
            <div className='flex gap-[10px] my-[5px] w-[100%] flex-wrap'>
                <button id="light" onClick={e=>handleClick(e)("theme")} className='px-[10px] text-[18px] rounded border-2 border-blue-900 bg-blue-900 text-white hover:shadow-lg'>Light</button>
                <button id="dark" onClick={e=>handleClick(e)("theme")} className='px-[10px] text-[18px] rounded border-2 border-white bg-white hover:shadow-lg'>Dark</button>                                                        
            </div>
        </section>
    </div>
  )
}

export default ImageFilters