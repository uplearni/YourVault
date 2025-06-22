import { Navigate } from "react-router-dom";
import React from 'react';

const ProtectRoute = ({ children, user, redirect = "/login" }) => {
  if (!user) return <Navigate to={redirect} />;
  return children;
};

export default React.memo(ProtectRoute);