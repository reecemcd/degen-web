import { NextApiRequest, NextApiResponse } from 'next';
import { getDegenService } from '../../../../../src/core/api/mongo/degen.service';
import { PoapSettings } from '../../../../../src/core/interfaces/degen-service.interface';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const degenService = await getDegenService(req);

  if (req.method == 'POST') {
    console.log('pulling settings');
    const settings: PoapSettings = req.body;
    const events = await degenService.endPoapEvent(settings);
    res.status(200).json({
      message: 'ending event',
    });
    return;
  }
}
