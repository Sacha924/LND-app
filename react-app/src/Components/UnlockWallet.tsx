import React, { useState } from 'react';
import './../style/UnlockWallet.css'

const UnlockWallet = () => {
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/node/unlockWallet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({password})
            });
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            else{
                window.location.href = "/Home";
            }
        } catch (error) {
            console.error('Erreur:', (error as Error).message);
        }
    };

    return (
      <div className="unlock-container">
          <form className="unlock-form" onSubmit={handleSubmit}>
              <h1>Unlock Your Wallet</h1>
              <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Enter wallet password"
              />
              <button type="submit">Unlock Wallet</button>
          </form>
      </div>
  );
};

export default UnlockWallet;
