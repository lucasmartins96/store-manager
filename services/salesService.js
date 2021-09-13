const Joi = require('joi');
const { ObjectId } = require('mongodb');
const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

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
  await productsModel.updateQuantity('decrease', itensSold);

  return insertedSales;
};

const findById = async (id) => {
  const salesData = await salesModel.findById(id);

  if (!salesData) return { error: { code: 'NOT_FOUND', message: 'Sale not found' } };

  return salesData;
};

const getAll = async () => salesModel.getAll();

const update = async (saleToUpdate) => {
  const { itensSold } = saleToUpdate;
  const areDocumentsValid = validateDocuments(itensSold);
  if (!areDocumentsValid) {
    return { 
      error: { code: 'INVALID_DATA', message: 'Wrong product ID or invalid quantity' }, 
    };
  }

  const saleUpdated = salesModel.update(saleToUpdate);
  return saleUpdated;
};

const deleteById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return { error: { code: 'INVALID_DATA', message: 'Wrong sale ID format' } };
  }

  const saleDeletedData = await salesModel.deleteById(id);

  if (!saleDeletedData) return { error: { code: 'NOT_FOUND', message: 'Sale not found' } };

  await productsModel.updateQuantity('increase', saleDeletedData.itensSold);

  return saleDeletedData;
};

module.exports = {
  create,
  findById,
  getAll,
  update,
  deleteById,
};
