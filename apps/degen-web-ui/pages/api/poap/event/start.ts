import { NextApiRequest, NextApiResponse } from 'next';
import { getPoapService } from '../../../../src/core/api/poap.service';
import { PoapSettingsDTO } from '../../../../src/core/interfaces/poap-settings.dto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const poapService = await getPoapService(req);

  if (req.method == 'POST') {
    console.log('starting event');
    const settings: PoapSettingsDTO = req.body;

    try {
      const event = await poapService.startPoapEvent(settings);
      res.status(200).json({
        message: 'starting event',
        event,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }

    return;
  }
}
