import React from 'react'
import { useParams } from 'react-router-dom'
import Header from '../base/Header'
import FullviewImage from './FullviewImage'
import ImageInfo from './ImageInfo'

const ExtendedImage = () => {
    const {id} = useParams()
  return (
    <div>
      <Header currentLocation={"home"} />
      <div>
        <FullviewImage image={''} />
        <div>
          <ImageInfo data={''} />
        </div>
      </div>
    </div>
  )
}

export default ExtendedImage