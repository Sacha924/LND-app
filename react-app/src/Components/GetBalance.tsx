
import React, { useEffect, useState } from 'react';

type AccountBalance = {
    confirmed_balance: string;
    unconfirmed_balance: string;
  }
  
type BalanceDetails = {
total_balance: string;
confirmed_balance: string;
unconfirmed_balance: string;
locked_balance: string;
reserved_balance_anchor_chan: string;
account_balance: {
    [key: string]: AccountBalance;
};
}

const GetBalance: React.FC = () => {
  const [balance, setBalance] = useState<BalanceDetails | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch('http://localhost:4000/node/getBalance');
        const data : BalanceDetails = await response.json();
        setBalance(data);
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    fetchBalance();
  }, []);

  return (
    <div className="balances">

      {balance !== null ? (
        <>
            <h2>Balances</h2>
            <p>Total balance : {balance.total_balance}</p>
            <p>Confirmed balance {balance.confirmed_balance}</p>
            <p>Unconfirmed balance {balance.unconfirmed_balance}</p>
            <p>Locked balance {balance.locked_balance}</p>
            <p>Reserved balance anchor chan {balance.reserved_balance_anchor_chan}</p>
        </>
      ) : (
        <p>Loading balance...</p>
      )}
    </div>
  );
  
};

export default GetBalance;
