import React from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/Categories'
import Besteller from '../components/Besteller'
import BottomBanner from '../components/BottomBanner'
import NewsLettr from '../components/NewsLettr'

const Home = () => {
  return (
    <div className='mt-10'>
       <MainBanner />
         <Categories />
         <Besteller/>
         <BottomBanner/>
         <NewsLettr/>
    </div>
  )
}

export default Home
