import React from 'react'
import Header from '../base/Header'
import ImageFilters from './ImageFilters'
import ImageSearch from './ImageSearch'

const Home = () => {
  return (
    <div>
        <Header currentLocation="home" />
        <ImageSearch />
        <ImageFilters />
    </div>
  )
}

export default Home