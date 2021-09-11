const Joi = require('joi');
const salesModel = require('../models/salesModel');

const validateDocuments = (documents) => {
  // Será validado que não é possível cadastrar vendas com quantidade menor que zero
  // Será validado que não é possível cadastrar vendas com quantidade igual a zero
  // Será validado que não é possível cadastrar vendas com uma string no campo quantidade 
  const { error } = Joi.array().items(
    Joi.object({
      productId: Joi.string().length(24).required(),
      quantity: Joi.number().strict().integer().not()
      .empty()
      .min(1)
      .required(),
    }),
  ).validate(documents);

  if (error) {
    return false;
  }
  return true;
};

const create = async (itensSold) => {
  const areDocumentsValid = validateDocuments(itensSold);
  if (!areDocumentsValid) {
    return { 
      error: { code: 'INVALID_DATA', message: 'Wrong product ID or invalid quantity' }, 
    };
  }

  const insertedSales = await salesModel.create(itensSold);

  return insertedSales;
};

module.exports = {
  create,
};
