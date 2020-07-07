const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy 
const db = require('../models')

passport.serializeUser(function(user, cb) {
    cb(null, user.id)
})

passport.deserializeUser(function(id, cb) {
    db.user.findByPk(id).then(function(user) {
        cb(null, user)
    }).catch(cb)
})

module.exports = passport