'use strict';
const axios = require('axios'); 
const axiosInstance = new axios();
const firebase = require('../db.js');
const dir = require('../models/directions');
const firestore = firebase.firestore();
const Steps = require('../models/steps');
const request = require('request');
const url = "https://maps.googleapis.com/maps/api/directions/json?origin=Lycée+Victor+Hugo,+Route+de+Targa,+Marrakech&destination=Semlalia,+Marrakech&key=AIzaSyBz6IDkIKhoUZeqGTurdyjhrv9T71wEInI";


const getDirections = async (req, res, next) => {
    
    try {
        const response = await axios.get(url);
        let results = response.data.routes[0].legs[0].steps;
          await firestore.collection('steps').doc().set(Object.assign({}, results));
          res.send('Recorded');   
    } catch (error) {
        res.status(400).send(error.message);
    }
}
module.exports = {
    getDirections,
}