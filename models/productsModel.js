const { ObjectId } = require('mongodb');
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

const findById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const db = await connection();
  const productData = db.collection(productsCollection).findOne(new ObjectId(id));

  if (!productData) return null;

  return productData;
};

const getAll = async () => {
  try {
    const db = await connection();
    const products = await db.collection(productsCollection).find({});
    return products;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  create,
  findByName,
  findById,
  getAll,
};
