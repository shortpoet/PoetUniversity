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


app.get('/api/battles/public', (req, res) => {
  let publicBattles = [
  {
    id: 1111,
    name: 'Startup NYC',
    sponsor: 'Alec Pesola',
    seedFund: '500k'
  },
  {
    id: 1112,
    name: 'Startup Ontario',
    sponsor: 'Ryan Chenkie',
    seedFund: '750k'
  },
  {
    id: 1113,
    name: 'Startup Uttah',
    sponsor: 'Diego Poza',
    seedFund: '550k'
  },
  {
    id: 1114,
    name: 'Startup Australia',
    sponsor: 'Eugene Kogan',
    seedFund: '500k'
  },
  {
    id: 1115,
    name: 'Startup Buenos Aires',
    sponsor: 'Sebastian Peyrott',
    seedFund: '600k'
  },
  {
    id: 1116,
    name: 'Startup Lagos',
    sponsor: 'Prosper Otemuyiwa',
    seedFund: '650k'
  },
  {
    id: 1117,
    name: 'Startup Oslo',
    sponsor: 'Mark Fish',
    seedFund: '600k'
  },
  {
    id: 1118,
    name: 'Startup Calabar',
    sponsor: 'Christian Nwamba',
    seedFund: '800k'
  },
  {
    id: 1119,
    name: 'Startup Nairobi',
    sponsor: 'Aniedi Ubong',
    seedFund: '700k'
  }];

  res.json(publicBattles);
})

app.get('/api/battles/private', authCheckAuth0, (req,res) => {
  let privateBattles = [
  {
    id: 2111,
    name: 'Startup Seattle',
    sponsor: 'Mark Zuckerberg',
    seedFund: '10M'
  },
  {
    id: 2112,
    name: 'Startup Vegas',
    sponsor: 'Bill Gates',
    seedFund: '20M'
  },
  {
    id: 2113,
    name: 'Startup Addis-Ababa',
    sponsor: 'Aliko Dangote',
    seedFund: '8M'
  },
  {
    id: 2114,
    name: 'Startup Abuja',
    sponsor: 'Femi Otedola',
    seedFund: '5M'
  },
  {
    id: 2115,
    name: 'Startup Paris',
    sponsor: 'Jeff Bezos',
    seedFund: '1.6M'
  },
  {
    id: 2116,
    name: 'Startup London',
    sponsor: 'Dave McClure',
    seedFund: '1M'
  },
  {
    id: 2117,
    name: 'Startup Oslo',
    sponsor: 'Paul Graham',
    seedFund: '2M'
  },
  {
    id: 2118,
    name: 'Startup Bangkok',
    sponsor: 'Jeff Clavier',
    seedFund: '5M'
  },
  {
    id: 2119,
    name: 'Startup Seoul',
    sponsor: 'Paul Buchheit',
    seedFund: '4M'
  }];

  res.json(privateBattles);
})

httpServer.listen(3030);
httpsServer.listen(3333);
console.log('Listening on localhost:3333');