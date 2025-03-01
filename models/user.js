const mongoose = require('mongoose');
//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1:27017/miniproject';
mongoose.connect(mongoDB);

const userSchema = mongoose.Schema({
    username: String,
    name: String,
    email: String,
    age: Number,
    password: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        }
    ]
});

module.exports = mongoose.model('user', userSchema);