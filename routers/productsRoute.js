const express = require('express');
const productsController = require('../controllers/productsController');
const { handleErrors } = require('../middlewares/responseErrors');

const router = express.Router();

router.post('/', productsController.create);

router.use(handleErrors);

module.exports = router;