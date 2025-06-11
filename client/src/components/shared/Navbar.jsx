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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white  shadow-lg h-16 flex items-center px-4 md:px-6"
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
            Profile
          </button>
      </div>
    </nav>
    <Profile isOpen={isProfileOpen} onClose={toggleProfile}/>
   </>
  )
}


