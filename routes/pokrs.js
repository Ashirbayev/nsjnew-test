const express = require('express')
const passport = require('passport')

const controller = require('../controllers/nsjnew')
const router = express.Router()


//router.get('/', passport.authenticate('jwt', {session:false}), controller.getAll)
router.get('/', passport.authenticate('jwt', {session:false}), controller.getPokrs)
router.post('/', passport.authenticate('jwt', {session:false}), controller.setPokrs)

module.exports = router