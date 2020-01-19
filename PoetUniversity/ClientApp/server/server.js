'use strict';

const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');

// these added for https
const http = require('http');
const https = require('https');
const fs = require('fs');

const credentials = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

const pubBat = require('../src/utils/battles.json')
const privBat = require('../src/utils/private-battles.json')

// https://stackoverflow.com/questions/8355473/listen-on-http-and-https-for-a-single-express-app
// https://stackoverflow.com/questions/11744975/enabling-https-on-express-js
// https://stackoverflow.com/questions/17696801/express-js-app-listen-vs-server-listen

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app)

const authCheckAuth0 = jwt({ 
  secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://shortpoet.auth0.com/.well-known/jwks.json"
    }),
    // This is the identifier we set when we created the API
    audience: 'battles-api',
    issuer: "https://shortpoet.auth0.com/",
    algorithms: ['RS256']
});
const authCheckIdentity = jwt({ 
  secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://localhost:5003/.well-known/jwks.json"
    }),
    // This is the identifier we set when we created the API
    audience: 'battles-api',
    issuer: "https://localhost:5003/",
    algorithms: ['RS256']
});

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://shortpoet.auth0.com/.well-known/jwks.json'
}),
audience: 'https://localhost:3333',
issuer: 'https://shortpoet.auth0.com/',
algorithms: ['RS256']
});

// the below line seems to make the whole app use auth
// app.use(jwtCheck);

app.get('/authorized', function (req, res) {
res.send('Secured Resource');
});

app.get('/battles', (req, res) => {
  let publicBattles = pubBat;
  res.json(publicBattles);
})

app.get('/battles/private', jwtCheck, (req,res) => {
  let privateBattles = privBat;
  res.json(privateBattles);
})

httpServer.listen(3030);
httpsServer.listen(3333);
console.log('Listening on localhost:3333');