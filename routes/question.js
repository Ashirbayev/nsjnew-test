const express = require('express')
const passport = require('passport')
const controller = require('../controllers/question')
const router = express.Router()

router.get('/', passport.authenticate('jwt', {session:false}),  controller.getAllQuestions)


module.exports = router