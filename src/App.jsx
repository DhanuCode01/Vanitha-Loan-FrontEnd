import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import LoginPage from './Pages/Login/Loginpage'
import RegisterPage from './Pages/Register/RegisterPage'
import TestOne from './test/TestOne'

function App() {

  return (
    <>
      <BrowserRouter>
      <Toaster position="top-right" />

            <Routes>    
                  <Route path="/login" element={<LoginPage/>}/> 
                  <Route path="/register" element={<RegisterPage/>}/>
                  <Route path="/*" element={<TestOne/>}/>  
            </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
