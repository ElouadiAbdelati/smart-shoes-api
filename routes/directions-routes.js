const express = require('express');
const {showDirections
      } = require('../controllers/directionsController');

const router = express.Router();

router.get('/student', showDirections);


module.exports = {
    routes: router
}