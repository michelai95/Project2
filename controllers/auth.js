// Import libraries 
const express = require('express')
const router = express.Router()
const db = require('../models')
const flash = require('connect-flash')
const passport = require('../config/ppConfig')
const { Router } = require('express')

// logout get route 
router.get('/logout', function (req, res) {
    req.logout()
    res.redirect('/')
})

module.exports = router


