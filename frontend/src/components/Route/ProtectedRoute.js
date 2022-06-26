import React, { Component, Fragment } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";


const ProtectedRoute = ({Component}) => {

    const {loading,isAuthenticated}=useSelector(state=>state.user)

    return isAuthenticated ? <Component/> : <Navigate to="/login"/>
};

export default ProtectedRoute;
