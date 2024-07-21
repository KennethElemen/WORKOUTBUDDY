const Workout = require('../models/WorkoutModel');
const mongoose = require('mongoose');

// Get All Workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json(workouts);
}

// Get a Single Workout
const getWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such workout" });
    }

    const workout = await Workout.findById(id);

    if (!workout) {
        return res.status(404).json({ error: 'Workout not existing' });
    }

    res.status(200).json(workout);
}

// Create a New Workout
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body;
    

    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }

    if(!load){
        emptyFields.push('load')
    }

    if(!reps){
        emptyFields.push('reps')
    }


    if(emptyFields.length > 0){
        return res.status(400).json ({ error : 'PLEASE COMPLETE THE FORM', emptyFields})
    }

    try {
        const workout = await Workout.create({ title, load, reps });
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//update workout

const updateWorkout = async (req, res) => {
    const { id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such workout" });
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!workout) {
        return res.status(404).json({ error: 'Workout not existing' });
    }

    res.status(200).json(workout)
}


// delete workout
const deleteWorkout = async (req, res) => {
    const { id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such workout" });
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if (!workout) {
        return res.status(404).json({ error: 'Workout not existing' });
    }

    res.status(200).json(workout)
}
module.exports = {
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout,
    createWorkout
}
