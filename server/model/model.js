const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
        
    },
    author: {
        type: String,
        required: true
        
    },
    status: String
})

const Bookdb = mongoose.model('bookdb', schema);

module.exports = Bookdb;