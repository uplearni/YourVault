import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { CreateRoom } from '../components/CreateRoom';
import { JoinRoom } from '../components/JoinRoom';

export const Room = () => {
    let [create,setCreate]=useState(false);
  return (
    <div class="flex justify-center items-center min-h-screen">
     <div class="w-100 h-100  rounded-xl shadow-xl/30 pt-10 p-5 flex flex-col items-center justify-between">
        <div className="basis-1/4 w-full">
        <div class="flex  bg-gray-200 rounded-full p-1 relative">
            <div className={`absolute top-0 left-0 h-full w-1/2 bg-blue-500 rounded-full transition-transform duration-300 ${
                !create ? "translate-x-full" : "" }`}/>
            <button onClick={()=> setCreate(!create)} className={`flex-1 z-10 py-2 rounded-full text-center font-medium ${
                 create ? "text-white" : "text-gray-700"}`}>
            Create Room
            </button>
            <button onClick={() => setCreate(false)} className={`flex-1 z-10 py-2 rounded-full text-center font-medium ${
                 !create ? "text-white" : "text-gray-700"}`}>
            Join Room
            </button>
        </div>
        </div>
        <div className="basis-3/4  w-full">
        {create ?
        <CreateRoom/>
        :
        <JoinRoom/>
        }
        </div>
      </div>
      </div>
  )
}
