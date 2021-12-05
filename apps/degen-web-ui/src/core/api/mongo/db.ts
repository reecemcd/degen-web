import * as mongoDB from 'mongodb';

export async function connectToDatabase(): Promise<mongoDB.Db> {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.MONGODB_URI);

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.MONGODB_DB);

  return db;
}
