import React from 'react';
import { UpdateButton } from '../shared/UpdateButton';
import { DeleteButton } from '../shared/DeleteButton';

export const Card = React.memo(({ id, name, description, onUpdate, onDelete ,onClick}) => {
  return (
    <div
      onClick={onClick}
      className="w-full max-w-xs aspect-square bg-light-secondary dark:bg-dark-secondary rounded-xl p-4 flex flex-col justify-between shadow-md hover:shadow-lg transition-all duration-300 
      hover:border border-light-primary dark:border-dark-primary hover:bg-light-background/10 dark:hover:bg-dark-background/10"
      role="listitem"
      aria-label={`Collection: ${name}`}
    >
      <div className="space-y-3">
        <div className="text-base sm:text-lg font-bold text-light-text dark:text-dark-text">
          {name}
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