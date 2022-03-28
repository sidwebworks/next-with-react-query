import { NextApiRequest, NextApiResponse } from 'next';
import { fetchLogs } from '../../helpers/api';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const logs = await fetchLogs({ token: process.env.SECRET_TOKEN });
  res.status(200).json(logs);
}

export default handler;
