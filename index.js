'use strict'; 
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config.js');
const directionsRoutes = require('./routes/directions-routes');
const path = require('path');
const {Client} = require("@googlemaps/google-maps-services-js");
const request = require('request');
const urlParse = require('url-parse');
const queryParse = require('query-string');
const axios = require('axios'); 
const port = config.port || 8080;


//709402117284-3msph73vr5g8ulvc3p4ckrq9lf7q92u7.apps.googleusercontent.com
//GCm1uOEHBpK8u-rxPJqK1qu1
//AIzaSyBz6IDkIKhoUZeqGTurdyjhrv9T71wEInI

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true})); //support encoded bodies
app.use('/api', directionsRoutes.routes);
app.use(express.static(path.join(__dirname, 'vues')));




app.listen(port, () => console.log('App is listening on url http://localhost:'+config.port));

// creation of express js server
