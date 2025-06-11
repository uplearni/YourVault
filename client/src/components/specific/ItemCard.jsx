import React from 'react'

export const ItemCard = ({ name, description, link, file }) => {
  return (
    <div
      className="w-full max-w-xs  bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col "
      role="listitem"
      aria-label={`Item: ${name}`}
    >
      {/* Item Name */}
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
        {name}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
        {description}
      </p>

      {/* File/Link Placeholder */}
      <div className="mt-2">
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline text-sm"
            aria-label={`Link to ${name}`}
          >
            Open Link
          </a>
        ) : file ? (
          <button
            className="text-blue-500 hover:underline text-sm"
            aria-label={`Download file for ${name}`}
          >
            Download File ({file})
          </button>
        ) : (
          <span className="text-gray-500 text-sm">No file or link</span>
        )}
      </div>
    </div>
  );
}

