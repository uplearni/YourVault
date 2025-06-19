import React from 'react'

export const CrossButton = ({onClose}) => {
  return (
    <button
            onClick={onClose}
            className="bg-light-primary dark:bg-dark-primary rounded-full p-2 m-1 text-white hover:bg-light-secondary dark:hover:bg-dark-secondary hover:text-light-text dark:hover:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent focus:ring-offset-2 focus:ring-offset-light-secondary dark:focus:ring-offset-dark-secondary transition-colors duration-200"
            aria-label="Close create collection form"
          >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" 
          viewBox="0 0 24 24" strokeWidth={1.5} 
          stroke="currentColor" 
          className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
          </button>
  )
}
