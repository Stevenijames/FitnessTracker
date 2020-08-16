const db = require("../models");
// const mongoose = require("mongoose");
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", {
//     useNewUrlParser: true,
//     useFindAndModify: false
// });
module.exports = (app) => {
    app.get("/api/workouts", (req, res) => {
        db.Workout.find({})
            .then(allWorkouts => {
                res.json(allWorkouts);
            })
            .catch(err => {
                res.json(err);
            });
    });

    app.put("/api/workouts/:id", (req, res) => {
        db.Workout.findOneAndUpdate({ _id: req.params.id }, { $push: { exercises: req.body } }, { new: true })
            .then(oneUpdate => {
                console.log(oneUpdate);
                res.json(oneUpdate);
            })
            .catch(err => {
                res.json(err);
            });
    });

    app.post("/api/workouts", (req, res) => {
        db.Workout.create(req.body)
            .then(oneWorkout => {
                res.json(oneWorkout);
            })
            .catch(err => {
                res.json(err);
            });


    });


    app.get(`/api/workouts/range`, (req, res) => {
        db.Workout.find({}).limit(7)
            .then(allWorkouts => {
                res.json(allWorkouts);
            })
            .catch(err => {
                res.json(err);
            });
    });

}