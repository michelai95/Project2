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
        .search({ type: 'artist OR album OR track', query: req.query.name, limit: 20 }, function (err, data) {
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

router.post('/tracks/:id', function (req, res) {
    spotify
        .request(`https://api.spotify.com/v1/albums/` + req.params.id + `/tracks`)
        .then(function (data) {
            console.log(data)
            res.render('/search', { results: data.items })
        }).catch(function (err) {
            console.log(err)
        })
    db.song.create({
        name: req.params.name,
        content: req.params.preview,
        userId: req.body.userId
    }).then(function (data) {
        res.redirect('/search', {data})
    })
})

// should delete a song from the users library 
router.delete('/:id', function (req, res) {
    spotify
    .request(`https://api.spotify.com/v1/playlists/${req.params.id}/tracks`)
    db.song.destroy({
        where: {
            name: req.params.name,
            id: req.params.id
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