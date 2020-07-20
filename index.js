// required NPM libraries 
require('dotenv').config()
// const Express = require('express')
const ejsLayouts = require('express-ejs-layouts')

// require all middleware
const helmet = require('helmet')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('./config/ppConfig')
const db = require('./models')
const isLoggedIn = require('./middleware/isLoggedIn')
const Spotify = require('node-spotify-api');
let methodOverride = require('method-override')

const express = require('express')
var request = require('request')
var cors = require('cors')
var querystring = require('querystring')
var cookieParser = require('cookie-parser')

var client_id = process.env.CLIENT_ID
var client_secret = process.env.CLIENT_SECRET
var redirect_uri = process.env.REDIRECT_URI
let localStorage = require('localStorage')

// generates random string containing numbers and letters

// @param {number}
// @return {string}

var generateRandomString = function (length) {
    var text = ""
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

var stateKey = 'spotify_auth_state'

// var app = express();

// session library to store session date 
const SequelizeStore = require('connect-session-sequelize')(session.Store)

// APP setup
const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(require('morgan')('dev'))
app.use(helmet())
app.use(express.static('public'))
app.use(methodOverride("_method"))

// sequelize store class 
const sessionStore = new SequelizeStore({
    db: db.sequelize,
    expiration: 1000 * 60 * 30
})

// decalre attributes for session
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: true
}))

sessionStore.sync()
app.use(express.static(__dirname + '/public'))
    .use(cors())
    .use(cookieParser());

// initialize flash messages, passport, and sessions 
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())


// directs us to the next route 
app.use(function (req, res, next) {
    res.locals.alerts = req.flash()
    res.locals.currentUser = req.user

    next()
})

// ROUTES 

app.get('/', function (req, res) {
    console.log('I am here')
    res.render('index')
})

app.get('/login', function (req, res) {
    console.log(redirect_uri)
    var state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your application requests authorization
    var scope = 'user-read-private user-read-email playlist-modify-public user-library-read user-library-modify playlist-read-collaborative playlist-modify-private';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
})


app.get('/profile', function (req, res) {
    // your application requests refresh and access tokens
    // after checking the state parameter
    console.log('🌞')

    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        res.clearCookie(stateKey);
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
        };

        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {

                var access_token = body.access_token,
                    refresh_token = body.refresh_token;
                localStorage.setItem('spotifyToken', access_token)
                var options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: { 'Authorization': 'Bearer ' + access_token },
                    json: true
                };

                // use the access token to access the Spotify Web API
                request.get(options, function (error, response, body) {
                    res.render('profile/profile', { body })
                });

                // we can also pass the token to the browser to make requests from there
                // res.redirect('/#' +
                querystring.stringify({
                })
            } else {
                res.redirect('/#' +
                    querystring.stringify({
                        error: 'invalid_token'
                    }));
            }
        });
    }
})


// Token refresh route 
app.get('/refresh_token', function (req, res) {

    // requesting access token from refresh token
    var refresh_token = req.query.refresh_token;
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: { 'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')) },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };

    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var access_token = body.access_token;
            res.send({
                'access_token': access_token
            });
        }
    });
});

app.get('/playlist', function (req, res, body) {
    res.render('playlist/playlist', { body })
})

app.get('/logout', function (req, res) {
    req.logout()
    res.redirect('/')
})

// call on routes from controller folder 
app.use('/auth', require('./controllers/auth'))
app.use('/playlist', require('./controllers/playlist'))
app.use('/track', require('./controllers/track'))

// initialize Server 
app.listen(process.env.PORT || 3000, () => {
    console.log(`firing on all ${process.env.PORT} cylinders`)
})