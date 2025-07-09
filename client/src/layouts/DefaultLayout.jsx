import React from "react";
import Footer from "../components/Footer";
import HomepageHeader from "../components/HomepageHeader";
import {useGetUserProfileQuery} from '../store/apis/index.js';
import { Navigate, useLocation } from 'react-router-dom';
import { publicRoutes, protectedRoutes } from "../constants/routeLinks.js";

const DefaultLayout = ({ children }) => {
    const {pathname} = useLocation();
    const {isSuccess, isError} = useGetUserProfileQuery();
    if(isError){
      if(protectedRoutes.includes(pathname)){
        return <Navigate to='/login' />
      }
    }
    if(isSuccess){
      if(!publicRoutes.includes(pathname) && (!protectedRoutes.includes(pathname))){
        return <Navigate to='/dashboard' />
      }
    }
  return (
    <>
      <HomepageHeader />
      {children}
      <Footer />
    </>
  );
};

export default DefaultLayout;
