const { Client } = require('pg');

const client = new Client(process.env.PG_URL);

// on connecte le client
client.connect();

// on exporte le client déjà connecté
module.exports = client;