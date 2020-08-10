const passport = require('./passport');
const localStrategy = require('passport-local').Strategy;

const User = require('../../models/Users');
const authHelpers = require('./auth-helpers');

const options = {};

passport.use(
    new localStrategy(options, (username, password, done) => {
        console.log('local strategy');
        User.findByUserName(username)
        .then((user) => {
            if (!user) {
                return done(null, false);
            }
            if (!authHelpers.comparePass(password, user.password_digest)) {
                console.log('unsucessful test')
                return done(null, false);
            } else {
                console.log('sucessful check')
                return done (null, user);
            }
        })
        .catch((err) => {
            console.log(err);
            return done (err);
        });
    })
);

module.exports = passport;