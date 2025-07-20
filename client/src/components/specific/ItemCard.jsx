import React from 'react'
import { UpdateButton } from '../shared/UpdateButton';
import { DeleteButton } from '../shared/DeleteButton';

export const ItemCard = React.memo(({ id, name, description, link, file ,onUpdate,onDelete}) => {
 
  const handleFileDownload = () => {
   if (file && typeof file === 'object' && file.secure_url) {
            const fileUrl = file.secure_url;
            // Optionally, for direct download instead of opening in new tab,
            // you might create a temporary anchor tag and click it.
            // However, window.open with a download attribute (added below) is often enough for browsers.
            window.open(fileUrl, '_blank');
        } else {
            console.warn('Attempted to download file without a secure_url:', file);
        }
  };


  // icon based on link or file
 const getIcon = () => {
        if (link) {
            return (
                <svg xmlns="http://www.w0.org/2000/svg"
                    fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5 text-light-primary dark:text-dark-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                </svg>
            );
        } else if (file && typeof file === 'object' && file.secure_url) { // Check for file object with secure_url
            return (
                <svg xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5 text-light-primary dark:text-dark-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
            );
        }
        return null;
    };

 const getFileLabel = () => {
        // file is now an object like { public_id, secure_url, original_name, mimetype }
        if (file && typeof file === 'object' && file.original_name) {
            return `Download ${file.original_name}`;
        }
        return 'Download File';
    };

  return (
    <div
      className="w-full max-w-xs rounded-lg shadow-md p-4 flex flex-col justify-between bg-light-secondary dark:bg-dark-secondary shadow-md hover:shadow-lg transition-all duration-300
       hover:border border-light-primary dark:border-dark-primary hover:bg-light-background/10 dark:hover:bg-dark-background/10"
      role="listitem"
      aria-label={`Item: ${name}`}
    >
       {/* Header: Item Name */}
      <h3 className="text-base sm:text-lg font-bold text-light-text dark:text-dark-text mb-2">
        {name}
      </h3>

      {/* Body: Description */}
      {description && (
        <p className="text-sm sm:text-base text-light-text/90 dark:text-white/90 line-clamp-3 mb-4">
          {description}
        </p>
      )}

      {/* Footer: Link/File + Buttons */}
      <div className="flex flex-col space-y-3">
        <div className="flex items-center space-x-2">
          {getIcon()}
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-light-primary dark:text-dark-primary hover:underline text-sm"
              aria-label={`Link to ${name}`}
            >
              Open Link
            </a>
          ) : file ? (
            <button
              onClick={handleFileDownload}
              className="text-light-primary dark:text-dark-primary hover:underline text-sm"
              aria-label={`Download file for ${name}`}
            >
              {getFileLabel()}
            </button>
          ) : (
            <span className="text-light-text/50 dark:text-dark-text/50 text-sm">
              No file or link
            </span>
          )}
        </div>
        <div className="flex flex-row-reverse space-x-4">
          <DeleteButton id={id} onClick={onDelete} />
          <UpdateButton id={id} onClick={onUpdate} />
        </div>
      </div>
    </div>
  );
});