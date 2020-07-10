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

// either move below search or change url to '/user/:id'
router.get('/users/:id', function (req, res) {
    spotify
        .request(`https://api.spotify.com/v1/users/${req.params.id}/playlists`)
        .then(function (data) {
            console.log(data.items[0].tracks)
            res.render('playlist/playlist', { data })
        }).catch(function (err) {
            console.log(err);
        })
});

router.get('/search/:name', function (req, res) {
    spotify
        .search({ type: 'track', query: req.params.name }, function (err, data) {
            if (err) {
                return console.log('Error occurred' + err)
            }
            console.log(data)
        })
        .then(function (tracks) {
            console.log('saved')
            // render page for searched songs 
            // add search bar 
            // connect ejs file to next route (put to update song to spotify)
            res.render('/songs/songs')
        }).catch(function (err) {
            console.log(err)
        })
})



// // should delete a song from the users library 
router.delete('/:id', function (req, res) {
    spotify
        .request(`https://api.spotify.com/v1/playlists/${req.params.id}/tracks`)
    db.song.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (tracks) {
        res.redirect('/')
    })
})

module.exports = router