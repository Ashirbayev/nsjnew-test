const express = require('express')
const passport = require('passport')
const controller = require('../../controllers/statment/anderaiting') // вложенный

const router = express.Router()


router.post('/', passport.authenticate('jwt', {session:false}), controller.calculator)
//router.get('/', passport.authenticate('jwt', {session:false}), controller.calc)

module.exports = router