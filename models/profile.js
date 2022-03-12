const mongoose = require('mongoose')

const educationSchema = new mongoose.Schema({
    university: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    major: {
        type: String,
        required: true
    },
    start_year:{
        type: Number
    },
    end_year:{
        type: Number
    }
}, { _id: false })

const experienceSchema = new mongoose.Schema({
    organization: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    start_year:{
        type: Number
    },
    end_year:{
        type: Number
    }
}, { _id: false })

const certificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    }
}, { _id: false })

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true,
        enum: ['Beginner', 'Intermediate', 'Expert']
    }
}, { _id: false })

const feedbackSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId , ref: 'user',
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    description: {
        type: String
    }
}, { _id: false })

const profileSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId , ref: 'user',
        required: true
    },
    location: {
        type: String,
        required: true
    },
    education: {
        type: [
            educationSchema
        ],
    },
    experience: {
        type: [
            experienceSchema
        ]
    },
    certification: {
        type: [
            certificationSchema
        ]
    },
    skills: {
        type: [
            skillSchema
        ],
        required: true
    },
    languages: {
        type: [
            {
                type: String,
                required: true
            }
        ],
        required: true
    },
    interests: {
        type: [
            {
                type: String,
                required: true
            }
        ],
        required: true
    },
    feedback: {
        type: [
            feedbackSchema
        ]
    },
    average_rating: {
        type: Number,
        default: undefined
    }
})

module.exports = mongoose.model('profile', profileSchema)