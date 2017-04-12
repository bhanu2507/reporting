/**
 * Created by bhanu.mokkala on 4/12/2017.
 */
// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var User            = require('../models/users');

// expose this function to our app using module.exports
module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    passport.use('local', new LocalStrategy(
        function(username, password, done) {
            User.findByUsername(username, function(err, user) {
                //console.log(user);
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                if (user.password != password) { return done(null, false); }
                return done(null, user);
            });
            /*
            User.findByUsername({
                username: username.toLowerCase()
            }, function(err, user) {
                // if there are any errors, return the error before anything else
                if (err)
                    console.log("1" + err);
                    return done(err);

                // if no user is found, return the message
                if (!user)
                    console.log("2");
                    return done(null, false);

                // if the user is found but the password is wrong
                if (!user.validPassword(password))
                    console.log("3");
                    return done(null, false);

                // all is well, return successful user
                console.log(user);
                return done(null, user);
            });*/
        }
    ));
};