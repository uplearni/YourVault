import React, { useState } from 'react';

export const LogIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="flex flex-col justify-evenly gap-y-6 px-4 w-full">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-light-text dark:text-dark-text">
          Email:
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 w-full bg-light-secondary dark:bg-dark-secondary text-light-text dark:text-white rounded-md px-3 py-1.5 placeholder-light-text/70 dark:placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent transition-colors duration-200"
          placeholder="Enter your Email"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-light-text dark:text-dark-text">
          Enter Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="mt-1 w-full bg-light-secondary dark:bg-dark-secondary text-light-text dark:text-white rounded-md px-3 py-1.5 placeholder-light-text/70 dark:placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent transition-colors duration-200"
          placeholder="Enter Password"
        />
      </div>
      <div>
      <div className='flex items-center justify-center'>
        <button
          aria-label="Log in"
          className="px-6 py-2 bg-light-primary dark:bg-dark-primary text-white rounded-md hover:bg-light-secondary dark:hover:bg-dark-secondary hover:text-light-primary dark:hover:text-dark-primary hover:border hover:border-light-primary dark:hover:border-dark-primary focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent focus:ring-offset-2 focus:ring-offset-light-secondary dark:focus:ring-offset-dark-secondary transition-colors duration-200"
        >
          LogIn
        </button>
        </div>
      </div>
    </div>
  );
};