import React from 'react'
import TextField from '@mui/material/TextField';
import { TextareaAutosize } from '@mui/material';

export const CreateCard = ({isOpen , onClose}) => {
  if(!isOpen) return null;

  const handleSubmit=(e)=>{
      e.preventDefault();
      console.log("Collection submitted");
      onClose();
  }

  return (
     <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div 
      className='absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm'
      onClick={onClose}
      aria-hidden="true"/>

      <div
        className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        role="dialog"
        aria-label="Create Collection form"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Create Collection
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-lg"
            aria-label="Close create collection form"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Collection Name
            </label>
            <input
              id="name"
              type="text"
              required
              className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter collection name"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Description
            </label>
            <textarea
              id="description"
              className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter description"
              rows="3"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
