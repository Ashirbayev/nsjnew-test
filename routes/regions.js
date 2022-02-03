const express = require('express')
const passport = require('passport')
const controller = require('../controllers/nsjnew')
const router = express.Router()


router.get('/', passport.authenticate('jwt', {session:false}), controller.getAllRegions)
router.get('/:id', passport.authenticate('jwt', {session:false}), controller.getZavNum)
module.exports = router