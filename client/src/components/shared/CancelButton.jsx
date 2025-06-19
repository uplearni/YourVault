import React from 'react'

export const CancelButton = ({onClose}) => {
  return (
    <button
              type="button"
              onClick={onClose}
              className="px-4 py-2  text-light-text dark:text-white border-1 hover:border-light-primary dark:hover;border-dark-primary hover:bg-light-primary dark:hover:bg-dark-primary hover:text-white  rounded-md"
            >
              Cancel
            </button>
  )
}
