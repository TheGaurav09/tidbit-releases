/**
 * TidBit Global Application & Release Configuration
 */

export const APP_CONFIG = {
  name: "TidBit",
  tagline: "The Antidote to Brainrot | Distraction-Free Micro-Learning",
  version: "v2.0.9",
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
  sha256Hash: "326AE1C226A03914E254E10347B5AFD2E8FB0ADC415DCF30AC284283B7309531",
};
