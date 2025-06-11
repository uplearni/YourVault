import React, { useState , useEffect } from 'react'
import { NavLink , useLocation } from "react-router-dom";

export const Side = () => {
  const [sidebarOpen,setIsSidebarOpen]=useState(false);
  const [darkMode,setDarkMode]=useState(()=>{ //take the theme user has set in their browser by default
    return localStorage.getItem('theme')==='dark';
  });

  const location=useLocation();//to know which page we are on
  const isCollectionPage=location.pathname.startsWith("/collection");

  useEffect(()=>{
    if(darkMode){//if dark mode then add dark class in every document
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme','dark');
    }else{
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme','light');
    }
  },[darkMode])

  const toggleSidebar = () => {
    setIsSidebarOpen(!sidebarOpen);
  };
  
  return (
    <>
     <button 
      className='fixed top-20 left-4 z-50 md:hidden text-gray-600 dark:text-gray-300'
      onClick={toggleSidebar}
      aria-label={sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
      aria-expanded={sidebarOpen}
      >
        {sidebarOpen ? "X" : "☰"}
      </button>

      <aside 
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-[20%] mt-6 p-5 bg-white border-r border-gray-200 overflow-y-auto transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:block`}
        role='Complementary'
        aria-label='Sidebar navigation'>
        <div className='flex flex-col h-full justify-between'>
        <nav className='space-y-3'>
         <NavLink to={isCollectionPage ? `/collection/${location.pathname.split("/")[2]}` : "/"}
          className={({isActive})=>`block py-2 px-4 text-sm rounded ${
                  isActive
                    ? "bg-blue-100 dark:bg-blue-700 text-blue-700 dark:text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
              aria-current={({ isActive }) => (isActive ? "page" : undefined)}
            >
            {isCollectionPage ? "Items" : "Collection"}
          </NavLink>
         <NavLink to={isCollectionPage ? "" : ""}
              className={({ isActive }) =>
                `block py-2 px-4 text-sm rounded ${
                  isActive
                    ? "bg-blue-100 dark:bg-blue-700 text-blue-700 dark:text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
              aria-current={({ isActive }) => (isActive ? "page" : undefined)}
            >
             {isCollectionPage ? "Create Item" : "Create Collection"}
            </NavLink>
               </nav>
        <div className="pt-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-full py-2 text-left px-4 mb-6 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              aria-pressed={darkMode}
            >
              Toggle {darkMode ? "Light" : "Dark"} Mode
            </button>
          </div>
       </div>
      </aside>
    </> 
  )
}
