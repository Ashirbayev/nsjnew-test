const express = require('express')
const passport = require('passport')
const controller = require('../controllers/nsjstatment')

const router = express.Router()


router.get('/:id', passport.authenticate('jwt', {session:false}), controller.getAnswerById)

module.exports = router