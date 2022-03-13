const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const url = process.env.URL

const app = express()

mongoose.connect(url, {useNewUrlParser:true})

const con = mongoose.connection

con.on('open', () => {
    console.log('connected to db')
})

app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use(express.json())

const userRouter = require('./routes/user')
const profileRouter = require('./routes/profile')
const connectionRouter = require('./routes/connection')
app.use('/user', userRouter)
app.use('/profile', profileRouter)
app.use('/connection', connectionRouter)

app.listen(9000, () => {
    console.log('Server Started')
})