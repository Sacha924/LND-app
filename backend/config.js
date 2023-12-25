const fs = require('fs');
const axios = require('axios');
const https = require('https');

const tlsCert = fs.readFileSync('./tls.cert');
const macaroon = fs.readFileSync('./admin.macaroon').toString('hex');   // auth
const apiUrl = 'https://127.0.0.1:8082';

// instance axios pour requêtes HTTPS (d'où la nécéssité du certif TLS)
const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
    ca: tlsCert,
  }),
});

module.exports = { axiosInstance, macaroon, apiUrl };