import { ServerGlobals } from './../../../server';
import { MongoDbCollections } from './db';
import { IncomingMessage } from 'http';
import {
  DegenService,
  PoapAdmin,
  PoapSettings,
} from '../../interfaces/degen-service.interface';
import { Db } from 'mongodb';

export class MongoDegenService implements DegenService {
  db: Db;
  collections: MongoDbCollections;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async init(req: any) {
    this.db = req.app.globals.db;
    this.collections = (req.app.globals as ServerGlobals).collections;
    return this;
  }

  async getPoapAdmins(guildId: string) {
    const admins = await this.collections.poapAdmins
      .find({ discordServerId: guildId })
      .toArray();

    return admins;
  }

  async addPoapAdmins(admin: PoapAdmin) {
    const result = await this.collections.poapAdmins.insertOne(admin);
    return result;
  }

  async removePoapAdmins(admin: PoapAdmin) {
    const result = await this.collections.poapAdmins.deleteMany(admin);
    return result;
  }

  async getPoapEvents(settings: PoapSettings) {
    console.log(settings);
    const result = await this.collections.poapSettings
      .find({
        discordServerId: settings.discordServerId,
        isActive: settings.isActive,
        voiceChannelId: settings.voiceChannelId,
      })
      .toArray();
    return result;
  }

  async startPoapEvent(settings: PoapSettings) {
    return;
  }

  async endPoapEvent(settings: PoapSettings) {
    return;
  }
}

export const getDegenService = async (req: IncomingMessage) => {
  return new MongoDegenService().init(req);
};
