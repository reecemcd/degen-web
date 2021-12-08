import { NextApiRequest, NextApiResponse } from 'next';
import { getPoapService } from '../../../../src/core/api/poap.service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const poapService = await getPoapService(req);

  if (req.method == 'POST') {
    const { discordServerId } = req.body;
    const events = await poapService.getPoapEvents(discordServerId);
    res.status(200).json({
      events,
    });
    return;
  }
}
