// backend/routes/scannerRoutes.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const { analyzeCode } = require('../controllers/scannerController');

router.post(
    '/analyze', 
    [
        body('code')
        .exists().withMessage('Código é obrigatório.')
        .isString().withMessage('Código deve ser uma string.')
        .trim()
        .notEmpty().withMessage('Código não pode estar vazio.')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    analyzeCode
);

module.exports = router;
