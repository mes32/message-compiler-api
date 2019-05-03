const PORT = 5000;

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Include server-side routers
const aboutRouter = require('./routes/about.router');
const companyRouter = require('./routes/company.router');
const guestRouter = require('./routes/guest.router');
const messageRouter = require('./routes/message.router');
const templateRouter = require('./routes/template.router');

// Configure body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure server-side routes
app.use('/', aboutRouter);
app.use('/company', companyRouter);
app.use('/guest', guestRouter);
app.use('/message', messageRouter);
app.use('/template', templateRouter);

// Start server listening on PORT
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});