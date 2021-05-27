'use strict';
const axios = require('axios'); 
const firebase = require('../db.js');
const firestore = firebase.firestore();
const DistanceMatrix = require('../models/distancematrix');
const request = require('request');
const urlFirst = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=";
const urlEnd = "&mode=walking&language=fr-FR&key=AIzaSyBz6IDkIKhoUZeqGTurdyjhrv9T71wEInI";

const getTester = async (req, res, next) => {
    
    try {
        
        let originLat = req.body.originLat;
        let originLng = req.body.originLng;
        let nextStepId = req.body.nextStepId;
        let id = req.body.id;

        const trip = await firestore.collection('steps').doc(id);
        const data = await trip.get();
        const array = data.data();
        const DestinationLat = array.steps[nextStepId].start_location.lat;
        
        res.send(DestinationLat);
    } catch (error) {
        res.status(400).send(error.message);
        
    }
}
const getDistanceDuration = async (req, res, next) => {
    
    try {
        
        let originLat = req.body.originLat;
        let originLng = req.body.originLng;
        let nextStepId = req.body.nextStepId;
        let id = req.body.id;

        const trip = await firestore.collection('steps').doc(id);
        const data = await trip.get();
        const array = data.data();
        const DestinationLat = array.steps[nextStepId].start_location.lat;
        const DestinationLng = array.steps[nextStepId].start_location.lng;
        const DestinationFinalLat = array.start_location.lat;
        const DestinationFinalLng = array.start_location.lng;
        const maneuver = array.steps[nextStepId].maneuver;
        const urlFinal = urlFirst+originLat+","+originLng+"&destinations="+DestinationLat+","+DestinationLng+urlEnd;
        const urlFinal2 = urlFirst+originLat+","+originLng+"&destinations="+DestinationFinalLat+","+DestinationFinalLng+urlEnd;
        const response = await axios.get(urlFinal);
        
        const ditanceText = response.data.rows[0].elements[0].distance.text;
        const durationText = response.data.rows[0].elements[0].duration.text;
        const ditanceValue = response.data.rows[0].elements[0].distance.value;
        const durationValue = response.data.rows[0].elements[0].duration.value;
        const response2 = await axios.get(urlFinal2);
        const distanceTextToEnd = response2.data.rows[0].elements[0].distance.text;
        const durationTextToEnd = response2.data.rows[0].elements[0].duration.text;
        const distanceValueToEnd = response2.data.rows[0].elements[0].distance.value;
        const durationValueToEnd = response2.data.rows[0].elements[0].duration.value;
        let change = false;
        if (durationValue<=30) change = true;
        
        const dMatrix = new DistanceMatrix(durationText,durationValue,ditanceText,ditanceValue,change,maneuver,distanceTextToEnd,durationTextToEnd,distanceValueToEnd,durationValueToEnd);
        res.send(dMatrix);
    } catch (error) {
        res.status(400).send(error.message);
        
    }
}
module.exports = {
    getDistanceDuration,
    getTester
}