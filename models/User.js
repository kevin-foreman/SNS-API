const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'You need to provide a user name.',
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/]
        },
        thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
        friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
    id: false
    }
);

// Get tally of friends per user

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// Create a User model using the schema
const User = model('User', userSchema);

module.exports = User;