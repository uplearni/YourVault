import { Navigate } from "react-router-dom"

const  ProtectRoute=({children,user,redirect="/LogIn"})=>{
   if(!user) return <Navigate to={redirect} />
   return children;
}

export default ProtectRoute