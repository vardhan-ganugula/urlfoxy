import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPassword";
import VerifyPage from "./pages/VerifyUser";
import DashboardPage from "./pages/DashboardPage";
import Settings from "./pages/Settings";
const App = () => {

  
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify/:verifyToken" element={<VerifyPage />} />
        <Route
          path="/reset-password/:resetToken"
          element={<ResetPasswordPage />}
        />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
};

export default App;
