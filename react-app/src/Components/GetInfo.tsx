import React, { useEffect, useState } from 'react';
import internal from 'stream';

type ExtractedData = {
  version: string;
  identity_pubkey: string;
  alias: string;
  num_pending_channels: number;
  num_active_channels: number;
  num_inactive_channels: number;
  chain_info: string;
}



const GetInfo = () => {
  const [info, setInfo] = useState<ExtractedData | null>(null);

  const fetchInfo = async () => {
    try {
      const response = await fetch('http://localhost:4000/node/getInfo');
      const responseData = await response.json();

      const extractedData = {
        version: responseData.version,
        identity_pubkey: responseData.identity_pubkey,
        alias: responseData.alias,
        num_pending_channels: responseData.num_pending_channels,
        num_active_channels: responseData.num_active_channels,
        num_inactive_channels: responseData.num_inactive_channels,
        chain_info: responseData.chains.map((chain: { chain: string; network: string; }) => `${chain.chain} (${chain.network})`).join(", ")
      };

      setInfo(extractedData);
    } catch (error) {
      console.error('Erreur:', (error as Error).message);
    }
  };
  console.log(info)

  useEffect(() => {
    fetchInfo();
  }
  , []);

  return (
    <div>   
      {info && (
        <div>
          <p>Version: {info.version}</p>
          <p>Identity PubKey: {info.identity_pubkey}</p>
          <p>Alias: {info.alias}</p>
          <p>Number of Pending Channels: {info.num_pending_channels}</p>
          <p>Number of Active Channels: {info.num_active_channels}</p>
          <p>Number of Inactive Channels: {info.num_inactive_channels}</p>
          <p>Chain Info: {info.chain_info}</p>
        </div>
      )}
    </div>
  );
};

export default GetInfo;
