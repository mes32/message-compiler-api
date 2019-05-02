# Message Compiler API
Parses message templates and returns customized messages. Inserts data specific to intended recipients to replace placeholder tokens.

Placeholder variables use dot notation and are wrapped between `${` and `}`. For example the placeholder for guest's first name would be written as `${guest.firstName}` in the message template.

Message templates are described by JSON objects such as the following

```json
    {
        "id": 9,
        "description": "Friendly and detailed greeting for guest",
        "message": "${Time.greeting} ${guest.firstName}, and welcome to ${company.company}! Room ${guest.reservation.roomNumber} is now ready you. Enjoy your stay, and let us know if you need anything"
    }
```

## Utilized Technology Stack
- `JSON`
- `Node.js`
- `Express`
- `Moment.js` and `moment-timezone`

## Requirements
- Git
- Node.js with NPM
- Postman or a web browser

## Download and Install Application
You can download and install this application by running the following commands in the command line shell.

```bash
# 1. Clone this repository
git clone https://github.com/mes32/message-compiler-api.git

# 2. Change directory into the cloned repository
cd message-compiler-api

# 3. Install Node dependencies/libraries using NPM
npm install
```

## Run Application
You can spin up this application by running the following. The server should run locally on port 5000.

[localhost:5000](http://localhost:5000)

```bash
# Run the start script specified in 'package.json'
npm start

# If you wish to use the program nodemon to monitor for changes to your files you could run this instead
npm run server
```

## Usage and Discussion
Once the server is running on localhost you can query the API using HTTP GET requests from a web browser.

- [localhost:5000/company](http://localhost:5000/company) - lists all hotel companies in `server/data/companies.json`
- [localhost:5000/guest](http://localhost:5000/guest) - lists all hotel guests in `server/data/guests.json`
- [localhost:5000/template](http://localhost:5000/template) - lists all available message templates in `server/data/templates.json`

[localhost:5000/message?template=1&company=1&guest=1](http://localhost:5000/message?template=1&company=1&guest=1) is where things start to get interesting. The message URL requires three query parameters `template`, `company`, and `guest` specifying the respective IDs. It will then return a JSON object containing a message. This message will be based on the requested template and inserting data from guest and company. The example link above will return message template id=1, using company id=1, and guest id=1. If the message router is unable to produce the requested message for any reason it will return status code 500.

Assuming the user does not request nonexistent IDs, the next most likely point of failure is requesting a nonexistent placeholder. The template strings can be thought of as a special purpose computer language and missing or misspelled placeholders are a bug in that code.

There are a few things I might change with the format of the provided data. I think each reservation would ideally include an association with exactly one hotel in addition to its current data fields. Also a guest might have 0 to N reservations at different hotels.

## Author
Mike Stockman