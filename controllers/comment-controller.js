const { Pizza, Comment } = require('../models');

const commentController = {
  addNewComment({ params, body }, res) {
    console.log(body);
    Comment.create(body)
      .then(({ _id }) => {
        return Pizza.findOneAndUpdate(
          { _id: params.pizzaId },
          { $push: { comments: _id } },
          { new: true }
        );
      })
      .then(dbPizzaData => {
        if(!dbPizzaData) {
          res.status(404).json({ message: 'No such pizza for your comment!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.status(400).json(err));
  },

  removeComment({ params }, res) {
    Comment.findOneAndDelete({ _id: params.commentId })
      .then(deletedComment => {
        if(!deletedComment) {
          return res.status(404).json({ message: 'That is not a comment that I can find.' });
        }
        return Pizza.findOneAndUpdate(
          { _id: params.pizzaId },
          { $pull: { comments: params.commentId } },
          { new: true } 
        );
      })
      .then(dbPizzaData => {
        if(!dbPizzaData) {
          res.status(404).json({ message: 'No such pizza has been found.' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.json(err));
  }
};

module.exports = commentController;