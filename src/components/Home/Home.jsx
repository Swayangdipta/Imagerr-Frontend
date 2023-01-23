import React from 'react'
import Header from '../base/Header'
import ImageContainer from '../Image/ImageContainer'
import ImageFilters from './ImageFilters'
import ImageSearch from './ImageSearch'

const Home = () => {
  return (
    <div>
        <Header currentLocation="home" />
        {/* <ImageSearch /> */}
        <ImageFilters />
        <ImageContainer />
    </div>
  )
}

export default Home