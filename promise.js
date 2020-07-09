const userPlaylist = require('https://api.spotify.com/v1/{user_id}/playlists')
const createPlaylist = require('https://api.spotify.com/v1/playlists/{playlist_id}/tracks')

module.exports = {
    index
}

const view = userPlaylist.find((err, userPlaylists) => {
    return userPlaylists
})

const create = createPlaylist.find((err, createPlaylists) => {
    return createPlaylists
})

function index(req, res) {
    Promise.all([view, create]).then((values) => {
        res.render('index', {
            userPlaylists: values,
            createPlaylists:  values
        })
    })
}