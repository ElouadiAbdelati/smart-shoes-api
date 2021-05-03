'use strict';
const axios = require('axios'); 
const firebase = require('../db.js');
const firestore = firebase.firestore();
const request = require('request');
const urlFirst = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=";
const urlEnd = "&mode=walking&language=fr-FR&key=AIzaSyBz6IDkIKhoUZeqGTurdyjhrv9T71wEInI";

const getDistanceDuration = async (req, res, next) => {
    
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
}
module.exports = {
    getDistanceDuration
}