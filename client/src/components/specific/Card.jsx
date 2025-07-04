import React from 'react';
import { UpdateButton } from '../shared/UpdateButton';
import { DeleteButton } from '../shared/DeleteButton';

export const Card = React.memo(({ id, name, description, onUpdate, onDelete ,onClick,isFavorite,onToggleFavorite}) => {
  return (
    <div
      onClick={onClick}
      className="w-full max-w-xs aspect-square bg-light-secondary dark:bg-dark-secondary rounded-xl p-4 flex flex-col justify-between shadow-md hover:shadow-lg transition-all duration-300 
      hover:border border-light-primary dark:border-dark-primary hover:bg-light-background/10 dark:hover:bg-dark-background/10"
      role="listitem"
      aria-label={`Collection: ${name}`}
    >
      <div className="space-y-3">
        <div className='flex justify-between items-start'>
        <div className="text-base sm:text-lg font-bold text-light-text dark:text-dark-text  max-w-[85%] line-clamp-2">
          {name}
        </div>
        <button
        className='ml-2'
         onClick={(e)=>{
          e.stopPropagation();
          onToggleFavorite();
         }}>
          { isFavorite ?
          <svg xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" fill="#6e6eba" 
          className="size-6">
          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
          </svg>
          :
          <svg xmlns="http://www.w3.org/2000/svg" 
          fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
          stroke="currentColor" 
          className="size-6 dark:text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
         </svg>
        } 
        </button>
        </div>
        {description && (
          <div className="text-sm sm:text-base text-light-text/90 dark:text-white/90 line-clamp-3">
            {description}
          </div>
        )}
      </div>
      <div>
        <div className="border-t border-light-primary dark:border-dark-primary my-2"></div>
        <div className="flex flex-row-reverse space-x-3"
        onClick={(e) => e.stopPropagation()}>
          <DeleteButton id={id} onClick={onDelete} />
          <UpdateButton id={id} onClick={onUpdate} />
        </div>
      </div>
    </div>
  );
});