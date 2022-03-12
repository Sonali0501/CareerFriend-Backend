const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', async (req,res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch(err) {
        console.log(err)
        res.status(400).send({Error: err})
    }
})

router.post('/', async (req,res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        type: req.body.type,
        password: req.body.password
    })
    try {
        const cuser = await user.save()
        res.status(200).json(cuser)
    } catch(err) {
        console.log(err)
        res.status(400).send({Error: err})
    }
})

module.exports = router