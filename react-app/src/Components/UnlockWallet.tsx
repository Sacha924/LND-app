import React, { useEffect, useState } from 'react';
import './../style/UnlockWallet.css'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UnlockWallet = () => {
    const [password, setPassword] = useState('');
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth?.isAuthenticated) {
            navigate("/Home");
        }
      }, [auth?.isAuthenticated]); 


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
                auth?.login();
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
