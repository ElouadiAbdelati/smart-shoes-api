const express = require('express');
const {getDirections
      } = require('../controllers/directionsController');

const router = express.Router();

router.post('/direction', getDirections);


module.exports = {
    routes: router
}