  import React, {  useState ,useEffect} from 'react';
  import {  useShallow } from 'zustand/shallow'; // Import useShallow
  import { useNavigate } from 'react-router-dom';
  import authStore from '../../store/authStore';
  import api from '../../utils/axios';

  export const LogIn = () => {
    const { token } = authStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

    const [showPassword,setShowPassword]=useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });

    const {loading, error, setAuth, setLoading, setError } = authStore(useShallow(
      (state) => ({
        loading: state.loading,
        error: state.error,
        setAuth: state.setAuth,
        setLoading: state.setLoading,
        setError: state.setError,
      })),
    );

    const handleChange = (e) =>{
      setFormData({ ...formData, [e.target.name]: e.target.value });
      if (error) setError(null);//if theres any error clear it as soon as the user start typing
    } 

    const handleLogin = async (e) => {
      e.preventDefault();
      console.log("sending data for login");
      setLoading(true);
      setError(null);

      if (!formData.email || !formData.password) {
        setError('Please fill all the fields');
        setLoading(false);
        return;
      }
      
      try {
      console.log("sending request");
        const response = await api.post('/user/login', formData);
        const { token, userId, name } = response.data;
        setAuth(token, userId, name);
        console.log("got response");
      } catch (err) {
        const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
        setError(errorMessage);
      console.log(errorMessage);
      } finally {
        setLoading(false);
      }
    };

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
          <div className="relative">
    <input
      id="password"
      name="password"
      type={showPassword ? 'text' : 'password'}
      value={formData.password}
      onChange={handleChange}
      required
      className="mt-1 w-full bg-light-secondary dark:bg-dark-secondary text-light-text dark:text-white rounded-md px-3 py-1.5 pr-10 placeholder-light-text/70 dark:placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent transition-colors duration-200"
      placeholder="Enter Password"
    />

    <span 
      onClick={() => setShowPassword(!showPassword)}
      className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-light-primary dark:text-dark-primary"
    >
      {showPassword ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
  :
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
  </svg>
  }
    </span>
  </div>

        </div>
        <div>
          <div className="flex items-center justify-center">
            <button
    onClick={handleLogin}
    disabled={loading || !formData.email || !formData.password}
    aria-label="Log in"
    className={`px-6 py-2 rounded-md transition-colors duration-200
      ${(!formData.email || !formData.password || loading)
        ? 'bg-gray-400 cursor-not-allowed'
        : 'bg-light-primary dark:bg-dark-primary text-white hover:bg-light-secondary dark:hover:bg-dark-secondary hover:text-light-primary dark:hover:text-dark-primary'}
    `}
  >
    {loading ? 'Logging In...' : 'LogIn'}
  </button>
          </div>
          {error && <p className="text-light-text dark:text-white text-sm text-center mt-5">{error}</p>}
        </div>
      </div>
    );
  };

  export default LogIn;