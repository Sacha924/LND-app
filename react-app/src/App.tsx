import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Components/Layout';
import Home from './Components/Home';
import GetInfo from './Components/GetInfo';
import GetBalance from './Components/GetBalance';
import UnlockWallet from './Components/UnlockWallet';
import { AuthProvider } from './context/AuthContext';
import PrivateRoot from './Components/PrivateRoot';
import { Channels } from './Components/Channels';

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
            <Route path="/GetInfo" element={
              <PrivateRoot><GetInfo /></PrivateRoot>
            } />
            <Route path="/Balance" element={
              <PrivateRoot><GetBalance /></PrivateRoot>
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
