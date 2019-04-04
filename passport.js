/* eslint-disable no-console */
const passport = require('passport');
const LocalStrategy = require('passport-local');
const Models = require('./model.js');
const passportJWT = require('passport-jwt');

const users = Models.users;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new LocalStrategy({
    usernameField: 'Username',
    passwordField: 'Password'
}, (username, password, callback) => {
    console.log(username + ' ' + password);
    users.findOne({Username: username}, (error, user) => {
        if (error) {
            console.log(error);
            return callback(error);
        }
        if (!user) {
            console.log('Incorrect username');
            return callback(null, false, {message: 'Incorrect username or password.'});
        }
        if (!user.validatePassword(password)) {
            console.log('incorrect password');
            return callback(null, false, {message: 'Incorrect password.'});
        }
        console.log('finished');
        return callback(null, user);
    });
}
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'fo1F9wOx4BjCithUgHbOsPLeMze3nF'
}, (jwtPayLoad, callback) => {
    return users.findById(jwtPayLoad._id)
    .then(user => {
        return callback(null, user);
    })
    .catch(error => {
        return callback(error)
    });
}
));