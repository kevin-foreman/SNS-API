const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    removeThought,
    addReaction,
    getAllreaction,
    updateReaction,
    removeReaction
} = require('../../controllers/thought-controller');

router
    .route('/')
    .get(getAllThoughts);

router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought);

router
    .route('/:userId/:id')
    .put(addReaction)
    .delete(removeThought);

router
    .route('/:userId')
    .post(createThought);

router
    .route('/:userId/:id/:reactionId')
    .put(updateReaction)
    .delete(removeReaction);

module.exports = router;