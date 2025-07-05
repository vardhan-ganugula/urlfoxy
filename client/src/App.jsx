import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Homepage from './pages/Homepage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPassword'
import {Provider} from 'react-redux';
import reduxStore from './store/index'

const App = () => {
  return (
    <>
      <Provider store={reduxStore}>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<SignupPage />} />
          <Route path='/forgot-password' element={<ForgotPasswordPage />} />
          <Route path='/:resetToken/reset-password' element={<ResetPasswordPage />} />
        </Routes>
      </Provider>
    </>
  )
}

export default App