'use strict'; 
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config.js');
const studentRoutes = require('./routes/student-routes');
const directionsRoutes = require('./routes/directions-routes');
const path = require('path');
const {Client} = require("@googlemaps/google-maps-services-js");
const request = require('request');
const urlParse = require('url-parse');
const queryParse = require('query-string');
const axios = require('axios'); 
const axiosInstance = new axios();
 
//709402117284-3msph73vr5g8ulvc3p4ckrq9lf7q92u7.apps.googleusercontent.com
//GCm1uOEHBpK8u-rxPJqK1qu1

//AIzaSyBz6IDkIKhoUZeqGTurdyjhrv9T71wEInI

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true})); //support encoded bodies
app.use('/api', studentRoutes.routes);
app.use('/api', directionsRoutes.routes);
app.use(express.static(path.join(__dirname, 'vues')));
/*app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname,'vues', 'directions.html'));
});*/
/*app.get('/getURLTing', (req,res) => {
    const oauth2Client = new google.auth.OAuth2(
        '709402117284-3msph73vr5g8ulvc3p4ckrq9lf7q92u7.apps.googleusercontent.com',
        'GCm1uOEHBpK8u-rxPJqK1qu1',
        "http://localhost:5000/steps"
    );
})*/
/*const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyBz6IDkIKhoUZeqGTurdyjhrv9T71wEInI'
});

console.log(googleMapsClient.directions("Sydney", "Melbourne"));*/


app.listen(config.port, () => console.log('App is listening on url http://localhost:'+config.port));
// creation of express js server
