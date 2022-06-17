import React from 'react'
import { Navigate } from "react-router-dom";
import { useContext } from 'react';
import AuthContext from '../../context/auth/authContext'

export const ProtectedRoute = ({ children }) => {

    const authContext = useContext(AuthContext)

    const {isAuthenticated , loading} = authContext;
  
    if (!isAuthenticated && !loading) {
        // user is not authenticated
        return <Navigate to="/login" />;
      }
      return children;
}
