import React from "react";
import Footer from "../components/Footer";
import HomepageHeader from "../components/HomepageHeader";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <HomepageHeader />
      {children}
      <Footer />
    </>
  );
};

export default DefaultLayout;
