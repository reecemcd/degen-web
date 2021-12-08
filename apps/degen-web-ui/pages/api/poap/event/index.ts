import { NextApiRequest, NextApiResponse } from 'next';
import { getPoapService } from '../../../../src/core/api/poap.service';
import { PoapSettingsDTO } from '../../../../src/core/interfaces/poap-settings.dto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const poapService = await getPoapService(req);

  if (req.method == 'POST') {
    const settings: PoapSettingsDTO = req.body;
    const events = await poapService.getPoapEvents(settings);
    res.status(200).json({
      events,
    });
    return;
  }
}
