// Import libraries 
const express = require('express')
const router = express.Router()
const db = require('../models')
const flash = require('connect-flash')
const passport = require('../config/ppConfig')
const { Router } = require('express')


// profile get route
// profile post route 
// users - GET details of one user 
// GET page with favorited songs/playlists 
// POST - receive name of a song and add it to the database 
// DESTROY - delete a song by it's ID 


// logout get route 
router.get('/logout', function (req, res) {
    req.logout()
    res.redirect('/')
})

module.exports = router


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


// // ROUTE for creating a playlist 
// router.post('/users/{playlist_id}/playlists', function (req, res) {
//     db.playlist.findOrCreate({
//         "name": "New Playlist",
//         "description": "New playlist description",
//         "public": false
//     })
// })

// // ROUTE for viewing User's playlists 
// router.get('/playlists', function (req, res) {
//     db.playlist.findOne({
//         where: {
//             id: req.params.id
//         }
//     }).then((playlist) => {
//         var playlistUrl = `https://spotify.com/api/v1/me/playlists` + `${playlist.id}`
//         console.log(playlist)
//         axios.get(playlistUrl).then(function (apiResponse) {
//             var playlist = apiResponse.data
//             res.render('playlist/show', { playlist: playlist, id: req.params.id })
//         })
//     }).catch((error) => {
//         console.log(error)
//     })
// })