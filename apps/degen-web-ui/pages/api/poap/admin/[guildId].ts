import { NextApiRequest, NextApiResponse } from 'next';
import { getPoapService } from '../../../../src/core/api/paop.service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const poapService = await getPoapService(req);

  if (req.method === 'GET') {
    const guildId = req.query.guildId as string;
    const poapAdmins = await poapService.getPoapAdmins(guildId);
    res.status(200).json({
      poapAdmins,
    });
  }
}
