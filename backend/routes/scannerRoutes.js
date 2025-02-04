// backend/routes/scannerRoutes.js
const express = require('express');
const router = express.Router();

const { analyzeCode } = require('../controllers/scannerController');

router.post('/analyze', analyzeCode);

module.exports = router;
