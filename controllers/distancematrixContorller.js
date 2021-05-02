'use strict';
const axios = require('axios'); 
const firebase = require('../db.js');
const firestore = firebase.firestore();
const DistanceMatrix = require('../models/distancematrix');
const request = require('request');
const urlFirst = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=";
const urlEnd = "&mode=walking&language=fr-FR&key=AIzaSyBz6IDkIKhoUZeqGTurdyjhrv9T71wEInI";

/*const getDistanceDuration = async (req, res, next) => {
    
    try {
        
        let originLat = req.body.originLat;
        let originLng = req.body.originLng;
        let DestinationLat = req.body.DestinationLat;
        let DestinationLng = req.body.DestinationLng;
       
        const urlFinal = urlFirst+originLat+","+originLng+"&destinations="+DestinationLat+","+DestinationLng+urlEnd;
        
        const response = await axios.get(urlFinal);
        let results1 = response.data.rows[0].elements[0].distance.text;
        let results2 = response.data.rows[0].elements[0].duration.text;
        
          res.send(results1+" "+results2);   
    } catch (error) {
        res.status(400).send(error.message);
        
    }
}*/
const getDistanceDuration = async (req, res, next) => {
    
    try {
        
        let originLat = req.body.originLat;
        let originLng = req.body.originLng;
        let nextStepId = req.body.nextStepId;
        let tripId = req.body.tripId;

        const trip = await firestore.collection('steps').doc(tripId);
        const data = await trip.get();
        const array = data.data();
        const DestinationLat = array[nextStepId].start_location.lat;
        const DestinationLng = array[nextStepId].start_location.lng;
        const maneuver = array[nextStepId].maneuver;
        const urlFinal = urlFirst+originLat+","+originLng+"&destinations="+DestinationLat+","+DestinationLng+urlEnd;
        const response = await axios.get(urlFinal);
        const ditanceText = response.data.rows[0].elements[0].distance.text;
        const durationText = response.data.rows[0].elements[0].duration.text;
        const ditanceValue = response.data.rows[0].elements[0].distance.value;
        const durationValue = response.data.rows[0].elements[0].duration.value;
        let change = false;
        if (durationValue<=30) change = true;
        const dMatrix = new DistanceMatrix(durationText,durationValue,ditanceText,ditanceValue,change,maneuver)
        res.send(dMatrix);
    } catch (error) {
        res.status(400).send(error.message);
        
    }
}
module.exports = {
    getDistanceDuration
}