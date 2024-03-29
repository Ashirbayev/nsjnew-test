const express = require("express")
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require("body-parser")
const authRoutes = require('./routes/auth')
const analyticsRoutes = require('./routes/analytics')
const nsjnewRoutes = require('./routes/nsjnew')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')
const regionsRoutes = require('./routes/regions')
const questionRoutes = require('./routes/question')
const agentRoutes = require('./routes/agents')
const statmentRoutes = require('./routes/statment')
const obtainRoutes = require('./routes/vigodos')
const obtainPokrs = require('./routes/pokrs')
const answersRoutes = require('./routes/answers')
const clientRoutes = require('./routes/client')
const dpokrsRoutes = require('./routes/dpokrs')
const nagruzRoutes = require('./routes/nagruz')
const obtainsRoutes = require('./routes/statment/obtain')
const anderaitingsRoutes = require('./routes/statment/anderaiting')
const editObtainRoutes = require('./routes/statment/obtainEdit')



const keys =require('./config/keys')
const app = express()

mongoose.connect(keys.mongoURI)
    .then(() => console.log('MongoDB connected.'))
    .catch(error => console.log(error))








app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('cors')())

app.use('/api/auth', authRoutes)
app.use('/api/statments', analyticsRoutes)
app.use('/api/nsjnew', nsjnewRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)
app.use('/api/regions', regionsRoutes)
app.use('/api/question', questionRoutes)
app.use('/api/agents', agentRoutes)
app.use('/api/statment', statmentRoutes)
app.use('/api/vigodos', obtainRoutes)
app.use('/api/pokrs', obtainPokrs)
app.use('/api/answers', answersRoutes)
app.use('/api/client', clientRoutes)
app.use('/api/dpokrs', dpokrsRoutes)
app.use('/api/nagruz', nagruzRoutes)
app.use('/api/obtain', obtainsRoutes)
app.use('/api/anderaiting', anderaitingsRoutes)
app.use('/api/editobtain', editObtainRoutes)



module.exports = app