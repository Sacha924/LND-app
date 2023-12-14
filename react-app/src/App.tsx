import React from 'react';
import UnlockWallet from './Components/UnlockWallet';
import GetInfo from './Components/GetInfo';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './Components/Layout';
import Home from './Components/Home';


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UnlockWallet />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/GetInfo" element={<GetInfo />} />
          
        </Routes>
      </BrowserRouter>
    </div>
    
  );
};

export default App;