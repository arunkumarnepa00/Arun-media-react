import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from './apihelper/authcalls';

const PrivateRoutes = () => {
    const auth = isAuthenticated();
    return (
        auth ? <Outlet /> : <Navigate to="/login" />
    )
}


export default PrivateRoutes;