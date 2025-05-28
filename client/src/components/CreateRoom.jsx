import React from 'react'
import TextField from '@mui/material/TextField';

export const CreateRoom = () => {
  return (
           <div class="flex flex-col justify-evenly gap-y-4 px-4 w-full">
             <TextField variant='outlined' label='Enter Your Name'></TextField>
                <TextField variant='outlined' label='Generate Room Code'></TextField>
                <div className="flex gap-x-2">
                <button class='bg-blue-300 w-1/2  rounded-sm p-2'>Generate</button>
                <button class='bg-blue-300 w-1/2 rounded-sm p-2'>Copy</button>
             </div>
             <button class="bg-blue-300 rounded-xl p-3">Create Room</button>
           </div>
  )
}
