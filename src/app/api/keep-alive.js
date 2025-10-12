import { redis } from '../../lib/upstash';

export default async function handler(req, res) {
  const secret = process.env.KEEPALIVE_SECRET;

  if (!secret || req.query.secret !== secret) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const result = await redis.ping();
    return res.status(200).json({ status: 'ok', redis_response: result });
  } catch (error) {
    console.error('Keep-alive ping failed:', error);
    return res.status(500).json({ error: 'Failed to ping database' });
  }
}
