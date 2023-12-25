const os = require('os');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const https = require('https');

const homeDirectory = os.homedir();

const tlsCertPath = path.join(homeDirectory, '.lnd', 'tls.cert');
const adminMacaroonPath = path.join(homeDirectory, '.lnd', 'data', 'chain', 'bitcoin', 'signet', 'admin.macaroon');

try {
  tlsCert = fs.readFileSync(tlsCertPath);
} catch (err) {
  console.error(`Erreur lors de la lecture de tls.cert : ${err.message}`);
  throw err;
}

try {
  macaroon = fs.readFileSync(adminMacaroonPath).toString('hex');   // auth
} catch (err) {
  console.error(`Erreur lors de la lecture de admin.macaroon : ${err.message}`);$
  throw err;
}

const apiUrl = 'https://localhost:8080';


// instance axios pour requêtes HTTPS (d'où la nécéssité du certif TLS)
const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
    ca: tlsCert,
  }),
});

module.exports = { axiosInstance, macaroon, apiUrl };