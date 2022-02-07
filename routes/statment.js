const express = require('express')
const passport = require('passport')
const controller = require('../controllers/nsjnew')
const router = express.Router()



router.post('/', passport.authenticate('jwt', {session:false}), controller.createZayav)



module.exports = router