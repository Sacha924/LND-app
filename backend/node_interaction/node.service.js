const { axiosInstance, macaroon, apiUrl } = require('../config');


// Fonction pour unlock le wallet
const unlockWallet = (req, res) => {
  const password = req.body.password;
  axiosInstance.post(`${apiUrl}/v1/unlockwallet`, {
    wallet_password: Buffer.from(password).toString('base64'),
  }, {
    headers: {
      'Grpc-Metadata-macaroon': macaroon,
    },
  })
  .then(response => {
    console.log('Portefeuille déverrouillé:', response.data);
    res.status(200).json(response.data);
  })
  .catch(error => {
    console.error('Erreur:', error.message);
    res.status(500).json({ message: error.message });
  });
};

   
// infos sur le réseau
const getInfo = (req, res) => {
  axiosInstance.get(`${apiUrl}/v1/getinfo`, {
  headers: {
    'Grpc-Metadata-macaroon': macaroon,
  },
  })
  .then(response => {
    console.log('Informations sur le réseau:', response.data);
    res.status(200).json(response.data);
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des informations:', error.message);
    res.status(500).json({ message: error.message });
  });
};

  
const getBalance = (req, res) => {
  axiosInstance.get(`${apiUrl}/v1/balance/blockchain`, {
  headers: {
    'Grpc-Metadata-macaroon': macaroon,
  },
  })
  .then(response => {
    console.log('Balance:', response.data);
    res.status(200).json(response.data);
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des informations:', error.message);
    res.status(500).json({ message: error.message });
  });
};

module.exports = {
    unlockWallet, 
    getInfo,
    getBalance
}