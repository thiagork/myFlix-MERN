/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
"use strict";

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const Models = require('./model.js');
const movies = Models.movies;
const users = Models.users;
const cors = require('cors');
const validator = require('express-validator');
const app = express();
const bcrypt = require('bcrypt');

mongoose.connect(process.env.DB_ADDRESS, {useNewUrlParser: true});

app.use(bodyParser.json());
app.use(cors()); // CORS-enabled for all origins
const auth = require('./auth.js')(app);
const passport = require('passport');
require('./passport.js');


app.use(validator());

// Allow new users to register
app.post('/users', (req, res) => {
    req.checkBody('Username', 'Username is required.').notEmpty();
    req.checkBody('Username', 'Username contains non alphanumeric characters: Not allowed.').isAlphanumeric();
    req.checkBody('Password', 'Password is required.').notEmpty();
    req.checkBody('Email', 'Email is required.').notEmpty();
    req.checkBody('Email', 'Email does not appear to be valid.').isEmail();
    
    const errors = req.validationErrors();
    if (errors) {
        return res.status(422).json({errors: errors});
    }

    const hashedPassword = users.hashPassword(req.body.Password);
    users.findOne({Username: req.body.Username})
    .then(user => {
        if (user) {
            return res.status(400).send(req.body.Username + ' already exists.');
        } else {
            users.create({
                Username: req.body.Username,
                Password: hashedPassword,
                Email: req.body.Email,
                Birthday: req.body.Birthday
            })
            .then(user => {res.status(201).json(user)})
            .catch(error => {
                console.error(error);
                res.status(500).send('Error: ' + error);
            });
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
        if (!user) {
            res.status(400).send(req.params.Username + ' was not found.');
        } else {
            res.status(201).json(user);
        }
        
    })
    .catch(err => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});


// Update user data
app.put('/users/:Username', passport.authenticate('jwt', {session: false}), (req, res) => {
    req.checkBody('Username', 'Username is required.').notEmpty();
    req.checkBody('Username', 'Username contains non alphanumeric characters: Not allowed.').isAlphanumeric();
    req.checkBody('Password', 'Password is required.').notEmpty();
    req.checkBody('Email', 'Email is required.').notEmpty();
    req.checkBody('Email', 'Email does not appear to be valid.').isEmail();
    
    const errors = req.validationErrors();
    if (errors) {
        return res.status(422).json({errors: errors});
    }
            
    users.findOneAndUpdate({Username: req.params.Username}, {
        $set: {
            Username: req.body.Username,
            Password: users.hashPassword(req.body.Password),
            Email: req.body.Email
        }
    },
    {new: true}
    )
    .then(updatedUser => {
        res.json(updatedUser);
    })
    .catch(err => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// Change user password
app.patch('/users/:Username/Password', passport.authenticate('jwt', {session: false}), (req, res) => {
    users.findOne({
        Username: req.params.Username
    })
    .then(user => {
        bcrypt.compare(user.Password, req.body.OldPassword, () => {
            users.findOneAndUpdate({Username: req.params.Username}, {
                $set: {
                    Password: users.hashPassword(req.body.NewPassword)
                }
            },
            {new: true}
            )
            .then(updatedUser => {
                res.json(updatedUser);
            })
        })
    })
    .catch(err => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// Update some specific user data
app.patch('/users/:Username/:Field', passport.authenticate('jwt', {session: false}), (req, res) => {
    let updateField = null;

    if (req.params.Field === 'Username') {
        req.checkBody('Username', 'Username is required.').notEmpty();
        req.checkBody('Username', 'Username contains non alphanumeric characters: Not allowed.').isAlphanumeric();
        updateField = {
            Username: req.body.Username
        };
    } else if (req.params.Field === 'Email') {
        req.checkBody('Email', 'Email is required.').notEmpty();
        req.checkBody('Email', 'Email does not appear to be valid.').isEmail();
        updateField = {
            Email: req.body.Email
        };
    } else if (req.params.Field === 'Birthday'){
        req.checkBody('Birthday', 'Birthday is required.').notEmpty();
        updateField = {
            Birthday: req.body.Birthday
        };
    } else {
        return res.status(422).send('Invalid Field. Expected Username, Password, Email or Birthday');
    }
    
    const errors = req.validationErrors();
    if (errors) {
        return res.status(422).json({errors: errors});
    }
            
    users.findOneAndUpdate({Username: req.params.Username}, {
        $set: updateField
    },
    {new: true}
    )
    .then(updatedUser => {
        res.json(updatedUser);
    })
    .catch(err => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});


// Adds a movie to a user's favorite list
app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', {session: false}), (req, res) => {
    users.findOneAndUpdate({Username: req.params.Username}, {
        $push: {FavoriteMovies: req.params.MovieID}
    },
    {new: true})
    .then(updatedUser => {
        res.json(updatedUser);
    })
    .catch(err => {
        res.status(500).send('Error :' + err);
    });
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

// Update movie data by Id
app.put('/movies/:Id', passport.authenticate('jwt', {session: false}), (req, res) => {
    
    const errors = req.validationErrors();
    if (errors) {
        return res.status(422).json({errors: errors});
    }

    movies.findOneAndUpdate({_id: req.params.Id}, {
        $set: {
            Genre: {
                Name: req.body.Genre.Name,
                Description: req.body.Genre.Description
            },
            Director: {
                Name: req.body.Director.Name,
                Bio: req.body.Director.Bio
            },
            Actors: req.body.Actors,
            _id: req.body._id,
            Title: req.body.Title,
            Description: req.body.Description,
            ImagePath: req.body.ImagePath,
            Featured: req.body.Featured
        }
    },
    {new: true}
    )
    .then(updatedMovie => {
        res.json(updatedMovie);
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
app.get('/documentation', (req, res) => {
    res.sendFile('/public/documentation.html', { root: __dirname })
});

{
    const port = process.env.PORT || 3000;
    app.listen(port, '0.0.0.0', () => {
        console.log(`Your app is listening on port ${port}.`);
    });
}
