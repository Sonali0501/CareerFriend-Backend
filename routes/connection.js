const express = require('express')
const router = express.Router()
const Connection = require('../models/connection')
const { authenticate } = require('../helpers')
const User = require('../models/user')

router.get('/get_connections', authenticate, async (req,res) => {
    try {
        const connections = await Connection.find({ '$or': [ { mentor: req.user._id }, { mentee: req.user._id } ] })
        res.status(200).json({
            data: connections,
            error: false,
            message: 'fetched connections'
        })
    } catch(err) {
        console.log("ERR", err)
        res.status(500).json({
            error: true,
            message: 'Something went wrong'
        })
    }
})

router.post('/add_connection', authenticate, async (req, res) => {
    try {
        const existingConnection = await Connection.find({ mentor: req.body.mentor_id, mentee: req.user._id })
        if(!existingConnection) {
            const connection = new Connection({
                mentee: req.user._id,
                mentor: req.body.mentor_id,
                area: req.body.area,
                status: 'pending'
            })
            const new_connection = await connection.save()
            res.status(200).json({
                data: new_connection,
                error: false,
                message: 'connection created'
            })
        } else {
            res.status(200).json({
                data: existingConnection,
                error: true,
                message: 'connection exists'
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

router.patch('/update_connection', authenticate, async (req, res) => {
    try {
        if(req.body.mentor_id) {
            const connection = await Connection.findOneAndUpdate({ mentor: req.body.mentor_id, mentee: req.user._id }, { '$set': { status: req.body.status } }, { returnOriginal: false } )
            res.status(200).json({
                data: connection,
                error: false,
                message: 'connection updated'
            })
        } else if(req.body.mentee_id) {
            const connection = await Connection.findOneAndUpdate({ mentee: req.body.mentee_id, mentor: req.user._id }, { '$set': { status: req.body.status } } , { returnOriginal: false })
            res.status(200).json({
                data: connection,
                error: false,
                message: 'connection updated'
            })
        } else {
            res.status(200).json({
                error: true,
                message: 'either mentor_id or mentee_id required'
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