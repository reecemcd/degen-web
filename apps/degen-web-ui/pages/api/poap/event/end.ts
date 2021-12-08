import { NextApiRequest, NextApiResponse } from 'next';
import { getPoapService } from '../../../../src/core/api/poap.service';
import { PoapSettingsDTO } from '../../../../src/core/interfaces/poap-settings.dto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const poapService = await getPoapService(req);

  if (req.method == 'POST') {
    console.log('ending event');
    const settings: PoapSettingsDTO = req.body;
    const events = await poapService.endPoapEvent(settings);
    res.status(200).json({
      message: 'ending event',
    });
    return;
  }
}
