const express = require('express');
const {getDirections
      } = require('../controllers/directionsController');
const {getLatLng
      } = require('../controllers/directionsController');
const {getAddress
      } = require('../controllers/directionsController');
 const {getPlaces
      } = require('../controllers/placesController');
const {getDistanceDuration
      } = require('../controllers/distancematrixContorller');

const {destinationReached
      } = require('../controllers/directionsController');
const {getTester
      } = require('../controllers/distancematrixContorller');


const router = express.Router();

router.post('/direction', getDirections);

router.post('/geocodeadd', getLatLng);
router.post('/geocodeRev', getAddress);

router.post('/distancematrix', getDistanceDuration);
router.post('/finishwalking', destinationReached);
router.post('/tester', getTester);

router.get('/places/:name', getPlaces);

module.exports = {
    routes: router
}