const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

let apiKeys = {}; // Menyimpan API Key yang valid

// Endpoint untuk mendapatkan API Key
router.post('/get-api-key', (req, res) => {
  const apiKey = uuidv4();
  apiKeys[apiKey] = true; // Simpan API Key
  res.json({ apiKey });
});

// Endpoint untuk validasi API Key dan redirect
router.post('/validate-api-key', (req, res) => {
  const { apiKey } = req.body;
  if (apiKeys[apiKey]) {
    res.json({ redirectUrl: 'https://www.api.im-rerezz.xyz' });
  } else {
    res.status(401).json({ error: 'Invalid API Key' });
  }
});

module.exports = router;
