import React from 'react'
import Header from '../base/Header'
import ImageSearch from './ImageSearch'

const Home = () => {
  return (
    <div>
        <Header currentLocation="home" />
        <ImageSearch />
    </div>
  )
}

export default Home