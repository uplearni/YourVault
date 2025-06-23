  import React from 'react';
  import {useNavigate} from 'react-router-dom'
  import authStore from "../store/authStore";
  import api from '../utils/axios'
  import { CrossButton } from '../components/shared/CrossButton';

  export const Profile = ({ isOpen, onClose }) => {
    const {name,email}=authStore.getState();
    const navigate=useNavigate();

    console.log(name+" "+email);
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
          className={`relative w-80 h-[calc(100vh-20rem)] bg-light-secondary dark:bg-dark-secondary shadow-xl ml-auto top-16  rounded-lg p-6 transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          role="dialog"
          aria-label="Profile Panel"
          aria-hidden={!isOpen}
        >
          <div className="flex justify-between items-center border-b border-light-accent dark:border-dark-accent pb-4 mb-6">
            <h2 className="text-xl font-bold text-light-text dark:text-dark-text">
              Profile
            </h2>
            <CrossButton onClose={onClose} />
          </div>
          <div className="space-y-4 text-sm text-light-text dark:text-dark-text">
            <p className="font-medium flex justify-between">Name: <span className="font-normal">{name}</span></p>
            <p className="font-medium flex justify-between">Email: <span className="font-normal">{email}</span></p>
          </div>
          <div className="mt-8 flex justify-center">
            <button
              aria-label="Log out of profile"
              onClick={handleLogout}
              className="px-6 py-2 bg-light-primary dark:bg-dark-primary text-white rounded-md hover:bg-light-secondary dark:hover:bg-dark-secondary hover:border-1 hover:border-light-primary hover:text-light-text dark:hover:text-dark-text focus:ring-offset-2 focus:ring-offset-light-secondary dark:focus:ring-offset-dark-secondary transition-colors duration-200"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    );
  };