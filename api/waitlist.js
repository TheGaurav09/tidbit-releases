// Serverless Function for Vercel / Netlify / Node.js
// Handles /api/waitlist securely on the server-side without exposing API keys to the browser.

export default async function handler(req, res) {
  // Only accept POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const email = (body?.email || '').trim().toLowerCase();

    // 1. Strict Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email) || email.length > 254) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    // 2. Read server-side credentials
    const apiKey = process.env.BREVO_API_KEY || process.env.VITE_BREVO_API_KEY;
    const listId = Number(process.env.BREVO_LIST_ID || process.env.VITE_BREVO_LIST_ID || 2);
    const senderEmail = process.env.BREVO_SENDER_EMAIL || process.env.VITE_BREVO_SENDER_EMAIL || 'ud440694@gmail.com';

    if (!apiKey) {
      console.error('Server Configuration Error: BREVO_API_KEY is not defined.');
      return res.status(500).json({ error: 'Email service configuration error.' });
    }

    // 3. Add Contact to Brevo List
    const contactRes = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        email,
        listIds: [listId],
        updateEnabled: true,
        attributes: {
          SOURCE: 'TidBit Landing Page Waitlist',
          SIGNUP_DATE: new Date().toISOString(),
        },
      }),
    });

    if (!contactRes.ok && contactRes.status !== 204 && contactRes.status !== 400) {
      const errData = await contactRes.json().catch(() => ({}));
      console.warn('Brevo contact warning:', errData);
    }

    // 4. Send Confirmation Email via Verified Sender
    const emailRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        sender: {
          name: 'TidBit Team',
          email: senderEmail,
        },
        to: [{ email }],
        subject: 'Welcome to the TidBit Beta Waitlist 📚',
        htmlContent: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 540px; margin: 0 auto; padding: 32px 20px; color: #101317; line-height: 1.6;">
            <div style="font-size: 26px; font-weight: 800; color: #101317; margin-bottom: 20px;">
              TidB<span style="color: #2457D6;">i</span>t
            </div>
            <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 12px; color: #101317;">
              You're on the list for TidBit v2.0!
            </h2>
            <p style="color: #475569; font-size: 15px; margin-bottom: 20px;">
              Thank you for joining our exclusive early-access cohort. TidBit is built to replace dopamine-heavy algorithmic feeds with high-yield micro-lessons, Bud AI study checks, and digital books.
            </p>
            <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 18px; margin-bottom: 24px;">
              <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #2457D6; letter-spacing: 0.05em;">Your Access Status</div>
              <div style="font-size: 16px; font-weight: 700; color: #0F172A; margin-top: 4px;">Google Play Beta Cohort #1</div>
              <p style="font-size: 13px; color: #64748B; margin: 6px 0 0 0;">We roll out access in batches. You'll receive your direct Play Store invite link shortly.</p>
            </div>
            <p style="font-size: 13px; color: #94A3B8; margin-top: 32px; border-top: 1px solid #E2E8F0; padding-top: 16px;">
              © 2026 Tidbit · Pure Focus
            </p>
          </div>
        `,
      }),
    });

    if (!emailRes.ok) {
      const emailErr = await emailRes.json().catch(() => ({}));
      console.error('Brevo SMTP error:', emailErr);
    }

    return res.status(200).json({
      success: true,
      message: `You're on the list! We've sent a confirmation email to ${email}`,
    });
  } catch (error) {
    console.error('Waitlist API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

