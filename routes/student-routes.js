const express = require('express');
const {addStudent
      } = require('../controllers/studentController');

const router = express.Router();

router.post('/student', addStudent);


module.exports = {
    routes: router
}