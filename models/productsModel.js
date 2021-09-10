const connection = require('./connection');

const productsCollection = 'products';

const create = async (name, quantity) => {
  const db = await connection();
  const result = await db.collection(productsCollection).insertOne({ name, quantity });

  return {
    _id: result.insertedId,
    name,
    quantity,
  };
};

module.exports = {
  create,
};
