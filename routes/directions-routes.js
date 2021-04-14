const express = require('express');
const {getDirections
      } = require('../controllers/directionsController');
const {getLatLng
      } = require('../controllers/directionsController');
const {getAddress
      } = require('../controllers/directionsController');

const router = express.Router();

router.post('/direction', getDirections);

router.post('/geocodeadd', getLatLng);
router.post('/geocodeRev', getAddress);

module.exports = {
    routes: router
}