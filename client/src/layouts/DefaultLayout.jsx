import React, { useEffect } from "react";
import Footer from "../components/Footer";
import HomepageHeader from "../components/HomepageHeader";
import { useGetUserProfileQuery } from "../store/apis/index.js";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { publicRoutes, protectedRoutes } from "../constants/routeLinks.js";

const DefaultLayout = ({ children }) => {
  const { pathname } = useLocation();
  const { isSuccess, isError } = useGetUserProfileQuery();
  const navigate = useNavigate();
  useEffect(() => {
    if (isError) {
      if (protectedRoutes.includes(pathname)) {
        navigate('/login');
        return;
      }
    }
    if (isSuccess) {
      if (
        !publicRoutes.includes(pathname) &&
        !protectedRoutes.includes(pathname)
      ) {
        navigate('/dashboard');
        return;
      }
    }
  }, [pathname, isSuccess, isError, navigate]);
  return (
    <>
      <HomepageHeader />
      {children}
      <Footer />
    </>
  );
};

export default DefaultLayout;
