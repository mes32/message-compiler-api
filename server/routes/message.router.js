const express = require('express');
const router = express.Router();

const Company = require('../classes/Company');
const Guest = require('../classes/Guest');
const Message = require('../classes/Message');
const Template = require('../classes/Template');

const companyJSON = require('../data/companies.json');
const guestJSON = require('../data/guests.json');
const templateJSON = require('../data/templates.json');

const companyArray = Company.loadJSON(companyJSON);
const guestArray = Guest.loadJSON(guestJSON);
const templateArray = Template.loadJSON(templateJSON);

router.get('/', (req, res) => {
    const templateID = parseInt(req.query.template);
    const companyID = parseInt(req.query.company);
    const guestID = parseInt(req.query.guest);

    if (templateID && companyID && guestID) {
        try {
            const template = templateArray.select(templateID);
            const company = companyArray.select(companyID);
            const guest = guestArray.select(guestID);
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
            const company = companyArray.select(companyID);
            const guest = guestArray.select(guestID);
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