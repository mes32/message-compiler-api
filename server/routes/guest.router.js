const express = require('express');
const router = express.Router();

const guests = require('../data/guests.json');

router.get('/', (req, res) => {
    res.send(guests);
});

module.exports = router;