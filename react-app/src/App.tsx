import React from 'react';
import UnlockWallet from './Components/UnlockWallet';
import GetInfo from './Components/GetInfo';


const App = () => {
  return (
    <div>
      <h1>Lightning Network Dashboard</h1>
      <UnlockWallet />
      <GetInfo />
    </div>
  );
};

export default App;