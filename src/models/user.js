const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('user', userSchema);

module.exports = User;