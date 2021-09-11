const connection = require('./connection');

const salesCollection = 'sales';

const create = async (itensSold) => {
  const db = await connection();
  const { insertedId } = await db.collection(salesCollection).insertOne({ itensSold });

  return {
    _id: insertedId,
    itensSold,
  };
};

module.exports = {
  create,
};
