const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const apiRoutes = require('./routes/api');

dotenv.config();
const app = express();
const port = 3000;

app.use(express.json()); // Parsing JSON body
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files
app.use('/api', apiRoutes); // Routing API

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
