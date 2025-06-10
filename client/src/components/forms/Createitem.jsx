import React from 'react'

export const Createitem = () => {
  return (
    <form className='flex flex-col justify-evenly gap-y-4 px-4 w-full'>
          <TextField variant='outlined' label='Enter item Name'></TextField>
          <TextareaAutosize variant='outlined' label='Enter  Description'></TextareaAutosize>
          <div><button class="bg-blue-300 rounded-xl p-3 w-full">Create Item</button></div>
    </form>
  )
}
