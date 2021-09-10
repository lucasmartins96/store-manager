const productsService = require('../services/productsService');

const OK_STATUS_CODE = 200;
const CREATED_STATUS_CODE = 201;

const create = async (req, res, next) => {
  const { name, quantity } = req.body;

  const newProduct = await productsService.create(name, quantity);

  if (newProduct.error) return next(newProduct.error);

  return res.status(CREATED_STATUS_CODE).json(newProduct);
};

const findById = async (req, res, next) => {
  const { id } = req.params;

  const productData = await productsService.findById(id);

  if (productData.error) return next(productData.error);

  res.status(OK_STATUS_CODE).json(productData);
};

module.exports = {
  create,
  findById,
};
