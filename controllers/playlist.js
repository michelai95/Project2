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
            console.log(data.items[0].tracks)
            res.render('playlist/playlist', { data })
        }).catch(function (err) {
            console.log(err);
        })
});

router.get('/:name', function (req, res) {
    spotify
        .search({ type: 'track', query: req.query.name }, function (err, data) {
            if (err) {
                return console.log('Error occurred' + err)
            }
            console.log(data)
        })
        .then(function (data) {
            console.log(data)
            // render page for searched songs 
            // add search bar 
            // connect ejs file to next route (put to update song to spotify)
            res.render('tracks/search', {results: results})
        }).catch(function (err) {
            console.log(err)
        })
})

router.post('/track', function(req, res) {
    db.findOne({
        where: {
            name: req.params.name
        }
    }).then(function(track) {
        db.song.create
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


// should delete a song from the users library 
router.delete('/:id', function (req, res) {
    spotify
        .request(`https://api.spotify.com/v1/playlists/${req.params.id}/tracks`)
    db.song.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (tracks) {
        res.redirect('/playlist/playlist')
    })
})

module.exports = router