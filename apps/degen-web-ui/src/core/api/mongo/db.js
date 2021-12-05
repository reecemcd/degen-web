const mongoDB = require('mongodb');

module.exports = async function connectToDatabase() {
  console.log('Initializing db connection');
  const client = new mongoDB.MongoClient(process.env.MONGODB_URI);

  await client.connect();

  const db = client.db(process.env.MONGODB_DB);

  return db;
};
