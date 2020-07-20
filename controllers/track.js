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
    spotify
    .search({ type: 'track', query: req.query.name, limit: 20 })
    .then(function (data) {
            var tracks = data.tracks.items
            spotify
            .request(`https://api.spotify.com/v1/users/${req.query.userId}/playlists`)
            .then(function (data) {
                var playlists = data.items
                console.log(playlists)
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
    }).then(function([track, added]) {
        console.log(data)
        if (added) {
            req.flash('Your song was added!')
            // make sure there is front end to support flash message
            return res.redirect('/track/search')
        } else {
            console.log('song could not be added')
            req.flash('error', 'song could not be added to the playlist')
            return res.redirect('/track/search')
        }
            // res.redirect('/playlist/playlist')
            // res.send('/playlist/playlist')
        }).catch(function (err) {
            console.log(err)
        })
})


// should delete a song from the users library 
router.delete('/delete/:id', function (req, res) {
    console.log('👁👁👁👁👁👁👁')
    let playlistUrl = `https://api.spotify.com/v1/playlists/${req.body.playlist}/tracks`
    spotify
    .request(playlistUrl)
    axios.delete(playlistUrl, {"tracks":  [{ "uri": [`spotify:track:${req.params.id}`], "positions": [0]}]}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('spotifyToken')}`
    }
    }).then(function([track, deleted]) {
        if (deleted) {
            req.flash('You removed the song')
            req.redirect('track/search')
        }
    
    }).catch(function(err) {
        console.log(err.response.data)
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

 // router.put('/:id', function(req, res) {
//     var playlistUrl = `https://api.spotify.com/v1/playlists/${req.body.trackId}`
//     spotify
//     .request(playlistUrl)
//     axios.put(playlistUrl, { 
//         "name": "Updated Playlist Name",
//         "description": "Updated playlist description",
//         "public": false
//       })
// })

module.exports = router