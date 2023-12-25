import React, { useEffect, useState } from 'react';
import internal from 'stream';

type ExtractedData = {
  num_pending_channels: number;
  num_active_channels: number;
  num_inactive_channels: number;
}



const GetChannelInfo = () => {
  const [info, setInfo] = useState<ExtractedData | null>(null);

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
  console.log(info)

  useEffect(() => {
    fetchInfo();
  }
  , []);

  return (
    <div>   
      {info && (
        <div className="channels">
          <h2>Channels</h2>
          <p>Number of Pending Channels: {info.num_pending_channels}</p>
          <p>Number of Active Channels: {info.num_active_channels}</p>
          <p>Number of Inactive Channels: {info.num_inactive_channels}</p>
        </div>
      )}
    </div>
  );
};

export default GetChannelInfo;