const axios = require('axios');

const tykBaseUrl = process.env.TYK_GW_URL || 'http://localhost:8080';
const tykSecretKey = process.env.TYK_GW_SECRET || 'changeme';

module.exports = axios.create({
    baseURL: tykBaseUrl,
    headers: { 'X-Tyk-Authorization': tykSecretKey }
});