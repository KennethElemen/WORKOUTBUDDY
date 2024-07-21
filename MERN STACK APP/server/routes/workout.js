const express = require('express');
const Workout = require('../models/WorkoutModel');
const { createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout } = require('../controllers/WorkoutController');
const router = express.Router();

// Second definition of router.get('/')
router.get('/', getWorkouts) 

router.get('/:id', getWorkout) 

router.post('/', createWorkout) 

router.delete('/:id', deleteWorkout) 

router.patch('/:id', updateWorkout)

module.exports = router;
