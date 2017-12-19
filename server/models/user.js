var mongoose = require('mongoose');

var User = mongoose.model('Users', {
    name:{
        type: String,
        required: true,
        minlength: 4,
        trim: true
    },
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
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