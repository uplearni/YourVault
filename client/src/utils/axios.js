    import axios from 'axios';

    //this create a custom instance of axios called api 
    const api=axios.create({
        baseURL:'/api'//all our calls will start from this '/' , this is we used in our backend for root router
    })

    //interceptor: runs before every request is send 
    //we are adding token in header here because almost every request that is sended need the token to move forward 
    //instead of adding it everytime we just add it here 
    api.interceptors.request.use(
        (config) =>{
        const token=localStorage.getItem('token');//get token from local storage in browser

        if(token && config.url !== '/user/login' && config.url !== '/user/signup'){//if token exist
            config.headers.Authorization=`Bearer ${token}`;//add token to header 
        }
        return config;    
        },
        (error)=>{//if something goes wrong while sending the request it rejects the promise 
            if (error.response && error.response.status === 401) {
        // if the token gets expired or is invalid then redirect to login page 
            localStorage.removeItem('token'); // Clear token
            window.location.href = '/login';  // Redirect to login page
        }
        return Promise.reject(error);
        }
    );

    //this is response interceptor which runs after we get a response 
    api.interceptors.response.use(
        //pass whatever we got either the response or the error just pass it through 
    (response) => response,
    (error) => Promise.reject(error)
    );

    export default api;