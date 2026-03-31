import express from 'express'
import cors from 'cors'
import Database from 'better-sqlite3'
import nodemailer from 'nodemailer'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3333

// --- DB ---
const db = new Database(join(__dirname, 'waitlist.db'))
db.pragma('journal_mode = WAL')
db.exec(`
  CREATE TABLE IF NOT EXISTS waitlist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    ip TEXT,
    user_agent TEXT
  )
`)

// --- Middleware ---
app.use(cors({ origin: true }))
app.use(express.json())

// --- Rate limit: simple in-memory per IP (10 req/min) ---
const hits = new Map<string, { count: number; resetAt: number }>()
function rateLimit(req: express.Request, res: express.Response, next: express.NextFunction) {
  const ip = req.ip || 'unknown'
  const now = Date.now()
  const entry = hits.get(ip)
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + 60_000 })
    return next()
  }
  if (entry.count >= 10) {
    return res.status(429).json({ error: 'Too many requests' })
  }
  entry.count++
  return next()
}

// --- Email config (from env vars) ---
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || ''
const SMTP_HOST = process.env.SMTP_HOST || ''
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587')
const SMTP_USER = process.env.SMTP_USER || ''
const SMTP_PASS = process.env.SMTP_PASS || ''

let transporter: nodemailer.Transporter | null = null
if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })
}

async function notifyNewSignup(email: string, totalCount: number) {
  if (!transporter || !NOTIFY_EMAIL) return
  try {
    await transporter.sendMail({
      from: `"PoleGP Waitlist" <${SMTP_USER}>`,
      to: NOTIFY_EMAIL,
      subject: `🏁 Nuevo registro #${totalCount} — PoleGP Waitlist`,
      text: `Nuevo registro en la waitlist:\n\nEmail: ${email}\nTotal registrados: ${totalCount}\n\n— PoleGP`,
      html: `
        <div style="font-family:sans-serif;color:#333">
          <h2 style="color:#E10600">🏁 Nuevo registro en la waitlist</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Total registrados:</strong> ${totalCount}</p>
          <hr style="border:none;border-top:1px solid #eee;margin:16px 0">
          <p style="color:#999;font-size:12px">PoleGP Waitlist Server</p>
        </div>
      `,
    })
  } catch (err) {
    console.error('[email] Failed to send notification:', err)
  }
}

// --- Routes ---

// POST /api/waitlist — register email
const insertStmt = db.prepare('INSERT OR IGNORE INTO waitlist (email, ip, user_agent) VALUES (?, ?, ?)')
const countStmt = db.prepare('SELECT COUNT(*) as total FROM waitlist')
const existsStmt = db.prepare('SELECT 1 FROM waitlist WHERE email = ?')

app.post('/api/waitlist', rateLimit, async (req, res) => {
  const { email } = req.body
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email required' })
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email) || email.length > 320) {
    return res.status(400).json({ error: 'Invalid email' })
  }

  const sanitizedEmail = email.trim().toLowerCase()

  // Check if already registered
  if (existsStmt.get(sanitizedEmail)) {
    const { total } = countStmt.get() as { total: number }
    return res.json({ success: true, alreadyRegistered: true, position: total })
  }

  insertStmt.run(sanitizedEmail, req.ip, req.headers['user-agent'] || '')
  const { total } = countStmt.get() as { total: number }

  // Fire-and-forget email notification
  notifyNewSignup(sanitizedEmail, total)

  return res.json({ success: true, position: total })
})

// GET /api/waitlist/stats — simple stats (protected by API key)
const API_KEY = process.env.ADMIN_API_KEY || 'polegp-admin-2026'

app.get('/api/waitlist/stats', (req, res) => {
  const key = req.headers['x-api-key']
  if (key !== API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { total } = countStmt.get() as { total: number }
  const recent = db.prepare('SELECT email, created_at FROM waitlist ORDER BY id DESC LIMIT 20').all()
  return res.json({ total, recent })
})

// GET /api/waitlist/export — download as CSV (protected)
app.get('/api/waitlist/export', (req, res) => {
  const key = req.headers['x-api-key']
  if (key !== API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const rows = db.prepare('SELECT email, created_at, ip FROM waitlist ORDER BY id').all() as Array<{ email: string; created_at: string; ip: string }>
  const csv = 'email,created_at,ip\n' + rows.map(r => `${r.email},${r.created_at},${r.ip}`).join('\n')

  res.setHeader('Content-Type', 'text/csv')
  res.setHeader('Content-Disposition', 'attachment; filename=waitlist.csv')
  return res.send(csv)
})

// --- Start ---
app.listen(PORT, () => {
  const { total } = countStmt.get() as { total: number }
  console.log(`\n  🏁 PoleGP Waitlist API`)
  console.log(`  → http://localhost:${PORT}/api/waitlist`)
  console.log(`  → ${total} emails registered`)
  console.log(`  → Email notifications: ${transporter ? 'ON' : 'OFF (set SMTP_* env vars)'}`)
  console.log()
})
