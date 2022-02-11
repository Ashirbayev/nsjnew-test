const express = require('express')
const passport = require('passport')

const controller = require('../controllers/anderaiting')
const router = express.Router()


//router.get('/', passport.authenticate('jwt', {session:false}), controller.getAll)
router.get('/:id', passport.authenticate('jwt', {session:false}), controller.getById)