import React from 'react'
import { useParams } from 'react-router-dom'

const ExtendedImage = () => {
    const {id} = useParams()
  return (
    <div>ExtendedImage</div>
  )
}

export default ExtendedImage