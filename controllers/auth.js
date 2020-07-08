// Import libraries 
const express = require('express')
const router = express.Router()
const db = require('../models')
const flash = require('connect-flash')
const passport = require('../config/ppConfig')
const { Router } = require('express')

// ROUTES 
// register get route 
// router.get('/register', function(req, res) {
//     db.user.findOrCreate({
//         where: {
//             email: req.body.email
//         }, defaults: {
//             firstName: req.body.firstName,
//             lastName: req.body.lastName,
//             password: req.body.password,
//             age: req.body.age,
//             birthday: req.body.birthday
//         }
//     })
// })

// register post route 
// router.post('/register', function(req, res) {
//     db.user.findOrCreate({
//         where: {
//             email: req.body.email
//         }, defaults: {
//             firstName: req.body.firstName,
//             lastName: req.body.lastName,
//             password: req.body.password,
//             age: req.body.age,
//             birthday: req.body.birthday
//         }
//     }).then(function([user, created]) {
//         // if user was created 
//         if (created) {
//             // authenticate user and start authorization process
//             console.log('user is created')
//             passport.authenticate('local', {
//                 successRedirect: '/profile',
//                 successFlash: 'Thanks for registering!'
//             })(req, res)
//         } else {
//             console.log('User email already exists!')
//             req.flash('error', 'Error: email already exists for user. Try again')
//             res.redirect('/auth/register')
//         }
//         // else if user already exists
//             // send error to user that email already exists
//             // redirect back to registration get route/page
//     }).catch(function(err) {
//         console.log(`Error found. \nMessage: ${err.message} \nPlease review - ${err}`)
//         req.flash('error', err.message)
//         res.redirect('/auth/register')
//     })
// })

// // login get route 
// router.get('/login', function(req, res) {
//     res.render('auth/login')
// })

// // login post route 
// router.post('/login', function(req, res, next) {
//     passport.authenticate('local', function(error, user, info) {
//         if (!user) {
//             req.flash('error', 'Invalid username or password')
//             // redirect our user to try logging in again
//                 return res.redirect('/auth/login')
//         }
//         if (error) {
//             return next(error)
//         }
//         req.login(user, function(error) {
//             if (error) next(error)
//             // if success flash success message
//             req.flash('success', 'You are validated and logged in')
//             // if success save session and redirect user
//             req.session.save(function() {
//                 return res.redirect('/profile')
//             })
//         })
//     })(req, res, next)
// })

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