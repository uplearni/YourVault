import React from 'react'

export const Placeholder = ({message,buttonLabel,onClick}) => {
  return (
    <div className="flex items-center justify-center min-h-[60vh] bg-light-background dark:bg-dark-background">
      <div className="text-center p-6 bg-light-secondary dark:bg-dark-secondary rounded-lg shadow-xl max-w-md w-full">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" 
        viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
        className="size-10 text-lg text-light-text dark:text-dark-text mx-auto">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
        </svg>
        <h3 className="text-2xl mb-6 font-bold text-light-text dark:text-dark-text mb-4">{message}</h3>
        <button
          onClick={onClick}
          className="px-4 py-2 rounded-md bg-light-primary dark:bg-dark-primary  text-white hover:bg-light-secondary dark:hover:bg-dark-secondary hover:border-1 hover:text-light-primary dark:hover:text-dark-text hover:border-light-primary"
          aria-label="Go back to previous page"
        >
          <div className='flex justify-between w-full'>
          {buttonLabel}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" 
          viewBox="0 0 24 24" strokeWidth={1.5} 
          stroke="currentColor" className="size-6 ml-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>

          </div>
        </button>
      </div>
    </div>
  )
}
