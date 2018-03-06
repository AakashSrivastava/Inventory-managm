const mongoose = require('mongoose');

// User Schema
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: 'password'
    },
    address: {
        type: String,
        default: "normal"
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUsers = function(callback) {
    User.find(callback);
}
module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}
module.exports.getUserByEmail = function(email, callback) {
    const query = {
        email: email
    };
    User.findOne(query, callback);
}
module.exports.addUser = function(newUser, callback) {
    User.create(newUser, callback);
}


module.exports.deleteUser = (user, callback) => {
    const query = {
        email: user.email
    };
    User.findOne(query, (err, user) => {
        User.findByIdAndRemove(user._id, callback);
    });
}