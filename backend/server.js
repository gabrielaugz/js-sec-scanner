// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const scannerRoutes = require('./routes/scannerRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json()); 

// routes
app.use('/api/scanner', scannerRoutes);

app.get('/', (req, res) => {
  res.send('API do Detector de Scripts Maliciosos');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
