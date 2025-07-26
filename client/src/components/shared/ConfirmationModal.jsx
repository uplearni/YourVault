import React from 'react';

// A generic button component for the modal actions
const ModalButton = ({ onClick, children, className }) => (
  <button
    onClick={onClick}
    className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm sm:w-auto ${className}`}
  >
    {children}
  </button>
);

export const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Background overlay */}
      <div className="fixed inset-0   backdrop-blur-sm" aria-hidden="true"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-light-primary dark:bg-dark-background text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-light-primary dark:bg-dark-background sm:mx-0 sm:h-10 sm:w-10">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 className="text-base font-semibold leading-6 text-white" id="modal-title">
                    {title}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-white">
                      {message}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-light-primary dark:bg-dark-background px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <ModalButton onClick={onConfirm} className="rounded-full p-2 m-1 bg-light-background dark:bg-dark-primary text-light-text dark:text-white hover:bg-light-secondary dark:hover:bg-text-white dark:hover:text-dark-primary hover:text-dark-primary  transition-colors duration-200">
                Delete
              </ModalButton>
              <ModalButton onClick={onClose} className="rounded-full p-2 m-1 bg-light-background dark:bg-dark-primary text-light-text dark:text-white hover:bg-light-secondary dark:hover:bg-text-white dark:hover:text-dark-primary hover:text-dark-primary  transition-colors duration-200">
                Cancel
              </ModalButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
