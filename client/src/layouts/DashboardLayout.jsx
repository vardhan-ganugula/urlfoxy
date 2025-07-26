import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useGetUserProfileQuery } from "../store/apis";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

export const DashboardLayout = ({ children }) => {
  const { isSuccess, isError, isLoading } = useGetUserProfileQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && (isError || !isSuccess)) {
      navigate("/login");
    }
  }, [isError, isSuccess, isLoading, navigate]);

  if (isLoading) {
    return <Loader />;
  }

  if (!isSuccess) {
    return null;
  }

  return (
    <div className="w-screen h-screen flex bg-zinc-900 text-white">
      <Sidebar />
      <main className="flex-grow">{children}</main>
    </div>
  );
};
