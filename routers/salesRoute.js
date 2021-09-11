const express = require('express');
const salesController = require('../controllers/salesController');
const { handleErrors } = require('../middlewares/responseErrors');

const router = express.Router();

router.post('/', salesController.create);

router.get('/:id', salesController.findById)
      .get('/', salesController.getAll);

router.put('/:id', salesController.update);

router.delete('/:id', salesController.deleteById);

router.use(handleErrors);

module.exports = router;
