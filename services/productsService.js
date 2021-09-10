const Joi = require('joi');
const productsModel = require('../models/productsModel');

const validateFields = (productData) => {
  const { error } = Joi.object({
    name: Joi.string().not().empty().min(6)
.required(),
    quantity: Joi.number().not().empty().min(1)
.required(),
  }).validate(productData);

  if (error) {
    const { details } = error;
    const [errorDetail] = details;
    return { error: { code: 'invalidData', message: errorDetail.message } };
  }
  return false;
};

const create = async (name, quantity) => {
  const isValid = validateFields({ name, quantity });
  if (isValid) return isValid;

  const productCreated = await productsModel.create(name, quantity);
  return productCreated;
};

module.exports = {
  create,
};
