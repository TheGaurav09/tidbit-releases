/**
 * TidBit Global Application & Release Configuration
 */

export const APP_CONFIG = {
  name: "TidBit",
  tagline: "The Antidote to Brainrot | Distraction-Free Micro-Learning",
  version: "v2.0.7",
  apkSize: "10 MB",
  minAndroidVersion: "Android 8.0 (API level 26)+",
  supportedArchitectures: "ARM64-v8a, armeabi-v7a, x86_64",
  
  // Public Release Repository on GitHub (Source code remains private in EduGram)
  githubOwner: "TheGaurav09",
  githubRepo: "tidbit-releases",
  githubRepoUrl: "https://github.com/TheGaurav09/tidbit-releases",
  
  // Direct latest APK download link from the public releases repository
  apkDownloadUrl:
    import.meta.env.VITE_APK_DOWNLOAD_URL ||
    "https://github.com/TheGaurav09/tidbit-releases/releases/latest/download/tidbit-app-release.apk",
    
  // Public Releases page
  releasesPageUrl: "https://github.com/TheGaurav09/tidbit-releases/releases",
  
  // Security Verification
  sha256VerificationText: "SHA-256 Checksum Verified",
  sha256Hash: "db2908474c07986884a26a1eec61d1de4f45a33b23c0ef07c5b56fedf9adc1be",
};
