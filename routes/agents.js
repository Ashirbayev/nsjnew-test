const express = require('express')
const passport = require('passport')
const controller = require('../controllers/agent')
const router = express.Router()


router.get('/',  controller.getAgents)
router.get('/',   controller.getAgents)

module.exports = router