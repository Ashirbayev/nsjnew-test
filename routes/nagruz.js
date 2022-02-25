const express = require('express')
const passport = require('passport')
const controller = require('../controllers/dpokrs')

const router = express.Router()




router.get('/:id', passport.authenticate('jwt', {session:false}), controller.getNagruzById)


module.exports = router