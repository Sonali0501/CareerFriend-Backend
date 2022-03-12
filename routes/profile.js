const express = require('express')
const router = express.Router()
const Profile = require('../models/profile')
const { authenticate } = require('../helpers')

router.get('/get_profile', authenticate, async (req,res) => {
    try {
        console.log('user', req.user)
        const profile = await Profile.find({ user_id: req.user._id })
        res.status(200).json(profile)
    } catch(err) {
        console.log("ERR", err)
        res.status(500).json({
            error: true,
            message: 'Something went wrong'
        })
    }
})

module.exports = router