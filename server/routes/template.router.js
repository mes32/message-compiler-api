const express = require('express');
const router = express.Router();

const templates = require('../data/templates.json');

router.get('/', (req, res) => {
    res.send(templates);
});

module.exports = router;