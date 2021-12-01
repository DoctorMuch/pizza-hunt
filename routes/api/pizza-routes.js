const router = require('express').Router();
const {
  getAllPizza,
  getPizzaById,
  createNewPizza,
  updatePizza,
  removePizza
} = require('../../controllers/pizza-controllers');

router
  .route('/')
  .get(getAllPizza)
  .post(createNewPizza);

  router
    .route('/:id')
    .get(getPizzaById)
    .put(updatePizza)
    .delete(removePizza);

module.exports = router;