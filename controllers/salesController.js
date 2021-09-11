const salesService = require('../services/salesService');

const OK_STATUS_CODE = 200;

const create = async (req, res, next) => {
  const itensSold = req.body;

  const insertedSales = await salesService.create(itensSold);

  if (insertedSales.error) return next(insertedSales.error);

  res.status(OK_STATUS_CODE).json(insertedSales);
};

const findById = async (req, res, next) => {
  const { id } = req.params;

  const salesData = await salesService.findById(id);

  if (salesData.error) return next(salesData.error);

  res.status(OK_STATUS_CODE).json(salesData);
};

const getAll = async (req, res) => {
  const sales = await salesService.getAll();

  res.status(OK_STATUS_CODE).json({ sales });
};

module.exports = {
  create,
  findById,
  getAll,
};
