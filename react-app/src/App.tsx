import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Components/Layout';
import Home from './pages/Home';
import UnlockWallet from './Components/UnlockWallet';
import { AuthProvider } from './context/AuthContext';
import PrivateRoot from './Components/PrivateRoot';
import  Channels from './pages/Channels';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UnlockWallet />} />
          <Route element={<Layout />}>
            <Route path="/Home" element={
              <PrivateRoot><Home /></PrivateRoot>
            } />
            <Route path="/Dashboard" element={
              <PrivateRoot><Dashboard /></PrivateRoot>
            } />
            <Route path="/Channels" element={
              <PrivateRoot><Channels /></PrivateRoot>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
