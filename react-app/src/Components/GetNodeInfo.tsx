import React, { useEffect, useState } from 'react';
import internal from 'stream';

type ExtractedData = {
  version: string;
  identity_pubkey: string;
  alias: string;
  chain_info: string;
}



const GetNodeInfo = () => {
  const [info, setInfo] = useState<ExtractedData | null>(null);

  const fetchInfo = async () => {
    try {
      const response = await fetch('http://localhost:4000/node/getInfo');
      const responseData = await response.json();

      const extractedData = {
        version: responseData.version,
        identity_pubkey: responseData.identity_pubkey,
        alias: responseData.alias,
        chain_info: responseData.chains.map((chain: { chain: string; network: string; }) => `${chain.chain} (${chain.network})`).join(", ")
      };

      setInfo(extractedData);
    } catch (error) {
      console.error('Erreur:', (error as Error).message);
    }
  };

  useEffect(() => {
    fetchInfo();
  }
  , []);

  return (
    <div>   
      {info && (
        <div className="node-information">
          <h2>Node Information</h2>
          <p>Version: {info.version}</p>
          <p>Identity PubKey: {info.identity_pubkey}</p>
          <p>Alias: {info.alias}</p>
          <p>Chain Info: {info.chain_info}</p>
        </div>
      )}
    </div>
  );
};

export default GetNodeInfo;
