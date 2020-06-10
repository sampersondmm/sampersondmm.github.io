const mongoose = require('mongoose');
const User = require('./userModel')

const canvasSchema = new mongoose.Schema({
    canvasData: {
        type: Object,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

canvasSchema.pre('remove', async function(next){
    try {
        let user = await User.findById(this.user);
        user.canvas.remove(this.id);
        await user.save();
        return next();
    } catch (err) {
        return next(err);
    }
})

const Canvas = mongoose.model('Canvas', canvasSchema);
module.exports = Canvas;