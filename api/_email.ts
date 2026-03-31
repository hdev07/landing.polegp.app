import nodemailer from 'nodemailer'

export async function notifyNewSignup(email: string, total: number) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, NOTIFY_EMAIL } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !NOTIFY_EMAIL) return

  const port = parseInt(SMTP_PORT || '587')
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })

  await transporter.sendMail({
    from: `"PoleGP Waitlist" <${SMTP_USER}>`,
    to: NOTIFY_EMAIL,
    subject: `🏁 Nuevo registro #${total} — PoleGP Waitlist`,
    text: `Nuevo registro:\n\nEmail: ${email}\nTotal: ${total}\n\n— PoleGP`,
    html: `
      <div style="font-family:sans-serif;color:#333">
        <h2 style="color:#E10600">🏁 Nuevo registro en la waitlist</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Total registrados:</strong> ${total}</p>
        <hr style="border:none;border-top:1px solid #eee;margin:16px 0">
        <p style="color:#999;font-size:12px">PoleGP Waitlist</p>
      </div>
    `,
  }).catch(err => console.error('[email]', err))
}
