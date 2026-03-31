import type { VercelRequest, VercelResponse } from '@vercel/node'
import { ensureTable } from '../_db.js'
import { notifyNewSignup } from '../_email.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body || {}
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email required' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email) || email.length > 320) {
    return res.status(400).json({ error: 'Invalid email' })
  }

  const sanitized = email.trim().toLowerCase()
  const db = await ensureTable()

  // Check if already registered
  const existing = await db.execute({
    sql: 'SELECT 1 FROM waitlist WHERE email = ?',
    args: [sanitized],
  })

  if (existing.rows.length > 0) {
    const { rows } = await db.execute('SELECT COUNT(*) as total FROM waitlist')
    return res.json({ success: true, alreadyRegistered: true, position: rows[0].total })
  }

  await db.execute({
    sql: 'INSERT INTO waitlist (email, ip, user_agent) VALUES (?, ?, ?)',
    args: [sanitized, (req.headers['x-forwarded-for'] as string) || '', req.headers['user-agent'] || ''],
  })

  const { rows } = await db.execute('SELECT COUNT(*) as total FROM waitlist')
  const total = rows[0].total as number

  // Fire-and-forget email
  notifyNewSignup(sanitized, total).catch(() => {})

  return res.json({ success: true, position: total })
}
