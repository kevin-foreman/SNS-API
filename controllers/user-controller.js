const { User, Thought, Reaction } = require('../models');

const userController = {
    getAllUser(req, res) {
        User.find({})
        .select('-__v')
        .sort({ _id: -1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // Get a single user by ID
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate([
            { path: 'thoughts', select: '-__v' },
            { path: 'friends', select: '-__v' }
        ])
        .select('-__v')
        .then(dbUserData => {
            // If no user is found send 404 error
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with that ID' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // Create a user 
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    // Update a user's information
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with that ID.'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    // Delete a user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with that ID.' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    //  Add a friend to a user
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: { friends: params.friendId } },
            {new: true, runValidators: true}
        )
        .then (dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with that Id' });
                return;
            }
            // add friend's user ID to user's friend list
            User.findOneAndUpdate(
                { _id: params.friendId },
                { $addToSet: { friends: params.userId } },
                { new: true, runValidators: true }
            )
            .then (dbUserData2 => {
                if (!dbUserData2) {
                    res.status(404).json({ message: 'No user found with that friend ID' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
        })
        .catch(err => res.json(err))
    },

    // Remove a friend (oh no, was it political?)
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.UserId },
            { $pull: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
        .then (dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with that ID' });
                return;
            }
            User.findOneAndUpdate(
                { _id: params.friendsId },
                { $pull: { friends: params.userId } },
                { new: true, runValidators: true }
            )
            .then (dbUserData2 => {
                if (!dbUserData2) {
                    res.status(404).json({ message: 'No user found with that friend ID' });
                    return;
                }
                res.json({ message: 'Friend removed' });
            })
            .catch(err => res.json(err));
        })
        .catch(err => res.json(err));
    }
};

module.exports = userController;