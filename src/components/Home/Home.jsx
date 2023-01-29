import React from 'react'
import Header from '../base/Header'
import ImageContainer from '../Image/ImageContainer'
import ImageFilters from './ImageFilters'
import ImageSearch from './ImageSearch'

const Home = () => {
  return (
    <div>
        <Header currentLocation="home" />
        <div className='flex mx-auto w-[calc(100%_-_60px)] z-0 relative top-[80px] gap-[10px]'>
          <ImageContainer />
          <ImageFilters />          
        </div>
    </div>
  )
}

export default Home