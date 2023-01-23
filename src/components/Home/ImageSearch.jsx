import React, { useState } from 'react'

const ImageSearch = () => {
    const [searchBy,setSearchBy] = useState('title')

    const handleSearch = e => {
        e.preventDefault()
    }
  return (
    <div className='w-[70vw] h-[70px] flex items-center justify-center'>
        <div className='w-[100%] mx-[30px] flex items-center justify-start relative top-0'>
            <select className='outline-none w-[20%] h-[45px] border-2 border-yellow-300 rounded-l indent-2 shadow-md bg-yellow-300 text-zinc-800 font-[600] text-[18px]' value={searchBy} name="searchBy" id="searchBy" onChange={e=> setSearchBy(e.target.value)}>
                <option value="title">Title</option>
                <option value="tags">Tags</option>
            </select>

            <form className='w-[80%] h-[45px]'>
                <input className='outline-none w-[100%] h-[45px] text-zinc-800 font-[500] border-2 border-yellow-300 rounded-r indent-2 shadow-md' type="text" name="search" placeholder='Search images. Ex. Nature ...' onChange={handleSearch} />
            </form>
        </div>
    </div>
  )
}

export default ImageSearch