const Joi = require('joi');
const salesModel = require('../models/salesModel');

const validateDocuments = (documents) => { 
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

const findById = async (id) => {
  const salesData = await salesModel.findById(id);

  if (!salesData) return { error: { code: 'NOT_FOUND', message: 'Sale not found' } };

  return salesData;
};

const getAll = async () => salesModel.getAll();

module.exports = {
  create,
  findById,
  getAll,
};
