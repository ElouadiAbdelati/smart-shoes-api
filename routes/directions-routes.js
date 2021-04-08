const express = require('express');
const {getDirections
      } = require('../controllers/directionsController');
const {getPlaces
      } = require('../controllers/placesController');
const router = express.Router();

router.post('/direction', getDirections);
router.get('/places/:name', getPlaces);
module.exports = {
    routes: router
}