// required NPM libraries 

// config dotenv
require('dotenv').config()
//require express app instance
const Express = require('express')
// require and set view engine using ejs 
const ejsLayouts = require('express-ejs-layouts')

// require all middleware
const helmet = require('helmet')
//express sessions/sequelize sessions
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('./config/ppConfig')
const db = require('./models')
const isLoggedIn = require('./middleware/isLoggedIn')


// session library to store session date 
const SequelizeStore = require('connect-session-sequelize')(session.Store)

// APP setup
const app = Express()
app.use(Express.urlencoded({extended: false}))
app.use(Express.static(__dirname + '/public'))
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(require('morgan')('dev'))
app.use(helmet())

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

// initialize flash messages, passport, and sessions 
// app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// directs us to the next route 
app.use(function(req, res, next) {
    res.locals.alerts = req.flash()
    res.locals.currentUser = req.user

    next()
})

// ROUTES 

app.get('/', function(req, res) {
    res.render('index')
})

app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile', {test: "another test"})
})

// call on routes page 
app.use('/route', require('./controllers/auth'))

// authenticate 
app.get('/login', function(req, res) {
    var scopes = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' + my_client_id +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' + encodeURIComponent(redirect_uri));
    });

// initialize Server 
app.listen(process.env.PORT || 3000, () => {
    console.log(`firing on all ${process.env.PORT} cylinders`)
})