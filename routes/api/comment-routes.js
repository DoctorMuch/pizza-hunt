const router = require('express').Router();

const {
  addNewComment,
  removeComment
} = require('../../controllers/comment-controller');

router
  .route('/:pizzaId')
  .post(addNewComment);

router
  .route('/:pizzaId/:commentId')
  .delete(removeComment);

module.exports = router;