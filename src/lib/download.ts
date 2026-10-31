/**
 * Direct Download Utility
 * 
 * Initiates an automatic file download in the background without redirecting
 * or navigating away from the current page.
 */

export function triggerDirectDownload(url: string, filename = "tidbit-v2.1.0.apk") {
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  link.setAttribute("rel", "noopener noreferrer");
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    if (document.body.contains(link)) {
      document.body.removeChild(link);
    }
  }, 500);
}

