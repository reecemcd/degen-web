import { IncomingMessage } from 'http';
import { IDegenService, IPoapAdmin } from '../interfaces/degen-service.interface';
import * as mongoDB from 'mongodb';
import { connectToDatabase } from './mongo/db';

// Mongo Implementation of Degen Service
export class DegenService implements IDegenService {
  db: mongoDB.Db;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async init(req: any) {
    // TODO : make accessible from server globals
    this.db = await connectToDatabase();
    return this;
  }

  async getPoapAdmins(guildId: string) {
    console.log(guildId);
    const admins = await this.db
      .collection('poapAdmins')
      .find({ discordServerId: guildId })
      .toArray();

    return admins;
  }

  addPoapAdmins(admin: IPoapAdmin) {
    return;
  }

  removePoapAdmins(admin: IPoapAdmin) {
    return;
  }
}

export const getDegenService = async (req: IncomingMessage) => {
  return new DegenService().init(req);
};
