export interface PoapSettingsDTO {
  _id: string;
  event: string;
  isActive: boolean;
  startTime: string;
  endTime: string;
  discordUserId: string;
  voiceChannelId: string;
  voiceChannelName: string;
  discordServerId: string;
}
