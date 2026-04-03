import { Resend } from 'resend'

export async function POST(request) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!email || !subject || !message) {
      return Response.json(
        { error: 'Les champs email, objet et message sont obligatoires.' },
        { status: 400 }
      )
    }

    await resend.emails.send({
      from: 'AuresPédia <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL || 'info@aurespedia.dz'],
      replyTo: email,
      subject: `[AuresPédia] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #14D095;">Nouveau message depuis AuresPédia</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #31102C; width: 120px;">Nom :</td>
              <td style="padding: 8px;">${name || 'Non renseigné'}</td>
            </tr>
            <tr style="background: #f4f4f4;">
              <td style="padding: 8px; font-weight: bold; color: #31102C;">Email :</td>
              <td style="padding: 8px;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #31102C;">Objet :</td>
              <td style="padding: 8px;">${subject}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 16px; background: #f4f4f4; border-radius: 8px;">
            <p style="font-weight: bold; color: #31102C; margin: 0 0 8px;">Message :</p>
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 20px; color: #888; font-size: 12px;">
            Ce message a été envoyé depuis le formulaire de contact d'AuresPédia.
          </p>
        </div>
      `,
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return Response.json(
      { error: 'Une erreur est survenue. Veuillez réessayer.' },
      { status: 500 }
    )
  }
}
