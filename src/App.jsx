import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import LoginPage from './Pages/Login/Loginpage'
import RegisterPage from './Pages/Register/RegisterPage'
import TestOne from './test/TestOne'
import Header from './Components/header'
import GetStart from './Pages/Start/GetStart'
import SideBar from './Components/SideBar'
import CustomerPage from './Pages/Customer/CustomerPage'
import HomePage from './Pages/Home/HomePage'

function App() {

  return (
    <>
      <BrowserRouter>
      <Toaster position="top-right" />

            <Routes>    
                  <Route path="/login" element={<LoginPage/>}/> 
                  <Route path="/register" element={<RegisterPage/>}/>
                  <Route path="/header" element={<Header/>}/>
                  <Route path="/sidebar" element={<SideBar/>}/>
                  <Route path="/start" element={<GetStart/>}/>
                  {/* <Route path="/customer" element={<CustomerPage/>}/> */}
                  <Route path="/*" element={<HomePage/>}/>  
            </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
