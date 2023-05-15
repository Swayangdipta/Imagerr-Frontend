import React, { useEffect, useState } from 'react'
import { CgClose } from 'react-icons/cg'
import { MdTitle , MdCategory} from 'react-icons/md'
import { ImImage, ImPriceTag, ImPriceTags } from 'react-icons/im'
import { AiFillTags, AiOutlineUpload } from 'react-icons/ai'
import {isAuthenticated} from '../../utils/LS_Helper'
import { toast } from 'react-toastify'
import { getCategories, uploadImage } from '../Image/helper/imageApiCalls'

const UploadForm = ({setIsFormOpen = f => f,type="def",data}) => {
  const [inputs,setInputs] = useState({
    title: '',
    price: 0,
    tags: '',
    category: '',
    isFree: false,
    imagePreviewUrl: '',
    image: '',
    isLoading: false,
    formData: new FormData()
  })

  const {title,price,tags,category,isFree,imagePreviewUrl,formData,isLoading} = inputs
  const [isDisabled,setIsDisabled] = useState(true)
  const [categories,setCategories] = useState([])

  const {user,token} = isAuthenticated()

  const handleChange = field => event => {
    const value = field === "image" ? event.target.files[0] : event.target.value

    setInputs({...inputs,[field]: value})
    formData.set(field,value)

    if(field === "image"){
      setInputs({...inputs,imagePreviewUrl: URL.createObjectURL(event.target.files[0])})
    }
  }

  const handleSubmit = event => {
    event.preventDefault()
    setInputs({...inputs,isLoading: true})
    if(!validate()){
      setInputs({...inputs,isLoading: false})
      return false
    }

    if(price === 0){
      formData.set("isFree",true)
      formData.set("price",0)
    }else{
      formData.set("isFree",false)
    }
    formData.set("tags",tags.split(' '))
    formData.set("category", "63c14eeb1124aac0ae5f3102")

    uploadImage(formData,user._id,token).then(data=>{
      if(data?.response?.data?.error){
        setInputs({...inputs,isLoading: false})
        return toast.error(data?.response?.data?.error,{theme: 'colored'})
      }else if(data.name === "AxiosError"){
        setInputs({...inputs,isLoading: false})
        return toast.error("Something went wrong!",{theme: 'colored'})
      }
      setInputs({...inputs,isLoading: false})
      toast.success("Image uploaded.",{theme: 'colored'})
      setIsFormOpen(false)
    }).catch(err=> {
      setInputs({...inputs,isLoading: false})
      toast.error("Faild to upload image.",{theme: 'colored'})
      console.log(err);
    })
  }

  const validate = () => {
    if(title === '' || category === '' || imagePreviewUrl === ''){
      toast.error("All fields are required!",{theme: 'colored'})
      return false
    }

    return true
  }

  useEffect(()=>{
    if(title !== '' && category !== '' && imagePreviewUrl !== ''){
      setIsDisabled(false)
    }
  },[inputs])

  useEffect(()=>{
    if(type === "update"){
      setInputs({...inputs,title:data.title,tags:data.tags[0],price: data.price})
    }
  },[])

  useEffect(()=>{
    getCategories().then(response => {
      if(response?.response?.data?.error){
        return toast.error(response?.response?.data?.error)
      }else if(response.name === "AxiosError"){
        return toast.error("Categories did not load.Reopen the form!")
      }else{
        setCategories(response.data)
      }
    }).catch(e=>{
      return toast.error("Categories did not load.Reopen the form!")
    })
  },[])
  
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
              <input value={title} onChange={e=>handleChange("title")(e)} type="text" name="title" id="title" placeholder='Asset title...' className='w-[100%] h-[30px] indent-[35px] outline-0 mx-auto mt-[5px] border-[1px] border-zinc-400 rounded' />
              <MdTitle className='absolute top-[9px] left-[3px] text-[24px]' />
            </span>

            <label htmlFor="price" className='w-[90%] mx-auto mt-[5px] text-[20px] text-zinc-800 dark:text-zinc-300'>Price</label>
            <span className='relative top-0 mx-auto w-[90%]'>
              <input value={price} onChange={e=>handleChange("price")(e)} type="number" name="price" id="price" placeholder='Asset price...' className='w-[100%] h-[30px] indent-[35px] outline-0 mx-auto mt-[5px] border-[1px] border-zinc-400 rounded' />
              <ImPriceTag className='absolute top-[12px] left-[7px] text-[18px]' />
            </span>

            <label htmlFor="tags" className='w-[90%] mx-auto mt-[5px] text-[20px] text-zinc-800 dark:text-zinc-300'>Tags <span className='text-[16px]'>(max. 4)</span></label>
            <span className='relative top-0 mx-auto w-[90%]'>
              <input value={tags} onChange={e=>handleChange("tags")(e)} type="text" name="tags" id="tags" placeholder='Asset tags (space separated)...' className='w-[100%] h-[30px] indent-[35px] outline-0 mx-auto mt-[5px] border-[1px] border-zinc-400 rounded' />
              <AiFillTags className='absolute top-[10px] left-[5px] text-[23px]' />
              <span className='text-zinc-500'>Use space to separate tags.</span>
            </span>

            <label htmlFor="category" className='w-[90%] mx-auto mt-[5px] text-[20px] text-zinc-800 dark:text-zinc-300'>Category</label>
            <span className='relative top-0 mx-auto w-[90%]'>
              <select value={category} onChange={e=>handleChange("category")(e)} name="category" id="category" className='w-[100%] h-[30px] indent-[35px] outline-0 mx-auto mt-[5px] border-[1px] border-zinc-400 rounded'>
                <option value="Nature">Select</option>
                {
                  categories.length > 0 && categories.map((elem,index)=>(
                    <option key={index} value={elem._id}>{elem.name}</option>
                  ))
                }
              </select>
              <MdCategory className='absolute top-[10px] left-[5px] text-[23px]' />
            </span>

            <label htmlFor="asset" className='w-[90%] mx-auto mt-[5px] text-[20px] text-zinc-800 dark:text-zinc-300'>Asset</label>
            <span className='relative top-0 mx-auto w-[90%]'>
              <ImImage className='absolute top-[10px] left-[7px] text-[18px] z-10' />
              <div className='border-[1px] border-zinc-400 absolute top-0 left-0 w-[100%] h-[100px] rounded dark:bg-white'>
                <h2 id='imageTitleText' className='ml-[35px] mt-[5px]'>Click here to select asset</h2>
                <img multiples={false} alt="Asset" className='w-[110px] h-[90px] object-cover absolute top-[5px] right-[10px] rounded bg-zinc-400' src={imagePreviewUrl} />
              </div>
              <input required type="file" onChange={e=>handleChange("image")(e)} multiples='false' name="asset" id="asset" className='w-[100%] cursor-pointer z-50 opacity-0 h-[30px] indent-[35px] outline-0 mx-auto mt-[5px] border-[1px] border-zinc-400 rounded' />
            </span>

            <button disabled={isDisabled} onClick={handleSubmit} type="submit" className='w-[90%] h-[40px] text-[22px] font-[500] text-zinc-100 mx-auto bg-emerald-600 rounded mt-[90px] flex items-center justify-center gap-[15px]'>{isLoading ? ("Uploading...") : (<>Upload <AiOutlineUpload className='text-[28px]' /></>)}</button>
        </form>        
      </div>

    </div>
  )
}

export default UploadForm