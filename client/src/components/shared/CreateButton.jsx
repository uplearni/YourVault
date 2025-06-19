import React from 'react'

export const CreateButton = ({onClose}) => {
  return (<button
              type="submit"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-light-primary dark:bg-dark-primary  text-white hover:bg-light-secondary dark:hover:bg-dark-secondary hover:border-1 hover:text-light-text dark:hover:text-dark-text"
            >
              Create
            </button>
  )
}
