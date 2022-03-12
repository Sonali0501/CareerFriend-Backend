const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')

const secret = process.env.SECRET;

router.post('/login', async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email })
        if(!existingUser) {
            res.status(200).json({
                error: true,
                message: 'User does not exist'
            })
        } else {
            if(req.body.password === existingUser.password) {
                userDetails = { 
                    email: existingUser.email, 
                    password: existingUser.password,
                    name: existingUser.name,
                    type: existingUser.type,
                    phone: existingUser.phone
                }
                const token = jwt.sign(userDetails, secret)
                res.status(200).json({
                    error: false,
                    message: 'user token generated',
                    data: {
                        token: token,
                        ...userDetails
                    }
                })
            }
            else {
                res.status(200).json({
                    error: true,
                    message: 'incorrect password'
                })
            } 
        }
    } catch (err) {
        console.log("ERR", err)
        res.status(500).json({
            error: true,
            message: 'Something went wrong'
        })
    } 
})

router.post('/signup', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        type: req.body.type,
        password: req.body.password
    })
    try {
        const existingUser = await User.findOne({ email: req.body.email })
        if(existingUser) {
            res.status(200).json({
                error: true,
                message: 'User already exists'
            })
        } else {
            const cuser = await user.save()
            const new_user = {
                name: cuser.name,
                email: cuser.email,
                phone: cuser.phone,
                type: cuser.type,
                password: cuser.password
            }
            const token = jwt.sign(new_user, secret)
            res.status(200).json({
                error: false,
                message: 'User created successfully',
                data: {
                    token: token,
                    ...new_user
                }
            })
        } 
    } catch(err) {
        console.log("ERR", err)
        res.status(500).json({
            error: true,
            message: 'Something went wrong'
        })
    }
})

module.exports = router