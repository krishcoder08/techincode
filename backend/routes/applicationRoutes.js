const express = require('express');
const router = express.Router();
const { applyInternship } = require('../controllers/mailController');

router.post('/', applyInternship);

module.exports = router;