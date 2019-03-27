/* eslint-disable no-console */
"use strict";

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const Models = require('./model.js');
const movies = Models.movies;
const users = Models.users;
const app = express();

mongoose.connect('mongodb://localhost:27017/myDB', {useNewUrlParser: true});

app.use(bodyParser.json());
const auth = require('./auth.js')(app);
const passport = require('passport');
require('./passport.js');

// Allow new users to register
app.post('/users', passport.authenticate('jwt', {session: false}), (req, res) => {
    users.findOne({Username: req.body.Username})
    .then(user => {
        if (user) {
            return res.status(400).send(req.body.Username + ' already exists.');
        } else {
            users.create({
                Username: req.body.Username,
                Password: req.body.Password,
                Email: req.body.Email,
                Birthday: req.body.Birthday
            })
            .then(user => {res.status(201).json(user)})
            .catch(error => {
                console.error(error);
                res.status(500).send('Error: ' + error);
            })
        }
    }).catch(error => {
        console.error(error);
        res.status(500).send('Error: ' + error);
    });
});

// Deletes a user by username
app.delete('/users/:Username', passport.authenticate('jwt', {session: false}), (req, res) => {
    users.findOneAndRemove({Username: req.params.Username})
    .then(user => {
        if (!user) {
            res.status(400).send(req.params.Username + ' was not found.');
        } else {
            res.status(200).send(req.params.Username + ' was succesfully deleted.');
        }
    })
    .catch(err => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// Get all users
app.get('/users', passport.authenticate('jwt', {session: false}), (req, res) => {
    users.find()
    .then(users => {
        res.status(201).json(users)
    })
    .catch(err => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// Get a user by username
app.get('/users/:Username', passport.authenticate('jwt', {session: false}), (req, res) => {
    users.findOne({
        Username: req.params.Username
    })
    .then(user => {
        res.json(user)
    })
    .catch(err => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// Update user data
app.put('/users/:Username', passport.authenticate('jwt', {session: false}), (req, res) => {
    users.update({Username: req.params.Username}, {$set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email
    }},
    {new: true}, // Makes sure that the updated document is returned
    (err, updatedUser) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
        } else {
            res.json(updatedUser)
        }
    }
    )
});

// Adds a movie to a user's list of favorites
app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', {session: false}), (req, res) => {
    users.findOneAndUpdate({Username: req.params.Username}, {
        $push: {FavoriteMovies: req.params.MovieID}
    },
    {new: true},
    (err, updatedUser) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
        } else {
            res.json(updatedUser)
        }
    }
    )
});

// Removes a movie from a user's list of favorites
app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', {session: false}), (req, res) => {
    users.findOneAndUpdate({Username: req.params.Username}, {
        $pull: {FavoriteMovies: req.params.MovieID}
    },
    {new: true})
    .then(item => {
        res.json(item)
    })
    .catch(err => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// Get all movies
app.get('/movies', passport.authenticate('jwt', {session: false}), (req, res) => {
    movies.find()
    .then(movies => {
        res.status(201).json(movies)
    })
    .catch(err => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// Get a movie by title
app.get('/movies/:Title', passport.authenticate('jwt', {session: false}), (req, res) => {
    movies.findOne({
        Title: req.params.Title
    })
    .then(movie => {
        res.json(movie)
    })
    .catch(err => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// Get a genre by name
app.get('/genres/:Genre', passport.authenticate('jwt', {session: false}), (req, res) => {
    movies.findOne({
        'Genre.Name': req.params.Genre 
    })
    .then(item => {
        res.json(item.Genre)
    })
    .catch(err => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// Get a director by name
app.get('/directors/:Director', passport.authenticate('jwt', {session: false}), (req, res) => {
    movies.findOne({
        'Director.Name': req.params.Director
    })
    .then(item => {
        res.json(item.Director)
    })
    .catch(err => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// Serves documentation file
app.get('/documentation', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.sendFile('/public/documentation.html', { root: __dirname })
});

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});

