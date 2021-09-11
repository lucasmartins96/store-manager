const Joi = require('joi');
const productsModel = require('../models/productsModel');

const validateFields = (productData) => {
  const { error } = Joi.object({
    name: Joi.string().not().empty().min(5)
.required(),
    quantity: Joi.number().strict().integer().not()
.empty()
.min(1)
.required(),
  }).validate(productData);

  if (error) {
    const { details } = error;
    const [errorDetail] = details;
    return { error: { code: 'INVALID_DATA', message: errorDetail.message } };
  }
  return false;
};

const create = async (name, quantity) => {
  const isInvalid = validateFields({ name, quantity });
  if (isInvalid) return isInvalid;

  const existsProduct = await productsModel.findByName(name);

  if (existsProduct) return { error: { code: 'INVALID_DATA', message: 'Product already exists' } };

  const newProduct = await productsModel.create(name, quantity);
  return newProduct;
};

const findById = async (id) => {
  const productData = await productsModel.findById(id);

  if (!productData) return { error: { code: 'INVALID_DATA', message: 'Wrong id format' } };

  return productData;
};

const getAll = async () => productsModel.getAll();

const update = async (product) => {
  const { name, quantity } = product;
  const isInvalid = validateFields({ name, quantity });
  if (isInvalid) return isInvalid;

  const productUpdated = productsModel.update(product);
  return productUpdated;
};

const deleteById = async (id) => {
  const productData = await productsModel.deleteById(id);

  if (!productData) return { error: { code: 'INVALID_DATA', message: 'Wrong id format' } };

  return productData;
};

module.exports = {
  create,
  findById,
  getAll,
  update,
  deleteById,
};
