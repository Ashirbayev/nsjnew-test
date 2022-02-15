const express = require('express')
const passport = require('passport')
const controller = require('../controllers/nsjnew')
const router = express.Router()



router.post('/', passport.authenticate('jwt', {session:false}), controller.createObtain)
router.get('/:id', passport.authenticate('jwt', {session:false}), controller.deleteObtain)


module.exports = router