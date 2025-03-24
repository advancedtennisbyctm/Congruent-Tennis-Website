const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
require('./src/user');

// Serve static files from public
app.use(express.static(path.join(__dirname, 'public')));

// Serve HTML files from public/html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/index.html'));
});

// Optional: handle all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
