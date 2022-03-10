const express = require('express')
const passport = require('passport')
const controller = require('../../controllers/statment/obtainEdit') // вложенный

const router = express.Router()

router.patch('/:id', passport.authenticate('jwt', {session:false}), controller.editObtain)


module.exports = router