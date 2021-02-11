const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// const enforce = require('express-sslify');
// const OZW = require('openzwave-shared');
// const zwave = new OZW();

// app.use(enforce.HTTPS({ trustProtoHeader: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.get('/data', verifyToken, (req, res) => {
    // send data about the status of the system after authentication

    const data = 'This is where the system status will go';
    console.log('req.token in /data', req.token);
    // Validate JWT. If JWT not valid, redirect to /login
    jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
        console.log('authData', authData);

        if (err) {
            res.sendStatus(401);
        } else {
            res.json({ data });
        }
    });
});

app.post('/login', (req, res) => {
    // username/password get sent from client as JSON and checked against a config file
    console.log('req.body server.js /login', req.body);
    const { users } = JSON.parse(fs.readFileSync('users.json'));

    const authenticated = users.some(user => {
        if (user.username === req.body.username && user.password === req.body.password) {
            return true;
        }
    });

    if (authenticated) {
        jwt.sign(req.body, process.env.SECRET_KEY, (err, token) => {
            res.json({ token });
            console.log('authenticated from username/password at server.js /login');
        });
    } else {
        res.sendStatus(401);
    }




    // const data = fs.readFileSync('data.json');
    // const update = JSON.parse(data);
    // update.data = "data changed again";
    // console.log(update);
    // fs.writeFileSync('data.json', JSON.stringify(update));
});

app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, 'page404.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server is running on port ${PORT} ...`))

// (async () => {
//     await connect();
//     console.log('controller node ID:', zwave.getControllerNodeId());
//     console.log('is primary controller?:', zwave.isPrimaryController());
//     zwave.setValue(3, 37, 1, 0, true);

// })();

function verifyToken(req, res, next) {
    // Get auth header value
    const token = req.headers['token'];
    console.log('token in verifyToken', token);
    // Check is bearer is undefined
    if (token !== 'null') {

        // Set the token
        req.token = token;
        // Next middleware
        next();
    } else {
        // Unauthorized
        res.sendStatus(401);
    }
}

function connect() {
    return new Promise((resolve, reject) => {
        zwave.connect('COM3');
        setTimeout(() => {
            resolve();
        }, 10000);
    });
}