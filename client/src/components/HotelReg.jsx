import React from 'react'
import { assets } from '../assets/assets'

const HotelReg = () => {
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center justify-center bg-black/70'>
        <form>
            <img src={assets.regImage} alt="reg-image" className='w-1/2 rounded-xl hidden md:block' />

            <div>
                <img src={assets.closeIcon} alt="closeIcon" />
            </div>

        </form>

    </div>
  )
}

export default HotelReg