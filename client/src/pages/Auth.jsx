import { useState } from 'react';
import { LogIn } from '../components/specific/LogIn';
import { SignUp } from '../components/specific/SignUp';

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="flex justify-center items-center min-h-screen bg-light-background dark:bg-dark-background">
      <div className="w-full max-w-md h-auto rounded-xl shadow-xl/30 pt-10 p-5 flex flex-col items-center justify-between border-1 border-light-primary dark:border-dark-primary">
        <div className="basis-1/4 w-full mb-6">
          <div className="flex bg-light-secondary dark:bg-dark-secondary rounded-full p-1 relative">
            <div
              className={`absolute top-0 left-0 h-full w-1/2 bg-light-primary dark:bg-dark-primary  rounded-full transition-transform duration-300 ${
                isLogin ? 'translate-x-0' : 'translate-x-full'
              }`}
            />
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 z-10 py-2 rounded-full text-center font-medium ${
                isLogin ? 'text-white' : 'text-light-text dark:text-dark-text '
              }`}
            >
              LogIn
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 z-10 py-2 rounded-full text-center font-medium ${
                !isLogin ? 'text-white' : 'text-light-text dark:text-dark-text'
              }`}
            >
              SignUp
            </button>
          </div>
        </div>
        <div className="basis-3/4 w-full">
          {isLogin ? <LogIn /> : <SignUp />}
        </div>
      </div>
    </div>
  );
};