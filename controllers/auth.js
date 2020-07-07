// Import libraries 
const express = require('express')
const router = express.Router()
const db = require('../models')
const flash = require('connect-flash')
const passport = require('../config/ppConfig')
const { Router } = require('express')

var request = require('request')
var cors = require('cors')
var querystring = require('querystring')
var cookieParser = require('cookie-parser')

var client_id = 'CLIENT_ID'
var client_secret = 'CLIENT_SECRET'
var redirect_uri = 'REDIRECT_URI'

// generates random string containing numbers and letters

// @param {number}
// @return {string}

var generateRandomString = function(length) {
    var text = ""
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for(var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

var stateKey = 'spotify_auth_state'
var app = express()
// ROUTES 

// homepage - GET main index of the site/API
// homepage - POST and show in slideshow

// register get route 
router.get('/register', function(req, res) {
    db.user.findOrCreate({
        where: {
            email: req.body.email
        }, defaults: {
            name: req.body.name,
            password: req.body.password
        }
    })
})

// register post route 
router.post('/register', function(req, res) {
    db.user.findOrCreate({
        where: {
            email: req.body.email
        }, defaults: {
            name: req.body.name,
            password: req.body.password
        }
    }).then(function([user, created]) {
        // if user was created 
        if (created) {
            // authenticate user and start authorization process
            console.log('user is created')
            passport.authenticate('local', {
                successRedirect: '/profile',
                successFlash: 'Thanks for registering!'
            })(req, res)
        } else {
            console.log('User email already exists!')
            req.flash('error', 'Error: email already exists for user. Try again')
            res.redirect('/auth/register')
        }
        // else if user already exists
            // send error to user that email already exists
            // redirect back to registration get route/page
    }).catch(function(err) {
        console.log(`Error found. \nMessage: ${err.message} \nPlease review - ${err}`)
        req.flash('error', err.message)
        res.redirect('/auth/register')
    })
})

// login get route 
router.get('/login', function(req, res) {
    res.render('auth/login')
})

// login post route 
router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(error, user, info) {
        if (!user) {
            req.flash('error', 'Invalid username or password')
            // redirect our user to try logging in again
                return res.redirect('/auth/login')
        }
        if (error) {
            return next(error)
        }
        req.login(user, function(error) {
            if (error) next(error)
            // if success flash success message
            req.flash('success', 'You are validated and logged in')
            // if success save session and redirect user
            req.session.save(function() {
                return res.redirect('/profile')
            })
        })
    })(req, res, next)
})

// profile get route
// profile post route 
// users - GET details of one user 
// GET page with favorited songs/playlists 
// POST - receive name of a song and add it to the database 
// DESTROY - delete a song by it's ID 


// logout get route 
router.get('/logout', function(req, res) {
    req.logout()
    res.redirect('/')
})

module.exports = router