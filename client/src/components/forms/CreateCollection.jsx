import React from 'react'
import TextField from '@mui/material/TextField';
import { TextareaAutosize } from '@mui/material';

export const CreateCollection = () => {
  return (
    <form className='flex flex-col justify-evenly gap-y-4 px-4 w-full'>
      <TextField variant='outlined' label='Enter Your Collection Name'></TextField>
      <TextareaAutosize variant='outlined' label='Enter  Description'></TextareaAutosize>
      <div><button class="bg-blue-300 rounded-xl p-3 w-full">Create Collection</button></div>
    </form>
  )
}
