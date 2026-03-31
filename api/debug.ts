import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { createClient } = await import('@libsql/client')
    const url = process.env.TURSO_DATABASE_URL
    const token = process.env.TURSO_AUTH_TOKEN

    if (!url) {
      return res.json({ error: 'TURSO_DATABASE_URL not set', envKeys: Object.keys(process.env).filter(k => k.startsWith('TURSO') || k.startsWith('SMTP') || k.startsWith('ADMIN')) })
    }

    const db = createClient({ url, authToken: token })
    await db.execute(`
      CREATE TABLE IF NOT EXISTS waitlist (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        created_at TEXT DEFAULT (datetime('now')),
        ip TEXT,
        user_agent TEXT
      )
    `)
    const { rows } = await db.execute('SELECT COUNT(*) as total FROM waitlist')
    return res.json({ ok: true, total: rows[0].total, url: url.substring(0, 30) + '...' })
  } catch (err: any) {
    return res.status(500).json({ error: err.message, stack: err.stack?.split('\n').slice(0, 5) })
  }
}
