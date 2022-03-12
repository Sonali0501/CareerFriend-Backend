const express = require('express')
const router = express.Router()
const Profile = require('../models/profile')
const { authenticate } = require('../helpers')

router.get('/get_profile', authenticate, async (req,res) => {
    try {
        console.log('user', req.user)
        const profile = await Profile.find({ user_id: req.user._id })
        res.status(200).json({
            ...profile,
            error: false,
            message: 'profile fetched'
        })
    } catch(err) {
        console.log("ERR", err)
        res.status(500).json({
            error: true,
            message: 'Something went wrong'
        })
    }
})

router.post('/update_profile', authenticate, async (req, res) => {
    try {
        const user = req.user
        console.log('User_id', user._id)
        const req_profile = { 
            ...req.body,
            user_id: user._id
        }
        await Profile.replaceOne({ user_id: user._id }, req_profile, { upsert: true })
        const profile = await Profile.findOne({ user_id: user._id })
        res.status(200).json({
            ...profile._doc,
            error: false,
            message: 'Profile Created'
        })
    } catch(err) {
        console.log("ERR", err)
        res.status(500).json({
            error: true,
            message: 'Something went wrong'
        })
    }
})

module.exports = router