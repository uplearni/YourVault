import React from 'react'
import { SearchBox } from './SearchBox'
import { Profile } from '../../pages/Profile';
import { useState } from 'react';
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  const [isProfileOpen , setIsProfileOpen] =useState(false);//for opening the profile
  const toggleProfile=()=>{
    setIsProfileOpen(!isProfileOpen);
  }

  return (
    <>
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-darkgray  shadow-lg h-16 flex items-center px-4 md:px-6"
         role="navigation"
         aria-label="Main Navigation">
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto">
      <NavLink
            to="/"
            className="text-xl font-bold"
            aria-label="Go to dashboard"
          >
            Logo
      </NavLink>
      <div className="hidden md:block">
        <SearchBox/></div>
      <button
            onClick={toggleProfile}
            className=""
            aria-label="Toggle profile panel"
            aria-expanded={isProfileOpen}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
</svg>

          </button>
      </div>
    </nav>
    <Profile isOpen={isProfileOpen} onClose={toggleProfile}/>
   </>
  )
}


