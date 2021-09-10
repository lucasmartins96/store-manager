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

const findByName = async (name) => {
  const db = await connection();
  const product = await db.collection(productsCollection).findOne({ name });

  if (!product) return null;

  return product;
};

module.exports = {
  create,
  findByName,
};
