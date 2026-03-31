import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@libsql/client'
import nodemailer from 'nodemailer'

function getDb() {
  return createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  })
}

async function notifyNewSignup(email: string, total: number) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, NOTIFY_EMAIL } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !NOTIFY_EMAIL) return
  const port = parseInt(SMTP_PORT || '587')
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST, port, secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })
  await transporter.sendMail({
    from: `"PoleGP Waitlist" <${SMTP_USER}>`,
    to: NOTIFY_EMAIL,
    subject: `\u{1F3C1} Nuevo registro #${total} — PoleGP Waitlist`,
    text: `Nuevo registro:\n\nEmail: ${email}\nTotal: ${total}\n\n— PoleGP`,
  }).catch(err => console.error('[email]', err))
}

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
  const db = getDb()

  await db.execute(`
    CREATE TABLE IF NOT EXISTS waitlist (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      ip TEXT,
      user_agent TEXT
    )
  `)

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

  notifyNewSignup(sanitized, total).catch(() => {})

  return res.json({ success: true, position: total })
}
