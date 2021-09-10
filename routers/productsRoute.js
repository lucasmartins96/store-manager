const express = require('express');
const productsController = require('../controllers/productsController');
const { handleErrors } = require('../middlewares/responseErrors');

const router = express.Router();

router.post('/', productsController.create);

router.get('/:id', productsController.findById)
.get('', productsController.getAll);

router.put('/:id', productsController.update);

router.use(handleErrors);

module.exports = router;
