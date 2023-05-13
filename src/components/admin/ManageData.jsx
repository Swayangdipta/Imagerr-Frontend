import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const ManageData = () => {
    const {type} = useParams()

    useEffect(()=>{
        console.log(type);
    },[])
  return (
    <div>
    
    </div>
  )
}

export default ManageData