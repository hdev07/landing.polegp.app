import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@libsql/client'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const key = req.headers['x-api-key']
  if (key !== (process.env.ADMIN_API_KEY || 'polegp-admin-2026')) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const db = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  })

  const { rows: countRows } = await db.execute('SELECT COUNT(*) as total FROM waitlist')
  const { rows: recent } = await db.execute('SELECT email, created_at FROM waitlist ORDER BY id DESC LIMIT 20')

  return res.json({ total: countRows[0].total, recent })
}
