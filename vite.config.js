import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import fs from 'fs';

function brevoDevMiddleware(env) {
  return {
    name: 'brevo-dev-middleware',
    configureServer(server) {
      // 1. Waitlist endpoint
      server.middlewares.use('/api/waitlist', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
          return;
        }

        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });

        req.on('end', async () => {
          try {
            const { email } = JSON.parse(body || '{}');
            if (!email) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Email is required' }));
              return;
            }

            const apiKey = env.VITE_BREVO_API_KEY || env.BREVO_API_KEY;
            const listId = Number(env.VITE_BREVO_LIST_ID || env.BREVO_LIST_ID || 2);
            const senderEmail = env.VITE_BREVO_SENDER_EMAIL || env.BREVO_SENDER_EMAIL || 'ud440694@gmail.com';

            if (!apiKey) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: 'Brevo API key missing' }));
              return;
            }

            // 1. Add contact to Brevo list
            await fetch('https://api.brevo.com/v3/contacts', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'api-key': apiKey,
              },
              body: JSON.stringify({
                email,
                listIds: [listId],
                updateEnabled: true,
                attributes: {
                  SOURCE: 'Landing Page Waitlist',
                  SIGNUP_DATE: new Date().toISOString(),
                },
              }),
            });

            // 2. Send confirmation email using verified sender
            await fetch('https://api.brevo.com/v3/smtp/email', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
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
                      © 2026 TidBit Ecosystem · Zero Ad Trackers · Pure Focus
                    </p>
                  </div>
                `,
              }),
            });

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                success: true,
                message: "You're on the list! We've sent a confirmation email to " + email,
              })
            );
          } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          }
        });
      });

      // 2. Direct APK Download Endpoint (Streams APK with Content-Disposition: attachment so browser downloads automatically without redirect)
      server.middlewares.use('/api/download', (req, res) => {
        const releaseApk = path.resolve(__dirname, '../app/build/outputs/apk/release/app-release.apk');
        const debugApk = path.resolve(__dirname, '../app/build/outputs/apk/debug/app-debug.apk');
        const apkPath = fs.existsSync(releaseApk) ? releaseApk : (fs.existsSync(debugApk) ? debugApk : null);

        if (!apkPath) {
          res.statusCode = 404;
          res.end('APK file not found. Please build the app with ./gradlew assembleRelease.');
          return;
        }

        const stat = fs.statSync(apkPath);
        res.writeHead(200, {
          'Content-Type': 'application/vnd.android.package-archive',
          'Content-Disposition': 'attachment; filename="tidbit-v2.0.9.apk"',
          'Content-Length': stat.size,
        });

        fs.createReadStream(apkPath).pipe(res);
      });
    },
  };
}

function copyIndexTo404() {
  return {
    name: 'copy-index-to-404',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      const indexPath = path.resolve(distDir, 'index.html');
      const notFoundPath = path.resolve(distDir, '404.html');
      if (fs.existsSync(indexPath)) {
        fs.copyFileSync(indexPath, notFoundPath);
      }
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: process.env.VITE_BASE_PATH || './',
    plugins: [react(), tailwindcss(), brevoDevMiddleware(env), copyIndexTo404()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3000,
      open: false,
    },
    build: {
      outDir: 'dist',
    },
  };
});
