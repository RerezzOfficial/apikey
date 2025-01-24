const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware untuk parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Menyajikan file HTML di folder public
app.use(express.static(path.join(__dirname, 'public')));

// Fungsi untuk memuat API key dari file
const loadApiKeys = () => {
  const data = fs.readFileSync(path.join(__dirname, 'apikey.json'));
  const parsed = JSON.parse(data);
  return parsed.keys;
};

// Fungsi untuk menyimpan API key baru
const saveApiKey = (newKey) => {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'apikey.json')));
  data.keys.push(newKey);
  fs.writeFileSync(path.join(__dirname, 'apikey.json'), JSON.stringify(data, null, 2));
};

// Endpoint untuk validasi API key
app.get('/api/turbo', (req, res) => {
  const apiKey = req.query.apikey;
  const message = req.query.message;

  if (!apiKey || !message) {
    return res.status(400).json({ error: 'API key atau parameter "message" tidak ditemukan' });
  }

  const validApiKeys = loadApiKeys();
  if (!validApiKeys.includes(apiKey)) {
    return res.status(403).json({ error: 'API key tidak valid' });
  }

  // Jika valid, proses permintaan
  res.status(200).json({
    status: 200,
    creator: 'IM-REREZZ',
    message: `Pesan diterima: ${message}`
  });
});

// Endpoint untuk membuat API key baru
app.post('/api/create-key', (req, res) => {
  const newApiKey = req.body.apikey;
  if (!newApiKey) {
    return res.status(400).json({ error: 'Parameter "apikey" diperlukan' });
  }

  saveApiKey(newApiKey);
  res.status(201).json({ status: 'success', apikey: newApiKey });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
