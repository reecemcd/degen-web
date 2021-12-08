export interface DegenService {
  getPoapAdmins(guildId: string | string[]);
  addPoapAdmins(admin: PoapAdmin);
  removePoapAdmins(admin: PoapAdmin);

  getPoapEvents(settings: PoapSettings);
  startPoapEvent(settings: PoapSettings);
  endPoapEvent(settings: PoapSettings);
}

export interface PoapAdmin {
  objectType: string;
  discordObjectId: string;
  discordObjectName: string;
  discordServerId: string;
  discordServerName: string;
}

export interface PoapSettings {
  event: string;
  isActive: boolean;
  startTime: string;
  endTime: string;
  discordUserId: string;
  voiceChannelId: string;
  voiceChannelName: string;
  discordServerId: string;
}
