import React, { useState , useEffect } from 'react'

export const Side = () => {
  const [darkMode,setDarkMode]=useState(()=>{ //take the theme user has set in their browser by default
    return localStorage.getItem('theme')==='dark';
  });

  useEffect(()=>{
    if(darkMode){//if dark mode then add dark class in every document
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme','dark');
    }else{
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme','light');
    }
  },[darkMode])

  return (
    <div className='fixed top-16 left-0 p-6  h-[calc(100vh-64px)] w-1/5 border-r border-gray-200 dark:border-gray-700 bg-white overflow-y-auto'>
    <div className="  flex flex-col justify-between h-full">
    <div className="space-y-4">
      <div>Collection</div>
      <div >Create Collection</div>
    </div>
    <div className='pt-6'><button
            onClick={() => setDarkMode(!darkMode)}
            className="text-sm text-gray-600 dark:text-gray-300 hover:underline"
          >
            Toggle {darkMode ? 'Light' : 'Dark'} Mode
          </button></div>
    </div>
    </div>
  )
}
