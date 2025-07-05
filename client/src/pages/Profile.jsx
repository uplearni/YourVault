  import React from 'react';
  import {useNavigate} from 'react-router-dom'
  import authStore from "../store/authStore";
  import { FaHandsClapping } from "react-icons/fa6";
  import api from '../utils/axios'
  
  export const Profile = ({ isOpen, onClose }) => {
    const {name,email}=authStore.getState();
    const navigate=useNavigate();

    //console.log(name+" "+email);
    if (!isOpen) return null;

    const handleLogout=async ()=>{
      try{
        await api.post('/user/logout');
      }catch(err){
        console.log(err);
      }finally{
        authStore.getState().clearAuth();
        onClose();//close profile
        navigate('/login');//got to the login page
      }
    }

    return (
      <div className="fixed inset-0 z-60 flex">
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />

        <div
          className={`relative w-80 h-[calc(100vh-28rem)] bg-light-secondary dark:bg-dark-secondary shadow-xl ml-auto top-16  rounded-lg p-6 transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          role="dialog"
          aria-label="Profile Panel"
          aria-hidden={!isOpen}
        >
          <div className="text-light-text dark:text-dark-text">
            <p className='font-semibold flex items-center gap-1'>Hey {name} <FaHandsClapping  className="inline-block size-5 ml-1"/> </p>
            <p className="text-xs">{email}</p>
          </div>
          <button
              aria-label="Log out of profile"
              onClick={handleLogout}
              className="mt-4 w-full px-6 py-2 flex item-center justify-center gap-2 bg-light-primary dark:bg-dark-primary text-white rounded-md hover:bg-light-secondary dark:hover:bg-dark-secondary hover:border-1 hover:border-light-primary hover:text-light-text dark:hover:text-dark-text focus:ring-offset-2 focus:ring-offset-light-secondary dark:focus:ring-offset-dark-secondary transition-colors duration-200"
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
            strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
          </svg>
              Log out
            </button>
        </div>
      </div>
    );
  };