
import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const MainBanner = () => {
  return (
    <div  className='relative'>
        <img src={assets.main_banner_bg} className='w-full hidden md:block' alt="banner" />
         <img src={assets.main_banner_bg_sm} className='w-full  md:hidden' alt="banner" />
              <div className='absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center
               pb-24 md:pb-0 px-4 md:px-18 lg:px-24' >
                <h1  
                  className='text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left 
                max-w-[20rem] md:max-w-[23rem] lg:max-w-[34rem] leading-tight lg:leading-[3.5rem]'
                >Freshness You Can Trust,Savings You will Love!</h1>
              

              <div className='flex items-center mt-6 front-medium' >
                <Link to={'/products'}
                 className='group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary 
                hover:bg-primary-dull transition rounded text-white cursor-pointer'>
                    Shop now
                <img className='md:hidden transition group-focus:translate-x-1' src={assets.white_arrow_icon} alt="arrow" /></Link>
             
              <Link to={'/products'}
                 className='group hidden md:flex items-center gap-2 px-9 py-3
                 cursor-pointer '>
                    Explore Deals
                <img className=' transition group-hover:translate-x-1' src={assets.black_arrow_icon} alt="arrow" /></Link>
              </div>
              </div>
              
    </div>
  )
}

export default MainBanner
