import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className="flex md:flex-row flex-col-reverse items-center justify-between w-full px-8 py-4 border-t mt-4 bg-white">
      {/* Left side */}
      <div className='flex items-center gap-4'>
        <img className='hidden md:block w-20' src={assets.logo} alt="logo" />
        <div className='hidden md:block h-7 w-px bg-gray-500/60'></div>
        <p className='text-center text-xs md:text-sm text-gray-500'>
          Copyright 2024 @ EduNex. All Rights Reserved.
        </p>
      </div>

      {/* Right side: Social media icons */}
      <div className='flex items-center gap-4 max-md:mb-4'>
        <a href="#" aria-label="Facebook">
          <img src={assets.facebook_icon} alt="Facebook" className="w-6 h-6" />
        </a>
        <a href="#" aria-label="Twitter">
          <img src={assets.twitter_icon} alt="Twitter" className="w-6 h-6" />
        </a>
        <a href="#" aria-label="Instagram">
          <img src={assets.instagram_icon} alt="Instagram" className="w-6 h-6" />
        </a>
      </div>
    </footer>
  )
}

export default Footer
