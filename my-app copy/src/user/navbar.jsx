import React from 'react'
import { Link } from 'react-router-dom'

const navbar = () => {
  return (
    <div className='bg-transparent  flex flex-col justify-between'  >

<Link to="/user/display" className="text-[16px] hover:text-red-600 active:text-red-600 sm:text-[20px]">
  Home
</Link>

         <Link to="/user/askHoliday" className="text-[16px] hover:text-red-600 active:text-red-600 sm:text-[20px]">Request Holiday</Link>
          <Link to="/user/notice" className="text-[16px] hover:text-red-600 active:text-red-600 sm:text-[20px]">Notice</Link>
             <Link to="/user/home" className="text-[16px] hover:text-red-600 active:text-red-600 sm:text-[20px]">Task</Link>
        
        
      
    </div>
  )
}

export default navbar
