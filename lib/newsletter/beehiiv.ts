/*
 * Pushes confirmed subscribers into the beehiiv publication that hosts the
 * newsletter.
 *
 * The spreadsheet stays the record of who signed up. beehiiv is only the
 * platform that sends to them, so nothing is lost here that cannot be
 * replayed from that record, and a bad day at beehiiv must never turn a
 * successful signup into a failed one for the visitor.
 */

const subscriptionsUrl = (publicationId: string) =>
  `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`;

/**
 * Adds an address to the beehiiv publication. Never throws.
 *
 * Returns whether beehiiv accepted the address, so the caller can log the
 * difference without acting on it. Call this only once every guard on the
 * route has passed and a new row has been written, so that bot traffic and
 * repeat addresses never reach the list.
 */
export const addSubscriberToBeehiiv = async (
  email: string,
): Promise<boolean> => {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;

  // Missing configuration is a deployment mistake rather than a visitor
  // problem, so it is logged loudly and the signup still succeeds.
  if (!apiKey || !publicationId) {
    console.error("BEEHIIV_NOT_CONFIGURED");

    return false;
  }

  try {
    const response = await fetch(subscriptionsUrl(publicationId), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        // Resend sends the confirmation, so beehiiv stays silent. The
        // welcome email is switched off on the publication as well, since
        // this field is the likelier of the two to drift if the API
        // changes under us.
        send_welcome_email: false,
        // Someone who unsubscribed and then came back through the form is
        // asking to be on the list again.
        reactivate_existing: true,
        utm_source: "gritandgrowfarm.com",
        utm_medium: "footer_form",
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("BEEHIIV_SUBSCRIBE_FAILED", {
        status: response.status,
        body: await response.text(),
      });

      return false;
    }

    return true;
  } catch (error) {
    console.error("BEEHIIV_SUBSCRIBE_THREW", { reason: error });

    return false;
  }
};
