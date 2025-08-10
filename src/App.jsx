import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import LoginPage from './Pages/Login/Loginpage'
import RegisterPage from './Pages/Register/RegisterPage'
import TestOne from './test/TestOne'
import GetStart from './Pages/Start/GetStart'
import SideBar from './Components/SideBar'
import CustomerPage from './Pages/Customer/CustomerPage'
import HomePage from './Pages/Home/HomePage'
import { useMediaQuery } from 'react-responsive'


function RedirectByDevice() {
  const isMobile = useMediaQuery({ maxWidth: 767 }); // Mobile if width <= 767px
  const nav = useNavigate();

  useEffect(() => {
    if (isMobile) nav("/mobile", { replace: true });
    else nav("/desktop", { replace: true });
  }, [isMobile, nav]);

  return null; // nothing visible, just redirect
}

function App() {

  return (
    <>
      <BrowserRouter>
      <Toaster position="top-right" />

            <Routes>

                  <Route path="/" element={<RedirectByDevice />} />
                  <Route path="/mobile" element={< GetStart/>} />
                  <Route path="/desktop" element={<HomePage />} />
    
                  <Route path="/login" element={<LoginPage/>}/> 
                  <Route path="/register" element={<RegisterPage/>}/>
                  <Route path="/sidebar" element={<SideBar/>}/>
                  <Route path="/start" element={<GetStart/>}/>
                  {/* <Route path="/customer" element={<CustomerPage/>}/> */}
                  {/* <Route path="/*" element={<HomePage/>}/>  */} 
            </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
