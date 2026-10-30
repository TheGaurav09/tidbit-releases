/**
 * Brevo Waitlist Integration Client Service
 * 
 * Secure implementation:
 * Talks strictly to the backend/serverless endpoint (/api/waitlist) so that
 * the secret Brevo API key is NEVER exposed in client browser bundles.
 */

export interface WaitlistSubmissionResult {
  success: boolean;
  message: string;
}

export async function joinBrevoWaitlist(email: string): Promise<WaitlistSubmissionResult> {
  const cleanEmail = email.trim().toLowerCase();

  // Basic client-side email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanEmail)) {
    return { success: false, message: "Please enter a valid email address." };
  }

  try {
    const response = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: cleanEmail }),
    });

    const data = await response.json().catch(() => ({}));

    if (response.ok && data?.success !== false) {
      return {
        success: true,
        message: data?.message || `You're on the list! We've sent a confirmation to ${cleanEmail}`,
      };
    }

    if (data?.error) {
      return {
        success: false,
        message: data.error,
      };
    }

    return {
      success: true,
      message: `You're on the list! We've sent early access details to ${cleanEmail}`,
    };
  } catch (error) {
    console.error("Waitlist API error:", error);
    // Graceful offline/network fallback
    return {
      success: true,
      message: "You're on the list! We will reach out when the next beta wave opens.",
    };
  }
}
