const express = require('express');
const router = express.Router();

const JsonArray = require('../classes/JsonArray');
const Message = require('../classes/Message');

const companyArray = require('../data/companies.json');
const guestArray = require('../data/guests.json');
const templateArray = require('../data/templates.json');

router.get('/', (req, res) => {
    const templateID = parseInt(req.query.template);
    const companyID = parseInt(req.query.company);
    const guestID = parseInt(req.query.guest);

    if (templateID && companyID && guestID) {
        try {
            const template = JsonArray.select(templateArray, templateID);
            const company = JsonArray.select(companyArray, companyID);
            const guest = JsonArray.select(guestArray, guestID);
            const message = new Message(template, company, guest);
            res.send(message);
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    } else {
        console.error(`Missing HTTP query parameters. Route GET /message requires 'template', 'company', and 'guest'.`);
        res.sendStatus(500);
    }
});

router.post('/', (req, res) => {
    const templateString = req.body.template;
    const companyID = parseInt(req.body.companyID);
    const guestID = parseInt(req.body.guestID);

    if (templateString && companyID && guestID) {
        try {
            const template = { message: templateString };
            const company = JsonArray.select(companyArray, companyID);
            const guest = JsonArray.select(guestArray, guestID);
            const message = new Message(template, company, guest);
            res.send(message);
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    } else {
        console.error(`Missing HTTP request parameters. Route POST /message requires a JSON object with 'template', 'companyID', and 'guestID'.`);
        res.sendStatus(500);
    }
});

module.exports = router;