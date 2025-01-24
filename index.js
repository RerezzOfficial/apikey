const express = require('express');
const crypto = require('crypto'); // Untuk membuat API key unik
const app = express();
const path = require('path');

// Menyajikan file statis dari folder "public"
app.use(express.static(path.join(__dirname, 'public')));

// Simpan API key di memory untuk sementara
let userApiKeys = {};

// Endpoint untuk membuat API key
app.post('/api/create-apikey', (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
    return res.status(400).json({ error: 'Parameter "userId" tidak ditemukan' });
  }

  // Cek apakah user sudah memiliki API key
  if (userApiKeys[userId]) {
    return res.status(200).json({
      message: 'API key sudah dibuat',
      apikey: userApiKeys[userId],
    });
  }

  // Buat API key baru
  const apiKey = crypto.randomBytes(20).toString('hex'); // Membuat string random
  userApiKeys[userId] = apiKey; // Simpan API key berdasarkan userId

  res.status(201).json({
    message: 'API key berhasil dibuat',
    userId: userId,
    apikey: apiKey,
  });
});

// Middleware untuk validasi API key
function validateApiKey(req, res, next) {
  const apiKey = req.query.apikey;
  if (!apiKey) {
    return res.status(400).json({ error: 'API key tidak ditemukan' });
  }

  // Cari API key di database
  const userId = Object.keys(userApiKeys).find(
    (key) => userApiKeys[key] === apiKey
  );

  if (!userId) {
    return res.status(403).json({ error: 'API key tidak valid' });
  }

  req.userId = userId; // Tambahkan userId ke request object
  next();
}

// Endpoint API dengan validasi API key
app.get('/api/turbo', validateApiKey, async (req, res) => {
  try {
    const message = req.query.message;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await turbo(message);
    res.status(200).json({
      status: 200,
      creator: "IM-REREZZ",
      user: req.userId,
      data: { response },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fungsi turbo (contoh implementasi)
async function turbo(message) {
  return `Hasil dari turbo: ${message}`;
}

// Menjalankan server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
