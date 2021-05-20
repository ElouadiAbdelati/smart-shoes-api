'use strict';
const axios = require('axios'); 
const axiosInstance = new axios();
const firebase = require('../db.js');
const firestore = firebase.firestore();
const Directions = require('../models/directions');
const request = require('request');
const url = "https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&mode=walking&language=fr-FR&key=AIzaSyBz6IDkIKhoUZeqGTurdyjhrv9T71wEInI";
const url1 = "https://maps.googleapis.com/maps/api/directions/json?origin=";
const url2 ="&destination=";
const url3 = "&mode=walking&language=fr-FR&key=AIzaSyBz6IDkIKhoUZeqGTurdyjhrv9T71wEInI";

const getDirections = async (req, res, next) => {
    
    try {
        let lat = req.body.latitude;
        let lng = req.body.altitude;
        let destination = req.body.destination;
        const urlFinal = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+url3;
        const respon = await axios.get(urlFinal);
        let origin = respon.data.results[0].formatted_address;
        origin = origin.replace("é", "e");
        origin = origin.replace("è", "e");
        var res1 = origin.split(" ");
        var res2 = destination.split(" ");
        origin = res1.join("+");
        destination = res2.join("+");
        let URLCON = url1 + origin + url2 + destination + url3;
        console.log(URLCON);
        const response = await axios.get(URLCON);
        let results = response.data.routes[0].legs[0].steps;
        let nbrSteps = results.length;
        const doc = await firestore.collection('steps').doc();
        doc.set(Object.assign({}, results))
        .then(() => {
            const direction = new Directions(doc.id,nbrSteps);
            res.send(direction);
            
        });
    } catch (error) {
        res.status(400).send(error.message);
        
    }
}
const getLatLng = async (req, res, next) => {
    
    try {
        let adress = req.body.adress;
        const urlFinal = "https://maps.googleapis.com/maps/api/geocode/json?address="+adress+url3;
        const response = await axios.get(urlFinal);
        let results = response.data.results[0].geometry.location;
          res.send(results);   
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const getAddress = async (req, res, next) => {
    try {
        let lat = req.body.lat;
        let lng = req.body.lng;
        const urlFinal = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+url3;
        const response = await axios.get(urlFinal);
        let results = response.data.results[0].formatted_address;
         res.send(results);   
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const destinationReached = async (req, res, next) => {
    try {
        let tripId = req.body.tripId;

        // Create a document reference
        const response = await firestore.collection('steps').doc(tripId).delete();

        // Remove the 'capital' field from the document
        res.send(response); 

    } catch(error){
        res.status(400).send(error.message);

    }
}
module.exports = {
    getDirections,
    getLatLng,
    getAddress,
    destinationReached
}