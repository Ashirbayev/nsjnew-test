const express = require('express')
const passport = require('passport')
const controller = require('../../controllers/statment/obtain') // вложенный

const router = express.Router()

router.get('/:id', passport.authenticate('jwt', {session:false}), controller.getObtainByID)


module.exports = router