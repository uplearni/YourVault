import React, { useState, useEffect, useCallback } from 'react';
import { NavLink, useLocation , useMatch} from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';
import { CreateCard } from '../forms/CreateCard';
import { CreateItem } from '../forms/CreateItem';
import uiStore from '../../store/uiStore';

export const Side = () => {
  const setFilterMode = uiStore((state) => state.setFilterMode);
  const setSearchQuery = uiStore((state) => state.setSearchQuery);
  const [sidebarOpen, setIsSidebarOpen] = useState(false);


const match = useMatch("/collection/:collectionId");
const collectionId = match?.params?.collectionId;

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [isCreateCardOpen, setIsCreateCardOpen] = useState(false);
  const [isCreateItemOpen, setIsCreateItemOpen] = useState(false);

  const location = useLocation();
  const isCollectionPage = location.pathname.startsWith('/collection');

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="fixed top-15 left-4 z-50 md:hidden p-2 rounded-lg border-1 bg-light-primary text-white dark:bg-dark-primary dark:text-white hover:bg-opacity-90 dark:hover:bg-opacity-90 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent focus:ring-offset-2 focus:ring-offset-light-background dark:focus:ring-offset-dark-background"
        onClick={toggleSidebar}
        aria-label={sidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
        aria-expanded={sidebarOpen}
      >
        {sidebarOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 p-6 bg-light-primary dark:bg-dark-primary text-white  overflow-y-auto transform transition-all duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:block shadow-lg`}
        role="complementary"
        aria-label="Sidebar navigation"
      >
        <div className="flex flex-col h-full justify-between">
          <nav className="space-y-2">
            <button
              className="w-full rounded text-sm font-medium text-white  hover:text-light-primary dark:hover:text-dark-primary hover:bg-light-background dark:hover:bg-dark-secondary hover:ring-2 hover:ring-light-secondary dark:hover:ring-dark-secondary transition-colors duration-200"
               onClick={() => {
                 setFilterMode('all');
                 setSearchQuery('');
             }}
             
             aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
            >
              <div className="flex items-center justify-between py-2 px-4">
                <div className="flex justify-between w-full">
                   {isCollectionPage ? 'Items' : 'Collections'}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                    />
                  </svg>
                </div>
              </div>
            </button>
            {!isCollectionPage ?
                         <button
              className="w-full rounded text-sm font-medium text-white  hover:text-light-primary dark:hover:text-dark-primary hover:bg-light-background dark:hover:bg-dark-secondary hover:ring-2 hover:ring-light-secondary dark:hover:ring-dark-secondary transition-colors duration-200"
               onClick={() => {
              setFilterMode('favorites');
              setSearchQuery('');
             }}
            >
              <div className="flex items-center justify-between py-2 px-4">
                <div className="flex justify-between w-full">
                   Favorites
                  <svg xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" fill="currentColor" 
                  className="size-6 ">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </button>
            :
            null
            }

            <button
              className="w-full rounded text-sm font-medium text-white  hover:text-light-primary dark:hover:text-dark-primary hover:bg-light-background dark:hover:bg-dark-secondary hover:ring-2 hover:ring-light-secondary dark:hover:ring-dark-secondary transition-colors duration-200"
              onClick={() => {
                if (isCollectionPage) {
                     setIsCreateItemOpen(true);
                } else {
                     setIsCreateCardOpen(true);
               }
             }}

            >
              <div className="flex items-center justify-between py-2 px-4">
                <div className="flex justify-between w-full">
                  {isCollectionPage ? 'Create Item' : 'Create Collection'}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </div>
              </div>
            </button>
          </nav>
          <div className="pt-6">
            <div className="w-full flex items-center justify-center py-2 px-4 rounded text-sm font-medium text-white transition-colors duration-200">
              <div className="flex items-center space-x-2">
                <FaMoon className="w-4 h-4" />
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={toggleDarkMode}
                    className="sr-only"
                    aria-pressed={darkMode}
                  />
                  <div className="w-20 h-5 bg-light-secondary dark:bg-dark-secondary rounded-full shadow-inner transition-all duration-300">
                    <div
                      className={`w-5 h-5 bg-light-primary dark:bg-dark-primary rounded-full shadow-md transform transition-transform duration-300 ${
                        darkMode ? 'translate-x-15' : 'translate-x-0'
                      }`}
                    ></div>
                  </div>
                </label>
                <FaSun className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </aside>

      <CreateCard isOpen={isCreateCardOpen} onClose={() => setIsCreateCardOpen(false) } mode="create"  initialData={{ cname: '', description: '', _id: null }}/>
      {isCollectionPage && (
        <CreateItem isOpen={isCreateItemOpen} onClose={() => setIsCreateItemOpen(false)} mode='create' collectionId={collectionId} initialData={{ title: '', 
      description: '', 
      type:'url',
      url: '', 
      file: null,}} />
      )}
    </>
  );
};