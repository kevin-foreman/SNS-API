const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
    {
        userName: {
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
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
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

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// Create a User model using the schema
const User = model('User', UserSchema);

module.exports = User;