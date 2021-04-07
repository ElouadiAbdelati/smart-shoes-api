const request = require('request');

    
        url = "https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key=AIzaSyBz6IDkIKhoUZeqGTurdyjhrv9T71wEInI";

function getDirections(){
    let array;
    request.get(url, (error, response, body) => {
        let json = JSON.parse(body);
        array = json.routes[0].legs[0].steps;
        
      });
     return array;
    }


    

module.exports = getDirections;