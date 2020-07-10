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

router.get('/:id', function (req, res) {
    spotify
        .request(`https://api.spotify.com/v1/users/${req.params.id}/playlists`)
        .then(function (data) {
            // spotify
            //     .request(`https://api.spotify.com/v1/me/tracks`)
            //     .then(function (tracks) {
                    console.log(data)
                    res.render('playlist/playlist', {data})
            //     }).catch(function (err) {
            //         console.log(err);
            //     })
}).catch (function(err) {
    console.log(err);
});
})

router.put('/:id', function(req, res) {
    spotify
    .request(`https://api.spotify.com/v1/me/tracks`)
    .then(function(tracks) {
        db.song.findOrCreate({
            where: {
                ids: [req.params.id]
            }
        })
    })
})

// // should provide a list of songs the user has liked/saved 
// router.post('/:id/tracks', function(req, res) {
//     spotify
//     .request(`https://api.spotify.com/v1/playlists/${req.params.id}/tracks`)
//     .then(function (tracks) {
//         db.song.findAll({
//             where: {
//                 track: req.body.name,
//                 id: req.params.id,
//                 artists: req.body.name
//             }
//         }).then(newSong => {
//             res.redirect('/:id/', {tracks: tracks, id: req.params.id})
//             console.log(tracks)
//         })
//     }).catch(function(err) {
//         console.log(err)
//     })
// })

// // should delete a song from the users library 
// router.delete('/:id/tracks/:id', function(req, res) {
//     spotify
//     .request(`https://api.spotify.com/v1/playlists/${req.params.id}/tracks`)
//     db.song.findOne({
//         where: {
//             ids: req.params.id
//         }
//     }).then(function (tracks) {
//         res.redirect('/:id/tracks/', )
//     })
// })

/*--------- TA Help ------- */

// // POST route for creating a playlist 
// app.post('/', function (req, res) {
//     var playlistUrl = 'https://api.spotify.com/v1/{user_id}/playlists'
//     axios.get(playlistUrl).then(function (apiResponse) {
//         var playlist = apiResponse.data.results
//         res.render('profile/profile', { playlist })
//     })
// }).then( // POST route for adding items to a playlist 
//     app.post('/', function (req, res) {
//         var playlistUrl = 'https://api.spotify.com/v1/playlists/{playlist_id}/tracks'
//         axios.get(playlistUrl).then(function (apiResponse) {
//             var playlist = apiResponse.data.results
//             req.render('profile/profile', { playlist: req.params.playlist })
//         })
//     }))



// // DELETE route for removing items from a playlist 
// app.delete('id/tracks', function (req, res) {
//     db.song.destory({
//         "tracks": [
//             {
//                 "uri": "spotify:track:2DB2zVP1LVu6jjyrvqD44z",
//                 "positions": [
//                     0
//                 ]
//             },
//             {
//                 "uri": "spotify:track:5ejwTEOCsaDEjvhZTcU6lg",
//                 "positions": [
//                     1
//                 ]
//             }
//         ]
//         }).then(res.redirect('/playlist/id'))
//     })

module.exports = router