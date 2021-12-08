import { NextApiRequest, NextApiResponse } from 'next';
import { getDegenService } from '../../../../../src/core/api/mongo/degen.service';
import {
  DegenService,
  PoapSettings,
} from '../../../../../src/core/interfaces/degen-service.interface';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const degenService: DegenService = await getDegenService(req);

  if (req.method == 'POST') {
    const settings: PoapSettings = req.body;
    const events = await degenService.getPoapEvents(settings);
    res.status(200).json({
      events,
    });
    return;
  }
}
