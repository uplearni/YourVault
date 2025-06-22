import {lazy , Suspense, useState,useEffect} from 'react'//to import only whats needed 
import {BrowserRouter , Routes, Route} from 'react-router-dom';
import ProtectRoute from './components/ProtectRoute';
import AppLayout from './components/layout/AppLayout';
import LayoutLoader from "./components/LayoutLoader";
import {Auth} from "./pages/Auth";
import {Dashboard} from "./pages/Dashboard";
import {Collection} from "./pages/Collection";
import {NotFound} from "./pages/NotFound";
import authStore from './store/authStore';


//const LayoutLoader=lazy(()=>import("./components/LayoutLoader"));
//const Auth=lazy(()=>import("./pages/Auth"));
//const Dashboard=lazy(()=>import("./pages/Dashboard"));
//const Collection=lazy(()=>import("./pages/Collection"));
//const NotFound=lazy(()=>import("./pages/NotFound"));


function App() {
 const token = authStore((state) => state.token);
 const user = !!token;


  return (
     <>
     <BrowserRouter>
       <Suspense fallback={<div><LayoutLoader/></div>}>
       <Routes>
           <Route path='/' element={<ProtectRoute user={user}> <AppLayout><Dashboard/> </AppLayout></ProtectRoute>}/>
           <Route path='/login' element={<ProtectRoute user={!user} redirect='/'><Auth/>  </ProtectRoute>}/>
           <Route path='/collection/:id' element={ <AppLayout>  <Collection/> </AppLayout>}/>

           <Route path='*' element={<NotFound/>}/>
       </Routes>
       </Suspense>
     </BrowserRouter>
    </>
  )
}

export default App
