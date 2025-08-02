
import React from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import Button from "../components/Button";
import Cat from '../assets/imgs/uclip-cat.webp'
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <DefaultLayout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 pt-[20vh] bg-zinc-900 pb-[50vh]">
        <img
          src={Cat}
          alt="404 Cat"
          className="w-40 h-40 object-contain mb-6 drop-shadow-lg animate-bounce"
        />
        <h1 className="text-5xl md:text-7xl font-extrabold text-primary mb-4 main-title">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-zinc-100">Page Not Found</h2>
        <p className="text-zinc-400 mb-8 max-w-md mx-auto">
          Oops! The page you are looking for does not exist or has been moved.<br />
          Let's get you back to safety.
        </p>
        <Button
          variant="glowy"
          className="text-lg"
          onClick={() => navigate("/")}
        >
          Go to Homepage
        </Button>
      </div>
    </DefaultLayout>
  );
};

export default React.memo(NotFound);