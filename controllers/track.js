const db = require('../models')
const Spotify = require('node-spotify-api');
const express = require('express')
const router = express.Router()
var client_id = process.env.CLIENT_ID
var client_secret = process.env.CLIENT_SECRET
var redirect_uri = process.env.REDIRECT_URI
let localStorage = require('localStorage')
var request = require('request')
const axios = require('axios')

var spotify = new Spotify({
    id: process.env.CLIENT_ID,
    secret: process.env.CLIENT_SECRET
});

router.get('/search', function (req, res) {
    console.log(req.query)
    spotify
    .search({ type: 'track', query: req.query.name, limit: 20 })
    .then(function (data) {
            var tracks = data.tracks.items
            spotify
            .request(`https://api.spotify.com/v1/users/${req.query.userId}/playlists`)
            .then(function (data) {
                var playlists = data.items
                console.log(tracks)
                res.render('track/search', {results: {tracks: tracks, playlists: playlists}})
            })
        })
}) 

router.post('/:id', function (req, res) {
    var playlistUrl = `https://api.spotify.com/v1/playlists/${req.body.playlist}/tracks`
    spotify
        .request(playlistUrl)
    axios.post(playlistUrl, { uris: [`spotify:track:${req.params.id}`] }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('spotifyToken')}`
        }
    })
        .then(function (data) {
            console.log(data)
            res.render('/playlist/playlist', `{spotify:local:{artist}:{album_title}:{track_title}:{duration_in_seconds}}`)
        }).catch(function (err) {
            console.log(err)
        })
})

router.put('/:id', function(req, res) {
    var playlistUrl = `https://api.spotify.com/v1/playlists/${req.body.trackId}`
    spotify
    .request(playlistUrl)
    axios.put(playlistUrl, { 
        "name": "Updated Playlist Name",
        "description": "Updated playlist description",
        "public": false
      })
})


// STRETCH GOAL
// should delete a song from the users library 
router.delete('/:id', function (req, res) {
    spotify
    .request(`https://api.spotify.com/v1/playlists/${req.params.id}/tracks`)
    axios.destroy(playlistUrl, { uris: [`spotify:track:${req.params.id}`] }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('spotifyToken')}`
        }
    }).then(function (track) {
        console.log(track)
        res.redirect('/playlist/playlist')
    })
})

 // router.put('/add', function(req, res) {
 //     spotify
 //     .request(`https://api.spotify.com/v1/me/tracks`)
 //     .then(function(data) {
 //         console.log('added')
 //         res.send('/songs', {data})
 //     })
 // })

module.exports = router