import { NextApiRequest, NextApiResponse } from 'next';
import { getDiscordService } from '../../../../src/core/api/discord.service';
import { getPoapService } from '../../../../src/core/api/poap.service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const poapService = await getPoapService(req);
  const discordService = await getDiscordService(req);

  const { eventName, duration, discordServerId, voiceChannelId } = req.body;
  try {
    const event = await poapService.startPoapEvent(
      eventName,
      duration,
      discordServerId,
      voiceChannelId
    );

    const members = await discordService.getMembersInChannel(
      discordServerId,
      voiceChannelId
    );

    await poapService.removePoapParticipants(discordServerId, voiceChannelId);

    members.forEach((member) => {
      poapService.insertPoapParticipant(member, eventName);
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
