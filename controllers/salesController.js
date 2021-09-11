const salesService = require('../services/salesService');

const create = async (req, res, next) => {
  const itensSold = req.body;

  const insertedSales = await salesService.create(itensSold);

  if (insertedSales.error) return next(insertedSales.error);

  res.status(200).json(insertedSales);
};

module.exports = {
  create,
};
