// Production Serverless Handler for /api/download
// Redirects to the configured production APK host (GitHub Releases, Cloudflare R2, Firebase Storage)
// with Content-Disposition headers for direct background downloading.

export default function handler(req, res) {
  const downloadUrl =
    process.env.APK_DOWNLOAD_URL ||
    process.env.VITE_APK_DOWNLOAD_URL ||
    'https://github.com/TheGaurav09/tidbit-releases/releases/latest/download/tidbit-app-release.apk';

  // Instruct browser to download directly as an attachment without page navigation
  res.setHeader('Content-Disposition', 'attachment; filename="tidbit-v2.0.7.apk"');
  res.setHeader('Content-Type', 'application/vnd.android.package-archive');
  return res.redirect(302, downloadUrl);
}

