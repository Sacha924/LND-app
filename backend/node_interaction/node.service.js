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
    res.status(200).json(response.data);
  })
  .catch(error => {
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
    res.status(200).json(response.data);
  })
  .catch(error => {
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
    res.status(200).json(response.data);
  })
  .catch(error => {
    res.status(500).json({ message: error.message });
  });
};

module.exports = {
    unlockWallet, 
    getInfo,
    getBalance
}