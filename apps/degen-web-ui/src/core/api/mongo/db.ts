import * as mongoDB from 'mongodb';

export const collections: { poapAdmins?: mongoDB.Collection } = {};

export async function connectToDatabase(): Promise<mongoDB.Db> {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.MONGODB_URI);

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.MONGODB_DB);

  const poapAdminCollection: mongoDB.Collection = db.collection(
    process.env.POAP_ADMIN_COLLECTION_NAME
  );

  collections.poapAdmins = poapAdminCollection;

  return db;
}
