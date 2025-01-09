import logo from './logo.svg';
import './App.css';
import React from "react";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashBoardPage";
import ServicesPage from './pages/ServicesPage';
import ServiceProviderPage from './pages/ServiceProviderPage';
import DemoMap from './pages/DemoMap';
import SignupPage from './pages/SignupPage';
import ServiceSignin from './pages/ServiceSignin';
import ServiceLogin from './pages/ServiceLogin'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/servicepage" element={<ServicesPage/>} />
        <Route path="/servicesignup" element={<ServiceSignin/>} />
        <Route path="/servicelogin" element={<ServiceLogin />} />
        <Route path="/service-provider/:service" element={<ServiceProviderPage />} />
        <Route path="/demomap" element={<DemoMap />} />
      </Routes>
    </Router>
  );
}


export default App;
