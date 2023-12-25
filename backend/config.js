const os = require('os');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const https = require('https');

const homeDirectory = os.homedir();

const tlsCertPath = path.join(homeDirectory, '.lnd', 'tls.cert');
const adminMacaroonPath = path.join(homeDirectory, '.lnd', 'data', 'chain', 'bitcoin', 'signet', 'admin.macaroon');

const tlsCert = fs.readFileSync(tlsCertPath);
const macaroon = fs.readFileSync(adminMacaroonPath).toString('hex');   // auth
const apiUrl = 'https://localhost:8080';


// instance axios pour requêtes HTTPS (d'où la nécéssité du certif TLS)
const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
    ca: tlsCert,
  }),
});

module.exports = { axiosInstance, macaroon, apiUrl };