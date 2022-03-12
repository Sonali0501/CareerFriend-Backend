const express = require('express')
const router = express.Router()
const Profile = require('../models/profile')

router.get('/', async (req,res) => {
    try {
        const profile = await Profile.find()
        res.status(200).json(profile)
    } catch(err) {
        console.log(err)
        res.status(400).send({Error: err})
    }
})

module.exports = router