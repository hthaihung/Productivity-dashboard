import { MailerSend, EmailParams, Sender, Recipient } from "mailersend"

const mailerSend = process.env.MAILERSEND_API_KEY ? new MailerSend({ apiKey: process.env.MAILERSEND_API_KEY }) : null

interface SendPasswordResetEmailParams {
  to: string
  resetUrl: string
}

export async function sendPasswordResetEmail({ to, resetUrl }: SendPasswordResetEmailParams) {
  if (!mailerSend) {
    console.warn("Email service not configured. Password reset email not sent.")
    return { success: false, error: "Email service not configured" }
  }

  const fromEmail = process.env.EMAIL_FROM || "noreply@yourdomain.com"

  try {
    const sentFrom = new Sender(fromEmail, "Dashboard")
    const recipients = [new Recipient(to)]

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject("Reset your password")
      .setHtml(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px;">Reset Your Password</h1>
            </div>
            <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px;">
              <p style="margin: 0 0 20px 0; font-size: 16px;">You requested to reset your password. Click the button below to create a new password:</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" style="display: inline-block; background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">Reset Password</a>
              </div>
              <p style="margin: 20px 0 0 0; font-size: 14px; color: #6b7280;">If you didn't request this, you can safely ignore this email. This link will expire in 1 hour.</p>
              <p style="margin: 20px 0 0 0; font-size: 14px; color: #6b7280;">If the button doesn't work, copy and paste this link into your browser:</p>
              <p style="margin: 10px 0 0 0; font-size: 14px; color: #06b6d4; word-break: break-all;">${resetUrl}</p>
            </div>
          </body>
        </html>
      `)

    await mailerSend.email.send(emailParams)

    return { success: true }
  } catch (error) {
    console.error("Failed to send password reset email:", error)
    return { success: false, error: "Failed to send email" }
  }
}
