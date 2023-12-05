import React, { useState } from 'react';

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
            // const responseData = await response.json();
            // console.log('Portefeuille déverrouillé:', responseData);
        } catch (error) {
            console.error('Erreur:', (error as Error).message);
        }
    };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Enter wallet password"
      />
      <button type="submit">Unlock Wallet</button>
    </form>
  );
};

export default UnlockWallet;
