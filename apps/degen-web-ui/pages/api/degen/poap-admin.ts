import { NextApiRequest, NextApiResponse } from 'next';
import { getDegenService } from '../../../src/core/api/degen.service';
import { IPoapAdmin } from '../../../src/core/interfaces/degen-service.interface';

// eslint-disable-next-line import/no-anonymous-default-export
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const degenService = await getDegenService(req);

  if (req.method == 'POST') {
    const admin: IPoapAdmin = req.body;
    const admins = degenService.addPoapAdmins(admin);
    res.status(200).json({
      admins,
    });
    return;
  }

  if (req.method == 'DELETE') {
    const admin: IPoapAdmin = req.body;
    const admins = degenService.removePoapAdmins(admin);
    res.status(200).json({
      admins,
    });
    return;
  }
}
