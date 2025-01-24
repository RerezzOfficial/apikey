const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

let apiKeys = {}; // Menyimpan API key yang valid

// Endpoint untuk mendapatkan API key
router.post('/get-api-key', (req, res) => {
  const apiKey = uuidv4();
  apiKeys[apiKey] = true; // Simpan API key
  res.json({ apiKey });
});

// Endpoint untuk reset API key
router.post('/reset-api-key', (req, res) => {
  const { apiKey } = req.body;
  if (apiKeys[apiKey]) {
    delete apiKeys[apiKey]; // Hapus API key lama
    const newApiKey = uuidv4();
    apiKeys[newApiKey] = true; // Simpan API key baru
    res.json({ apiKey: newApiKey });
  } else {
    res.status(400).json({ error: 'Invalid API Key' });
  }
});

// Middleware untuk validasi API key
function validateApiKey(req, res, next) {
  const apiKey = req.headers['x-api-key']; // Mengambil API key dari header request
  if (apiKeys[apiKey]) {
    next(); // API key valid, lanjutkan request
  } else {
    res.status(401).json({ error: 'Invalid API Key' });
  }
}

// Contoh endpoint API dengan validasi API key
router.post('/example', validateApiKey, (req, res) => {
  res.json({
    message: 'API Key is valid! You have successfully accessed this endpoint.',
    yourData: req.body
  });
});

module.exports = router;
