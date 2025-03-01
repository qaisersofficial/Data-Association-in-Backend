const mongoose = require('mongoose');
//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1:27017/miniproject';
mongoose.connect(mongoDB);

const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    date: {
        type: Date,
        default: Date.now
    },
    content: String,
    likes: [
        {type: mongoose.Schema.Types.ObjectId, ref:"user"}
    ]
});

module.exports = mongoose.model('post', postSchema);