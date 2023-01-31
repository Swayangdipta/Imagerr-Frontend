import React from 'react'
import { CgClose } from 'react-icons/cg'
import { MdTitle , MdCategory} from 'react-icons/md'
import { ImPriceTag } from 'react-icons/im'
import { AiFillTags, AiOutlineUpload } from 'react-icons/ai'

const UploadForm = ({setIsFormOpen = f => f}) => {
  return (
    <div className='w-screen h-screen fixed flex items-center justify-center top-0 left-0 z-[100] bg-[#00000078]'>
      <div className='w-[400px] min-h-[200px] max-h-max pb-[20px] py-[10px] bg-zinc-100 dark:bg-zinc-900 rounded border-[1px] dark:border-0 border-zinc-400'>
        <div className='w-[90%] mx-auto flex justify-between items-center'>
          <h1 className='text-[30px] dark:text-zinc-100 font-[500]'>Upload</h1>
          <CgClose onClick={e=>setIsFormOpen(false)} className='text-[30px] font-[500] text-red-600 cursor-pointer' />
        </div>
        <hr className='w-[90%] mx-auto border-0 h-[1px] bg-zinc-400 mt-[5px]' />
        <form className='w-[100%] flex flex-col h-max'>
            <label htmlFor="title" className='w-[90%] mx-auto mt-[10px] text-[20px] text-zinc-800 dark:text-zinc-300'>Title</label>
            <span className='relative top-0 mx-auto w-[90%]'>
              <input type="text" name="title" id="title" placeholder='Asset title...' className='w-[100%] h-[30px] indent-[35px] outline-0 mx-auto mt-[5px] border-[1px] border-zinc-400 rounded' />
              <MdTitle className='absolute top-[9px] left-[3px] text-[24px]' />
            </span>

            <label htmlFor="price" className='w-[90%] mx-auto mt-[5px] text-[20px] text-zinc-800 dark:text-zinc-300'>Price</label>
            <span className='relative top-0 mx-auto w-[90%]'>
              <input type="number" name="price" id="price" placeholder='Asset price...' className='w-[100%] h-[30px] indent-[35px] outline-0 mx-auto mt-[5px] border-[1px] border-zinc-400 rounded' />
              <ImPriceTag className='absolute top-[12px] left-[7px] text-[18px]' />
            </span>

            <label htmlFor="tags" className='w-[90%] mx-auto mt-[5px] text-[20px] text-zinc-800 dark:text-zinc-300'>Tags <span className='text-[16px]'>(max. 4)</span></label>
            <span className='relative top-0 mx-auto w-[90%]'>
              <input type="text" name="tags" id="tags" placeholder='Asset tags (space separated)...' className='w-[100%] h-[30px] indent-[35px] outline-0 mx-auto mt-[5px] border-[1px] border-zinc-400 rounded' />
              <AiFillTags className='absolute top-[10px] left-[5px] text-[23px]' />
              <span className='text-zinc-500'>Use space to separate tags.</span>
            </span>

            <label htmlFor="category" className='w-[90%] mx-auto mt-[5px] text-[20px] text-zinc-800 dark:text-zinc-300'>Category</label>
            <span className='relative top-0 mx-auto w-[90%]'>
              <select name="category" id="category" className='w-[100%] h-[30px] indent-[35px] outline-0 mx-auto mt-[5px] border-[1px] border-zinc-400 rounded'>
                <option value="nature">Nature</option>
                <option value="nature">Landscapes</option>
                <option value="nature">Abstract</option>
              </select>
              <MdCategory className='absolute top-[10px] left-[5px] text-[23px]' />
            </span>

            <label htmlFor="asset" className='w-[90%] mx-auto mt-[5px] text-[20px] text-zinc-800 dark:text-zinc-300'>Asset</label>
            <span className='relative top-0 mx-auto w-[90%]'>
              <ImPriceTag className='absolute top-[12px] left-[7px] text-[18px] z-10' />
              <div className='border-[1px] border-zinc-400 absolute top-0 left-0 w-[100%] h-[100px] rounded dark:bg-white'>
                <h2 id='imageTitleText' className='ml-[35px] mt-[5px]'>Click here to select asset</h2>
                <img alt="Asset" className='w-[110px] h-[90px] object-cover absolute top-[5px] right-[10px] rounded bg-zinc-400' src={''} />
              </div>
              <input type="file" multiples='false' name="asset" id="asset" className='w-[100%] cursor-pointer z-50 opacity-0 h-[30px] indent-[35px] outline-0 mx-auto mt-[5px] border-[1px] border-zinc-400 rounded' />
            </span>

            <button disabled type="submit" className='w-[90%] h-[40px] text-[22px] font-[500] text-zinc-100 mx-auto bg-emerald-600 rounded mt-[90px] flex items-center justify-center gap-[15px]'>Upload <AiOutlineUpload className='text-[28px]' /></button>
        </form>        
      </div>

    </div>
  )
}

export default UploadForm