const express = require('express');
const router = express.Router();

const JsonArray = require('../modules/JsonArray');
const Message = require('../modules/Message');

const companyArray = require('../data/companies.json');
const guestArray = require('../data/guests.json');
const templateArray = require('../data/templates.json');

router.get('/', (req, res) => {
    const templateID = req.query.template;
    const companyID = req.query.company;
    const guestID = req.query.guest;

    if (templateID && companyID && guestID) {
        try {
            const template = JsonArray.select(templateArray, templateID);
            const company = JsonArray.select(companyArray, companyID);
            const guest = JsonArray.select(guestArray, guestID);
            const message = new Message(template, company, guest);
            res.send(message);
        } catch (error) {
            res.sendStatus(500);
        }
    } else {
        res.sendStatus(500);
    }
});

module.exports = router;