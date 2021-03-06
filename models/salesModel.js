const { ObjectId } = require('mongodb');
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

const findById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const db = await connection();
  const salesData = db.collection(salesCollection).findOne(new ObjectId(id));

  if (!salesData) return null;

  return salesData;
};

const getAll = async () => {
  try {
    const db = await connection();
    const sales = await db.collection(salesCollection).find({}).toArray();
    return sales;
  } catch (error) {
    console.error(error);
  }
};

const update = async ({ id, itensSold }) => {
  const db = await connection();
  const userId = new ObjectId(id);
  try {
    const { value } = await db.collection(salesCollection)
      .findOneAndUpdate({ _id: userId }, { $set: { itensSold } }, { returnDocument: 'after' });

      return value;
  } catch (error) {
    console.error(error);
  }
};

const deleteById = async (id) => {
  const userId = new ObjectId(id);
  const db = await connection();
  const { value } = await db.collection(salesCollection).findOneAndDelete({ _id: userId });
  return value;
};

module.exports = {
  create,
  findById,
  getAll,
  update,
  deleteById,
};
