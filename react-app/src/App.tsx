import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Components/Layout';
import Home from './Components/Home';
import GetInfo from './Components/GetInfo';
import GetBalance from './Components/GetBalance';

import UnlockWallet from './Components/UnlockWallet';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UnlockWallet />} />
        <Route element={<Layout />}>
          <Route path="/Home" element={<Home />} />
          <Route path="/GetInfo" element={<GetInfo />} />
          <Route path="/Balance" element={<GetBalance />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
