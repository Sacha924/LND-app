import React, { useEffect, useState } from 'react'
import SendPayment from './../Components/SendPayment';
import CreateInvoice from './../Components/CreateInvoice';
import "./../style/Channels.css";
import CloseChannel from './../Components/CloseChannel';

export default function Channels() {
    const [channels, setChannels] = useState(null);
    const [nodePubKey, setNodePubKey] = useState('');
    const [localFundingAmount, setLocalFundingAmount] = useState('');
    const [pushSat, setPushSat] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);

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
    } catch (error) {
      console.error('Error opening channel:', error);
    }
  };
  
  return (
    <div className="channels-container">
      <div className="channels-forms-components">
        <CreateInvoice />
        <SendPayment />
        <CloseChannel />
      </div>
      <h2>Open a Channel</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        openChannel();
      }} className="channels-form">
          <input 
          type="text"
          className="channels-input"
          value={nodePubKey}
          onChange={(e) => setNodePubKey(e.target.value)}
          placeholder="Node Public Key"
        />
        <input 
          type="number"
          className="channels-input"
          min={20000}
          value={localFundingAmount}
          onChange={(e) => setLocalFundingAmount(e.target.value)}
          placeholder="Local Funding Amount"
        />
        <input 
          type="number"
          className="channels-input"
          value={pushSat}
          onChange={(e) => setPushSat(e.target.value)}
          placeholder="Push Satoshis"
        />
        <label>
          Private Channel:
          <input 
            type="checkbox"
            className="channels-input"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
          />
        </label>
        <button type="submit" className="channels-button">Open Channel</button>
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