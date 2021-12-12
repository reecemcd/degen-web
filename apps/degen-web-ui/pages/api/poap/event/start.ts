import { NextApiRequest, NextApiResponse } from 'next';
import { getDiscordService } from '../../../../src/core/api/discord.service';
import { getPoapService } from '../../../../src/core/api/poap.service';
import { PoapSettingsDTO } from '../../../../src/core/interfaces/poap-settings.dto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const poapService = await getPoapService(req);
  const discordService = await getDiscordService(req);

  const settings: PoapSettingsDTO = req.body;
  try {
    const event = await poapService.startPoapEvent(settings);

    const members = await discordService.getMembersInChannel(
      settings.discordServerId,
      settings.voiceChannelId
    );

    members.forEach((member) => {
      poapService.insertPoapParticipant(member, settings.event);
    });

    res.status(200).json({
      message: 'starting event',
      event,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}
