import { ServerGlobals } from '../../server';
import { MongoDbCollections } from './mongo/db';
import { IncomingMessage } from 'http';
import { PoapAdminDTO } from '../interfaces/poap-admin.dto';
import { Db, ObjectId } from 'mongodb';
import { Client as DiscordClient } from 'discord.js';
import { PoapSettingsDTO } from '../interfaces/poap-settings.dto';
import { PoapParticipantDTO } from '../interfaces/poap-participant';
import { DiscordService, getDiscordService } from './discord.service';

export class PoapService {
  private db: Db;
  private collections: MongoDbCollections;
  private client: DiscordClient;
  private discordService: DiscordService;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async init(req: any) {
    this.client = (req.app.globals as ServerGlobals).discordClient;
    this.db = req.app.globals.db;
    this.collections = (req.app.globals as ServerGlobals).collections;
    this.discordService = await getDiscordService(req);
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

  async getPoapEvents(guildId: string) {
    const result = await this.collections.poapSettings
      .find({
        discordServerId: guildId,
      })
      .toArray();

    // Return events with active members in channel
    return Promise.all(
      result.map(async (event) => {
        return {
          _id: event._id,
          event: event.event,
          isActive: event.isActive,
          startTime: event.startTime,
          endTime: event.endTime,
          discordUserId: event.discordUserId,
          voiceChannelId: event.voiceChannelId,
          voiceChannelName: event.voiceChannelName,
          members: await this.discordService.getMembersInChannel(
            event.discordServerId,
            event.voiceChannelId
          ),
        };
      })
    );
  }

  async startPoapEvent(settings: PoapSettingsDTO) {
    const guild = await this.client.guilds.fetch(settings.discordServerId);
    const voiceChannel = await guild.channels
      .fetch(settings.voiceChannelId)
      .catch(() => {
        throw new Error(`No voice channel found with id ${settings.voiceChannelId}`);
      });

    const activeEvent = await this.collections.poapSettings.findOne({
      discordServerId: settings.discordServerId,
      voiceChannelId: settings.voiceChannelId,
      isActive: true,
    });

    if (activeEvent !== null) {
      throw new Error(
        `Active event for server ${settings.discordServerId} in voice channel ${settings.voiceChannelId}`
      );
    }

    const result = await this.collections.poapSettings.findOneAndUpdate(
      {
        discordServerId: settings.discordServerId,
        voiceChannelId: settings.voiceChannelId,
      },
      {
        $set: {
          event: settings.event,
          isActive: true,
          startTime: new Date().toISOString(),
          endTime: settings.endTime,
          discordUserId: settings.discordUserId,
          voiceChannelId: settings.voiceChannelId,
          voiceChannelName: voiceChannel.name,
          discordServerId: settings.discordServerId,
        },
      },
      {
        upsert: true,
      }
    );
    return result.value as unknown as PoapSettingsDTO;
  }

  async endPoapEvent(guildId: string, voiceChannelId: string) {
    const result = await this.collections.poapSettings.findOneAndUpdate(
      {
        discordServerId: guildId,
        voiceChannelId: voiceChannelId,
        isActive: true,
      },
      {
        $set: {
          isActive: false,
          endTime: new Date().toISOString(),
        },
      }
    );

    if (result.value == null) {
      throw new Error(
        `No active event found for server ${guildId} in voice channel ${voiceChannelId}`
      );
    }
    return result.value as unknown as PoapSettingsDTO;
  }

  async insertPoapParticipant(participant: PoapParticipantDTO, event: string) {
    const result = await this.collections.poapParticipants.insertOne({
      event: event,
      discordUserId: participant.discordUserId,
      discordUserTag: participant.discordUserId,
      startTime: participant.startTime,
      endTime: null,
      voiceChannelId: participant.voiceChannelId,
      discordServerId: participant.discordServerId,
      durationInMinutes: 0,
    });

    return result;
  }
}

export const getPoapService = async (req: IncomingMessage) => {
  return new PoapService().init(req);
};
