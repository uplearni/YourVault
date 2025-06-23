    import {create} from 'zustand';
    import {persist} from 'zustand/middleware';

    //creating a global store for auth 
    const authStore=create(
    persist(
        (set)=>({//set is used t update the state of the store
        token:null,//we need token
        userId:null,
        name:null,
        email:null,
        error:null,
        loading :false,//it means we are still checking user status 

        //defineing  what we can do with auth 
        setAuth:(token,userId,name,email)=>//once we set the auth with all the required item 
            set(()=>{
                return { token, userId, name,email, loading: false ,error:null};//set loading as false 
        }),

        setLoading:(loading)=>set({loading}),
        setError:(error)=>set({error}),

        clearAuth:()=>//when logout clear the local storage 
            set(()=>{
                return {token:null,userId:null,name:null,email:null,loading:false,error:null};
            }),
    }),
    {
        name:'auth-storage',

    }
    ));

    export default authStore;