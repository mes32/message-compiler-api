# Message Compiler API
This is a simple webserver that composes customized messages that hotel staff might send to hotel guests. It is not really a 'compiler' in the usual computer science sense of the word. Rather it parses message templates and compiles different pieces of data to produce a custom message. When parsing the template placeholder tokens are evaluated and replaced with data specific to a guest and their current reservation.

Placeholder variables are wrapped between `${` and `}`. For example the placeholder for a guest's first name could be written as `${firstName}` in the message template.

Message templates are described by JSON objects such as the following

```json
    {
        "id": 11,
        "description": "Friendly and detailed greeting for guest",
        "message": "${Time.greeting} ${firstName}, and welcome to ${company}! Room ${roomNumber} is now ready you. Enjoy your stay, and let us know if you need anything"
    }
```

## Utilized Technology Stack
- `JSON`
- `Node.js`
- `Express`
- `body-parser`
- `Moment.js` and `moment-timezone`
- `nodemon`

## Requirements
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/) with NPM
- [Postman](https://www.getpostman.com/) or a web browser

## Download and Install Application
You can download and install this application by running the following commands in a command line shell.

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

## Usage
Once the server is running on localhost you can query the API using HTTP GET requests from a web browser.

- [localhost:5000/company](http://localhost:5000/company) - lists all hotel companies in `server/data/companies.json`
- [localhost:5000/guest](http://localhost:5000/guest) - lists all hotel guests in `server/data/guests.json`
- [localhost:5000/template](http://localhost:5000/template) - lists all available message templates in `server/data/templates.json`

`localhost:5000/message` is where things start getting interesting. The message URL requires three query parameters `template`, `company`, and `guest` specifying the respective IDs. It will then return a JSON object containing a message. This message will be based on the requested template and inserting data from guest and company. 

For example this link [localhost:5000/message?template=1&company=1&guest=1](http://localhost:5000/message?template=1&company=1&guest=1) will return message template id=1, evaluated using data from company id=1, and guest id=1. If the message router is unable to produce the requested message for any reason it will return status code 500. A description of the error will print on the command line where the server was started.

## Discussion
Assuming the user does not request nonexistent IDs, the next most likely point of failure is requesting a nonexistent placeholder in the template. The template strings can be thought of as a special purpose computer language and missing or misspelled placeholders are a bug in that code. I made every effort to catch and log descriptive errors particularly when working with the template strings. However if this project where to be adapted to a production setting, I think a more formal system finding and recording errors in template code would be nice to have.

There are a few things I might change with the schema of the provided data. I think each reservation would ideally include an association with exactly one hotel in addition to its current data fields. Right now that association is only made when the user requests a message in the browser. Also a guest might have 0 to N reservations at different hotels rather than always having exactly 1.

I decided to build this project as a web server with a REST API because that seemed like a good way to realistically provide this type of message composing functionality to end-users. Different organizations could build or modify their own computer systems to make requests to this API. This provides a high degree of portability. As well as completely hiding/abstracting the technologies and languages used behind the HTTP protocol.

I decided to build this project using JavaScript (Node.js and express). I think this is a pretty good way to build web servers in general. Also I am quite used to working with Node and this would allow me to get started quickly and focus on writing robust code.

[Unit testing]

If I had more time I would consider adding user authentication. If some of the users are working for different organizations I don't think it would make sense them to have access to other organization's data or have access to data on guests that aren't staying with them. I would also look into deploying the project to Heroku or some other web hosting service. I would definitely replace the JSON data files with a databases of some sort. This would improve the integrity of the data particularly enforcing the connections between different types of data.

Using a database in conjunction with user authentication would make it feasible to allow create, update, and delete actions on the data. This would allow the application to be used in more dynamic and interesting ways.

I am pretty happy with the language I designed for the template messages. I think it is readable and thru the use of escape characters it doesn't restrict what else can go into messages. In the future it should be easy to extend the template language by adding new variables. While the parsing seems to be working pretty well, my current implementation feels like it could maybe be more computationally efficient. This problem is a bit outside my day-to-day programming experience. It would probably be good to brush up on compiler/parser design to see how this sort of code iterpretation problem is typically handled. 

## Author
Mike Stockman