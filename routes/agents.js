const express = require('express')
const passport = require('passport')
const controller = require('../controllers/agent')
const router = express.Router()


router.get('/', passport.authenticate('jwt', {session:false}),  controller.getAgents)


module.exports = router