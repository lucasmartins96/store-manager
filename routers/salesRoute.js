const express = require('express');
const salesController = require('../controllers/salesController');
const { handleErrors } = require('../middlewares/responseErrors');

const router = express.Router();

router.post('/', salesController.create);

router.use(handleErrors);

module.exports = router;
