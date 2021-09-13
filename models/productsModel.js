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
    const products = await db.collection(productsCollection).find({}).toArray();
    return products;
  } catch (error) {
    console.error(error);
  }
};

const update = async ({ id, name, quantity }) => {
  const db = await connection();
  const userId = new ObjectId(id);
  const newData = { name, quantity };
  try {
    await db.collection(productsCollection).updateOne({ _id: userId }, { $set: newData });
    return {
      _id: userId,
      name,
      quantity,
    };
  } catch (error) {
    console.error(error);
  }
};

const deleteById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const userId = new ObjectId(id);

  const db = await connection();
  const productData = await db.collection(productsCollection).findOneAndDelete({ _id: userId });

  if (!productData) return null;

  const { value } = productData;
  return value;
};

const buildFilterByOperation = (operation, productId, quantity) => {
  switch (operation) {
    case 'decrease':
      return { $and: [{ _id: ObjectId(productId) }, { $expr: { $lt: [quantity, '$quantity'] } }] };
    default:
      return { $and: [{ _id: ObjectId(productId) }] };
  }
};

const updateQuantity = async (operation, itensSold) => {
  if (operation !== 'decrease' && operation !== 'increase') {
    return null;
  }

  const db = await connection();

  const updateQuantityPromises = itensSold.map(({ productId, quantity }) => {
    const incQuantity = (operation === 'decrease') ? { quantity: -quantity } : { quantity };

    return db.collection(productsCollection).findOneAndUpdate(
      buildFilterByOperation(operation, productId, quantity),
      { $inc: incQuantity },
      { returnDocument: 'after' },
    );
  });

  const promiseResults = await Promise.all(updateQuantityPromises);
  return promiseResults.every(({ value }) => value);
};

module.exports = {
  create,
  findByName,
  findById,
  getAll,
  update,
  deleteById,
  updateQuantity,
};
