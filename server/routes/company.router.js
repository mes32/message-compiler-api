const express = require('express');
const router = express.Router();

const companies = require('../data/companies.json');

router.get('/', (req, res) => {
    res.send(companies);
});

module.exports = router;