import React from 'react'

export const Card = ({name}) => {
  return (
    <div className="w-full max-w-xs aspect-square  bg-red-500 rounded-xl p-3 flex  flex-col text-white text-base sm:text-lg font-medium"
    role="listitem"
    aria-label={`Collection : ${name}`}>
    {name}
    </div>
  )
}
