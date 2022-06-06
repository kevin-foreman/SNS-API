const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thought-controller');

router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);

router
    .route('/:Id/reactions/')
    .post(addReaction)
    .get(getAllReaction);

router
    .route('/:userId/:id/:reactionId')
    .put(updateReaction)
    .delete(removeReaction);

module.exports = router;