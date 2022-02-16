const express = require('express')
const passport = require('passport')
const controller = require('../controllers/nsjnew')
const controller2 = require('../controllers/nsjstatment')
const router = express.Router()



router.post('/', passport.authenticate('jwt', {session:false}), controller.createZayav)
router.get('/', passport.authenticate('jwt', {session:false}), controller2.getStatments)
router.get('/:id', passport.authenticate('jwt', {session:false}), controller2.getStatmentById)

module.exports = router