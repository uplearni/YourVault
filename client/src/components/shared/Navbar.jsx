import React from 'react'
import { SearchBox } from './SearchBox'

export const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white w-full z-50 shadow-lg h-16 p-5 border-b">
      <div className="flex justify-between w-full">
      <div>Logo</div>
      <div><SearchBox/></div>
      <div>profile</div>
      </div>
    </div>
  )
}


