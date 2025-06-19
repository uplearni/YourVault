import React from 'react';

export const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-light-background dark:bg-dark-background">
      <div className="text-center p-6 bg-light-secondary dark:bg-dark-secondary rounded-lg shadow-xl max-w-md w-full">
        <h1 className="text-4xl font-bold text-light-text dark:text-dark-text mb-4">404</h1>
        <p className="text-lg text-light-text dark:text-dark-text mb-6">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 rounded-md bg-light-primary dark:bg-dark-primary  text-white hover:bg-light-secondary dark:hover:bg-dark-secondary hover:border-1 hover:text-light-text dark:hover:text-dark-text hover:border-light-primary"
          aria-label="Go back to previous page"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};