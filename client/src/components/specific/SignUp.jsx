import React from 'react'
import TextField from '@mui/material/TextField';

export const SignUp = () => {
  return (
           <div className='flex flex-col justify-evenly gap-y-4 px-4 w-full'>
                        <TextField variant='outlined' label='Enter Your Name'></TextField>
                        <TextField variant='outlined' label='Enter Your Email'></TextField>
                        <TextField variant='outlined' label='Enter  Password'></TextField>
                        <div><button class="bg-blue-300 rounded-xl p-3 w-full">Create Account</button></div>
            </div>
  )
}
