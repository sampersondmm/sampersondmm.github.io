const mongoose = require('mongoose');
const User = require('./user')

const canvasSchema = new mongoose.Schema({
    canvasData: {
        type: Object
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Message = mongoose.model;
module.exports = Message;