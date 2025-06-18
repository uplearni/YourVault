import React , {useState} from 'react'

export const SearchBox = () => {


  return (
    <>
    {/**desktop search bar */}
    <div className='md:flex item-center space-x-2 hidden'>
      <svg xmlns="http://www.w3.org/2000/svg" 
      fill="none" viewBox="0 0 24 24" 
      strokeWidth={1.5} stroke="currentColor" 
      className="size-7 mt-1 text-light-text dark:text-white">
     <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
     </svg>

    <input type='text' 
    className="w-64 bg-light-secondary dark:bg-dark-secondary text-light-text dark:text-white rounded-md px-3 py-1.5 placeholder-light-text/70 dark:placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary transition-colors duration-200" placeholder='Search ...'></input>
    </div>
    </>
  )
}
