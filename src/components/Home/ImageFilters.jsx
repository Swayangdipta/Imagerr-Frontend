import React, { useState, useContext, useEffect } from 'react'
import { FilterContext } from '../../context/FilterContext'

const ImageFilters = () => {
    const [activeFilters,setActiveFilters] = useState({
        sort: 'oldest',
        category: 'all',
        view: 'cozy'
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

    useEffect(()=>{
        console.log(filters);
    },[filters])
  return (
    <div className='w-[28vw] mr-[30px] mt-[13px] min-h-[200px] h-max py-[10px] fixed top-[60px] right-0 rounded bg-emerald-400'>
        <section className='w-[95%] max-h-[150px] h-max mx-auto'>
            <h2 className='text-[20px] font-[600]'>Sort By</h2>
            <div className='flex gap-[10px] my-[5px] w-[100%] flex-wrap'>
                <button onClick={e=>handleClick(e)("sort")} id="oldest" className='px-[10px] text-[18px] rounded border-2 border-white bg-white'>Oldest</button>
                <button onClick={e=>handleClick(e)("sort")} id="newest" className='px-[10px] text-[18px] rounded border-2 border-white bg-white'>Newest</button>                             
            </div>
        </section>
        <section className='w-[95%] max-h-[150px] h-max mx-auto mt-[10px]'>
            <h2 className='text-[20px] font-[600]'>Category</h2>
            <div className='flex gap-[10px] my-[5px] w-[100%] flex-wrap'>
                <button id="all" onClick={e=>handleClick(e)("category")} className='px-[10px] text-[18px] rounded border-2 border-blue-900 bg-blue-900 text-white'>All</button>
                <button id="nature" onClick={e=>handleClick(e)("category")} className='px-[10px] text-[18px] rounded border-2 border-white bg-white'>Nature</button>
                <button id="landscapes" onClick={e=>handleClick(e)("category")} className='px-[10px] text-[18px] rounded border-2 border-white bg-white'>Landscapes</button>                             
                <button id="abstract" onClick={e=>handleClick(e)("category")} className='px-[10px] text-[18px] rounded border-2 border-white bg-white'>Abstract</button>                             
            </div>
        </section>
        <section className='w-[95%] max-h-[150px] h-max mx-auto mt-[10px]'>
            <h2 className='text-[20px] font-[600]'>View</h2>
            <div className='flex gap-[10px] my-[5px] w-[100%] flex-wrap'>
                <button id="compact" onClick={e=>handleClick(e)("view")} className='px-[10px] text-[18px] rounded border-2 border-white bg-white'>Compact</button>
                <button id="cozy" onClick={e=>handleClick(e)("view")} className='px-[10px] text-[18px] rounded border-2 border-blue-900 bg-blue-900 text-white'>Cozy</button>                             
            </div>
        </section>
    </div>
  )
}

export default ImageFilters