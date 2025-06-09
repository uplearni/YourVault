import { useState } from 'react'
import {LogIn} from"../components/specific/LogIn"
import {SignUp} from"../components/specific/SignUp"


export const Auth = () => {
    let [isLogin,setisLogin]=useState(false);
  return (
    <div class="flex justify-center items-center min-h-screen">
     <div class="w-100 h-100  rounded-xl shadow-xl/30 pt-10 p-5 flex flex-col items-center justify-between">
        <div className="basis-1/4 w-full">
        <div class="flex  bg-gray-200 rounded-full p-1 relative">
            <div className={`absolute top-0 left-0 h-full w-1/2 bg-blue-500 rounded-full transition-transform duration-300 ${
                !isLogin ? "translate-x-full" : "" }`}/>
            <button onClick={()=> setisLogin(!isLogin)} className={`flex-1 z-10 py-2 rounded-full text-center font-medium ${
                 isLogin ? "text-white" : "text-gray-700"}`}>
            LognIn
            </button>
            <button onClick={() => setisLogin(false)} className={`flex-1 z-10 py-2 rounded-full text-center font-medium ${
                 !isLogin ? "text-white" : "text-gray-700"}`}>
            SignUp
            </button>
        </div>
        </div>
        <div className="basis-3/4  w-full">
        {isLogin ?
        <LogIn/>
        :
        <SignUp/>
        }
        </div>
      </div>
      </div>
  )
}
