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

  const { rows } = await db.execute('SELECT email, created_at, ip FROM waitlist ORDER BY id')

  const csv = 'email,created_at,ip\n' + rows.map(r => `${r.email},${r.created_at},${r.ip}`).join('\n')

  res.setHeader('Content-Type', 'text/csv')
  res.setHeader('Content-Disposition', 'attachment; filename=waitlist.csv')
  return res.send(csv)
}
