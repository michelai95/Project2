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
router.get('/:id', function (req, res) {
    spotify
        .request(`https://api.spotify.com/v1/users/${req.params.id}/playlists`)
        .then(function (data) {
            console.log(data.items[0].owner)
            res.render('playlist/playlist', { data: {...data, userId: data.items[0].owner.id} })
        }).catch(function (err) {
            console.log(err);
        })
});

module.exports = router