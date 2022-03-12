const express = require('express')
const router = express.Router()
const Connection = require('../models/connection')
const { authenticate } = require('../helpers')

router.get('/', async (req,res) => {
    try {
        const connections = await Connection.find()
        res.status(200).json(connections)
    } catch(err) {
        console.log(err)
        res.status(400).send({Error: err})
    }
})

module.exports = router