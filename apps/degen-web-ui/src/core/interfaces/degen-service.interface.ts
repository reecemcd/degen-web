export interface IDegenService {
  getPoapAdmins(guildId: string);
  addPoapAdmins(admin: IPoapAdmin);
  removePoapAdmins(admin: IPoapAdmin);
}

export interface IPoapAdmin {
  objectType: string;
  discordObjectId: string;
  discordObjectName: string;
  discordServerId: string;
  discordServerName: string;
}
