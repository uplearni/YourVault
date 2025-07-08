import React , {useState} from 'react'
import uiStore from '../../store/uiStore'


export const SearchBox = () => {
  const { searchQuery, setSearchQuery } = uiStore();
   const [showMobileSearch, setShowMobileSearch] = useState(false);


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
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search collections..."
            className="w-64 bg-light-secondary dark:bg-dark-secondary text-light-text dark:text-white rounded-md px-3 py-1.5 placeholder-light-text/70 dark:placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary transition"
          />
    </div>

    
    {/* Mobile floating search icon */}
      <div className="md:hidden fixed  bottom-5 right-5 z-50">
        <button
          onClick={() => setShowMobileSearch(prev => !prev)}
          className="bg-light-primary dark:bg-dark-primary text-white p-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent"
          aria-label="Toggle search"
        >
          <svg xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 10.5A6.5 6.5 0 1 1 4 10.5a6.5 6.5 0 0 1 13 0Z" />
          </svg>
        </button>
      </div>
      

      {/* Mobile search input dropdown */}
      {showMobileSearch && (
        <div className="md:hidden fixed top-20 left-0 right-0 px-4 py-3 bg-light-background dark:bg-dark-background shadow-md z-55">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search collections..."
            className="w-full bg-light-secondary dark:bg-dark-secondary text-light-text dark:text-white rounded-md px-3 py-2 placeholder-light-text/70 dark:placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary transition"
          />
        </div>
      )}
        </>
  )
}
