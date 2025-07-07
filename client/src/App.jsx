import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPassword";
import { checkAuth } from "./store/slices/auth.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import VerifyPage from "./pages/VerifyUser";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [])
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify/:verifyToken" element={<VerifyPage />} />
        <Route
          path="/:resetToken/reset-password"
          element={<ResetPasswordPage />}
        />
      </Routes>
    </>
  );
};

export default App;
