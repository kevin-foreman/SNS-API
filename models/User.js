const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
    {
        userName: {
            type: String,
            required: 'You need to provide a user name.',
            trim: true
        },

    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// Get tally of thoughts and reactions per user
UserSchema.virtual('thoughtCount').get(function () {
    return this.thoughts.reduce((total, thought) => total + thought.reactions.length + 1, 0);
});

// Create a User model using the schema
const User = model('User', UserSchema);

module.exports = User;