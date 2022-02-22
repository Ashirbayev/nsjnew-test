const express = require('express')
const passport = require('passport')
const controller = require('../controllers/client')

const router = express.Router()


router.get('/:id', passport.authenticate('jwt', {session:false}), controller.getClientByID)

module.exports = router