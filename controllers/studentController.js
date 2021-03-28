'use strict';

const firebase = require('../db.js');
const student = require('../models/student');
const firestore = firebase.firestore();

const addStudent = async(req,res,next) => {
    try {
        const data = req.body;
        await firestore.collection('students').doc().set(data);
        res.send('Recorded');
    } catch (error) {
        res.status(404).send(error.message);
    }

}
module.exports = {
    addStudent
}