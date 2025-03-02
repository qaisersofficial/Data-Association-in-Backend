const mongoose = require('mongoose');
//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1:27017/miniproject';
mongoose.connect(mongoDB);

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        }
    ]
});
module.exports = mongoose.model('user', userSchema);