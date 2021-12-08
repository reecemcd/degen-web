import { ServerGlobals } from '../../server';
import { MongoDbCollections } from './mongo/db';
import { IncomingMessage } from 'http';
import { PoapAdminDTO } from '../interfaces/poap-admin.dto';
import { Db, ObjectId } from 'mongodb';
import { Client as DiscordClient } from 'discord.js';
import { PoapSettingsDTO } from '../interfaces/poap-settings.dto';

export class PoapService {
  private db: Db;
  private collections: MongoDbCollections;
  private client: DiscordClient;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async init(req: any) {
    this.client = (req.app.globals as ServerGlobals).discordClient;
    this.db = req.app.globals.db;
    this.collections = (req.app.globals as ServerGlobals).collections;
    return this;
  }

  async isPoapAdmin(guildId: string, userId: string) {
    const admins = await this.collections.poapAdmins
      .find({ discordServerId: guildId, discordObjectId: userId })
      .toArray();
    return admins?.length > 0;
  }

  async getPoapAdmins(guildId: string) {
    const admins = await this.collections.poapAdmins
      .find({ discordServerId: guildId })
      .toArray();
    return admins as unknown as PoapAdminDTO[];
  }

  async addPoapAdmin(guildId: string, userId: string) {
    const guild = await this.client.guilds.fetch(guildId);
    const guildMember = await guild.members.fetch(userId);
    const poapAdmin = await this.collections.poapAdmins.insertOne({
      objectType: '???',
      discordObjectId: userId,
      discordObjectName: guildMember.displayName,
      discordServerId: guildId,
      discordServerName: guild.name,
    });
    return poapAdmin as unknown as PoapAdminDTO;
  }

  async removePoapAdmin(_id: string) {
    const result = await this.collections.poapAdmins.deleteOne({
      _id: new ObjectId(_id),
    });
    return result;
  }

  async getPoapEvents(settings: PoapSettingsDTO) {
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

  async startPoapEvent(settings: PoapSettingsDTO) {
    return;
  }

  async endPoapEvent(settings: PoapSettingsDTO) {
    return;
  }
}

export const getPoapService = async (req: IncomingMessage) => {
  return new PoapService().init(req);
};
