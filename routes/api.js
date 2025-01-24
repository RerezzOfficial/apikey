const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

let apiKeys = {}; // Temporary in-memory storage for API Keys

// Endpoint to generate a new API Key
router.post('/get-api-key', (req, res) => {
  const apiKey = uuidv4(); // Generate a unique API Key
  apiKeys[apiKey] = true;  // Save the API Key as valid
  res.json({ apiKey });    // Return the API Key
});

// Endpoint to validate an API Key
router.post('/validate-api-key', (req, res) => {
  const { apiKey } = req.body;
  if (apiKeys[apiKey]) {
    res.json({ redirectUrl: 'https://www.api.im-rerezz.xyz' }); // Valid Key
  } else {
    res.status(401).json({ error: 'Invalid API Key' });         // Invalid Key
  }
});

module.exports = router;
