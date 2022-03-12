const mongoose = require('mongoose')

const connectionSchema = new mongoose.Schema({
    mentor: {
        type: mongoose.Schema.Types.ObjectId , ref: 'user',
        required: true
    },
    mentee: {
        type: mongoose.Schema.Types.ObjectId , ref: 'user',
        required: true
    },
    area: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['closed', 'open', 'pending', 'rejected']
    }
})

module.exports = mongoose.model('connection', connectionSchema)
