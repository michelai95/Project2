const db = require('../models')
const Spotify = require('node-spotify-api');
const express = require('express')
const router = express.Router()
var client_id = process.env.CLIENT_ID
var client_secret = process.env.CLIENT_SECRET
var redirect_uri = process.env.REDIRECT_URI
let localStorage = require('localStorage')
var request = require('request')

var spotify = new Spotify({
    id: process.env.CLIENT_ID,
    secret: process.env.CLIENT_SECRET
});

router.get('/search', function (req, res) {
    console.log(req.query)
    spotify
    .search({ type: 'track', query: req.query.name, limit: 20 })
    .then(function (data) {
        // }).then(function(tracksData){
            var tracks = data.tracks.items
            spotify
            .request(`https://api.spotify.com/v1/users/${req.query.userId}/playlists`)
            .then(function (data) {
                var playlists = data.items
                res.render('track/search', {results: {tracks: tracks, playlists: playlists}})
            })
        })
}) 

router.post('/:id', function (req, res) {
    spotify
        .request(`https://api.spotify.com/v1/playlists/` + req.params.id + `/tracks`)
        .then(function (data) {
            console.log(data)
            res.redirect('/playlist/playlist')
        }).catch(function (err) {
            console.log(err)
        })
})


// STRETCH GOAL
// should delete a song from the users library 
// router.delete('/:id', function (req, res) {
//     spotify
//     .request(`https://api.spotify.com/v1/playlists/${req.params.id}/tracks`)
//     db.song.destroy({
//         where: {
//             name: req.params.name,
//             id: req.params.id
//         }
//     }).then(function (track) {
//         console.log(track)
//         res.redirect('/playlist/playlist')
//     })
// })

 // router.put('/add', function(req, res) {
 //     spotify
 //     .request(`https://api.spotify.com/v1/me/tracks`)
 //     .then(function(data) {
 //         console.log('added')
 //         res.send('/songs', {data})
 //     })
 // })

module.exports = router