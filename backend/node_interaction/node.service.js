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

const getChannels = (req, res) => {
  axiosInstance.get(`${apiUrl}/v1/channels`, {
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

const openChannel = (req, res) => {
  const { node_pubkey, local_funding_amount, push_sat, private } = req.body;
  
  axiosInstance.post(`${apiUrl}/v1/channels`, {
    node_pubkey_string: node_pubkey,
    local_funding_amount,
    push_sat,
    private
  }, {
    headers: {
      'Grpc-Metadata-macaroon': macaroon,
    }
  })
  .then(response => {
    console.log("res",response);
    res.status(200).json(response.data);
  })
  .catch(error => {
    console.log("err",error);
    res.status(500).json({ message: error.message });
  });
};

const closeChannel = (req, res) => {
  const { channel_point, force } = req.body;
  const [funding_txid, output_index] = channel_point.split(':');

  axiosInstance.delete(`${apiUrl}/v1/channels/${funding_txid}/${output_index}`, {
    data: { force }
  }, {
    headers: {
      'Grpc-Metadata-macaroon': macaroon,
    }
  })
  .then(response => {
    res.status(200).json(response.data);
  })
  .catch(error => {
    res.status(500).json({ message: error.message });
  });
};

const sendPayment = (req, res) => {
  const { payment_request } = req.body;

  axiosInstance.post(`${apiUrl}/v1/channels/transactions`, {
    payment_request
  }, {
    headers: {
      'Grpc-Metadata-macaroon': macaroon,
    }
  })
  .then(response => {
    res.status(200).json(response.data);
  })
  .catch(error => {
    res.status(500).json({ message: error.message });
  });
};

const createInvoice = (req, res) => {
  const { memo, value, expiry } = req.body;
  
  axiosInstance.post(`${apiUrl}/v1/invoices`, {
    memo,
    value,
    expiry
  }, {
    headers: {
      'Grpc-Metadata-macaroon': macaroon,
    }
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
    getBalance,
    getChannels,
    openChannel,
    closeChannel,
    sendPayment,
    createInvoice
}