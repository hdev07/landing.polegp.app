import type { VercelRequest, VercelResponse } from '@vercel/node'
import { ensureTable } from '../_db.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const key = req.headers['x-api-key']
  if (key !== (process.env.ADMIN_API_KEY || 'polegp-admin-2026')) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const db = await ensureTable()
  const { rows: countRows } = await db.execute('SELECT COUNT(*) as total FROM waitlist')
  const { rows: recent } = await db.execute('SELECT email, created_at FROM waitlist ORDER BY id DESC LIMIT 20')

  return res.json({ total: countRows[0].total, recent })
}
