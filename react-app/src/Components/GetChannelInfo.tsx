import React, { useEffect, useState } from 'react';
import internal from 'stream';

type ExtractedData = {
  num_pending_channels: number;
  num_active_channels: number;
  num_inactive_channels: number;
}
type Channel = {
  active: boolean;
  remote_pubkey: string;
  channel_point: string;
  local_balance: number;
  remote_balance: number;
}


const GetChannelInfo = () => {
  const [info, setInfo] = useState<ExtractedData | null>(null);
  const [channels, setChannels] = useState<Channel[] | null>(null);

  const fetchChannel = async () => {
    try {
      const response = await fetch('http://localhost:4000/node/getChannels');
      const data = (await response.json()).channels;
      if (Array.isArray(data)) {
        setChannels(data);
      } else {
        console.error('Data received is not an array:', data);
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const fetchInfo = async () => {
    try {
      const response = await fetch('http://localhost:4000/node/getInfo');
      const responseData = await response.json();

      const extractedData = {
        num_pending_channels: responseData.num_pending_channels,
        num_active_channels: responseData.num_active_channels,
        num_inactive_channels: responseData.num_inactive_channels,
      };

      setInfo(extractedData);
    } catch (error) {
      console.error('Erreur:', (error as Error).message);
    }
  };

  useEffect(() => {
    fetchInfo();
    fetchChannel();
  }, []);


  return (
    <div>
    {info && channels !== null && (
      <div className="channels">
        <h2>Channels</h2>
        <p>Number of Pending Channels: {info.num_pending_channels}</p>
        <p>Number of Active Channels: {info.num_active_channels}</p>
        <p>Number of Inactive Channels: {info.num_inactive_channels}</p>

        <div className="channel-list">
          {channels.map((channel, index) => (
            <div key={index} className="channel">
              <p className="channel-title">Channel number {index + 1}</p>
              <div className="channel-details">
                <p><span className="key">Active:</span> {channel.active.toString()}</p>
                <p><span className="key">Remote Public Key:</span> {channel.remote_pubkey}</p>
                <p><span className="key">Channel Point:</span> {channel.channel_point}</p>
                <p><span className="key">Local Balance:</span> {channel.local_balance}</p>
                <p><span className="key">Remote Balance:</span> {channel.remote_balance}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
  );
}

export default GetChannelInfo;