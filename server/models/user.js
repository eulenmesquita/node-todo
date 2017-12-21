const mongoose = require('mongoose');
const validator = require('validator');

var User = mongoose.model('Users', {
    name:{
        type: String,
        minlength: 4,
        trim: true
    },
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }],
    age: {
        type: Number,
        default: null,
        min: 1, 
    },
    location:{
        type: String,
        minlength: 1,
        default: null    
    }
});

module.exports = { User }