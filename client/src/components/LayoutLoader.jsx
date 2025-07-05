import React from 'react'

export default function LayoutLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-light-background dark:bg-dark-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-light-primary dark:border-dark-primary  border-t-transparent rounded-full animate-spin" />
        <p className="text-light-text dark:text-white text-sm">Loading collections...</p>
      </div>
    </div>
  )
}
