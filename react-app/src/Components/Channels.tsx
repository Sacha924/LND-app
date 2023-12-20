import React, { useEffect, useState } from 'react'
import SendPayment from './SendPayment';
import CreateInvoice from './CreateInvoice';

export const Channels = () => {
    const [channels, setChannels] = useState(null);
    const [nodePubKey, setNodePubKey] = useState('');
    const [localFundingAmount, setLocalFundingAmount] = useState('');
    const [pushSat, setPushSat] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);

    const fetchChannel = async () => {
        try {
          const response = await fetch('http://localhost:4000/node/getChannels');
          const data = await response.json();
          setChannels(data);
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
    };

    useEffect(() => {
      fetchChannel();
    }, []);

    const openChannel = async () => {
    try {
      const response = await fetch('http://localhost:4000/node/openChannel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          node_pubkey: nodePubKey,
          local_funding_amount: localFundingAmount,
          push_sat: pushSat,
          private: isPrivate,
        }),
      });
      const data = await response.json();
      console.log('Channel opened:', data);
      fetchChannel();
    } catch (error) {
      console.error('Error opening channel:', error);
    }
  };
  
  return (
    <div>
      <CreateInvoice />
      <SendPayment />

      <h2>Open a Channel</h2>


      <form onSubmit={(e) => {
        e.preventDefault();
        openChannel();
      }}>
        <input 
          type="text"
          value={nodePubKey}
          onChange={(e) => setNodePubKey(e.target.value)}
          placeholder="Node Public Key"
        />
        <input 
          type="number"
          min={20000}
          value={localFundingAmount}
          onChange={(e) => setLocalFundingAmount(e.target.value)}
          placeholder="Local Funding Amount"
        />
        <input 
          type="number"
          value={pushSat}
          onChange={(e) => setPushSat(e.target.value)}
          placeholder="Push Satoshis"
        />
        <label>
          Private Channel:
          <input 
            type="checkbox"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
          />
        </label>
        <button type="submit">Open Channel</button>
      </form>
      {channels !== null ? (
        <>
          <p>Open channels that you participate in:</p>
          <pre>{JSON.stringify(channels, null, 2)}</pre>
        </>
      ) : (
        <p>Loading channels...</p>
      )}
    </div>
  );
};