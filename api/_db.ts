import { createClient, type Client } from '@libsql/client'

let _db: Client | null = null
let _tableReady = false

export function getDb(): Client {
  if (!_db) {
    _db = createClient({
      url: process.env.TURSO_DATABASE_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN,
    })
  }
  return _db
}

export async function ensureTable(): Promise<Client> {
  const db = getDb()
  if (!_tableReady) {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS waitlist (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        created_at TEXT DEFAULT (datetime('now')),
        ip TEXT,
        user_agent TEXT
      )
    `)
    _tableReady = true
  }
  return db
}
