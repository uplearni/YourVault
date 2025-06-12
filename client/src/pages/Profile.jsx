import React from 'react'

export const Profile = ({isOpen,onClose}) => {
  if (!isOpen) return null;
  return (
     <div className='absolute inset-0 z-60 flex'>
          {/*Opaque Background*/}
           <div 
           className='absolute inset-0  bg-opacity-100'
           onClick={onClose}
           aria-hidden="true"/>

           {/* Profile Panel*/}
           <div className='relative w-80 h-[calc(100vh-8rem)] bg-white shadow-lg ml-auto top-16 transform transition-transform duration-300 translate-x-0'
                role='dialog'
                aria-label='Profile Panel'
            >

           <div className='p-6'>
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Profile
            </h2>
            <button
              onClick={onClose}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              aria-label="Close profile panel"
            >
            X
            </button>
            </div>
             <div className="text-gray-600 dark:text-gray-300">
            <p>Username: User123</p>
            <p>Email: user@example.com</p>
            <p>Joined: Jan 2025</p>
          </div>
           </div>
           </div>
     </div>
    
  )
}
