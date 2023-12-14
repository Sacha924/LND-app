import React, { useState } from 'react';

const GetInfo = () => {
  const [info, setInfo] = useState(null);

    const fetchInfo = async () => {
      try {
        const response = await fetch('http://localhost:4000/node/getInfo');
        const responseData = await response.json();
        setInfo(responseData);
      } catch (error) {
        console.error('Erreur:', (error as Error).message);
      }
    };


  return (
    <div>
      <p> Renvoie des informations générales concernant le nœud Lightning, y compris son identité pubkey, alias, les chaînes auxquelles 
        il est connecté et des informations concernant le nombre de canaux ouverts et en attente</p>
        <button onClick={fetchInfo}>Get Info</button>
      {info && <pre>{JSON.stringify(info, null, 2)}</pre>}
    </div>
  );
};

export default GetInfo;
