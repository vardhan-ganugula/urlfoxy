import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Homepage from './pages/Homepage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
const App = () => {
  return (
    <>
      <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<SignupPage />} />
      </Routes>
    </>
  )
}

export default App