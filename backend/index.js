const axios = require('axios');
const fs = require('fs');
const https = require('https');
require('dotenv').config()


// Lire le certificat TLS
const tlsCert = fs.readFileSync('./tls.cert');

// Créer une instance Axios pour les requêtes HTTPS
const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    ca: tlsCert, // Certificat TLS pour une connexion sécurisée
  }),
});

// Lire le macaron pour l'authentification
const macaroon = fs.readFileSync('./admin.macaroon').toString('hex');

// URL de l'API REST de lnd
const apiUrl = 'https://localhost:8080';

// Fonction pour déverrouiller le portefeuille
function unlockWallet(password) {
  axiosInstance.post(`${apiUrl}/v1/unlockwallet`, {
    wallet_password: Buffer.from(password).toString('base64'),
  }, {
    headers: {
      'Grpc-Metadata-macaroon': macaroon,
    },
  })
  .then(response => {
    console.log('Portefeuille déverrouillé:', response.data);
  })
  .catch(error => {
    console.error('Erreur:', error.message);
  });
}

// Utiliser la fonction
// unlockWallet(process.env.PASSWORD);


// Fonction pour obtenir des informations sur le réseau
function getInfo() {
  axiosInstance.get(`${apiUrl}/v1/getinfo`, {
    headers: {
      'Grpc-Metadata-macaroon': macaroon,
    },
  })
  .then(response => {
    console.log('Informations sur le réseau:', response.data);
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des informations:', error.message);
  });
}
getInfo();


// Fonction pour obtenir la wallet balance
function getBalance() {
  axiosInstance.get(`${apiUrl}/v1/balance/blockchain`, {
    headers: {
      'Grpc-Metadata-macaroon': macaroon,
    },
  })
  .then(response => {
    console.log('Informations sur le réseau:', response.data);
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des informations:', error.message);
  });
}
getBalance();

