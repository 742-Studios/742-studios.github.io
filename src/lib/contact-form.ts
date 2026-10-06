/**
 * Contact form configuration, shared by the form and the privacy notice.
 *
 * The site is static (GitHub Pages), so there is no server of its own to
 * receive submissions. The form posts straight from the browser to a hosted
 * form service, which emails the enquiry on.
 *
 * Like analytics and the upsell, this is opt-in: with no endpoint set, the
 * form validates but sends nothing, says so, and points to the email address
 * instead — and `/privacy` says the form collects nothing.
 */

/** Where the form posts. Empty when the form is not connected. */
export const contactFormEndpoint =
  process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT || "";

/** Whether submitting the form sends anything anywhere. */
export const isContactFormEnabled = contactFormEndpoint.length > 0;

/** Display names for form services whose endpoints we recognise. */
const KNOWN_PROVIDERS: Record<string, string> = {
  "formspree.io": "Formspree",
  "getform.io": "Getform",
  "usebasin.com": "Basin",
};

/**
 * The service that receives submissions, named for the privacy notice.
 *
 * Derived from the endpoint rather than configured separately, so the notice
 * cannot name one processor while the form posts to another. An unrecognised
 * service is named by its hostname.
 *
 * @returns The provider's name, or an empty string when the form is off
 */
const getProviderName = (): string => {
  if (!isContactFormEnabled) return "";

  try {
    const hostname = new URL(contactFormEndpoint).hostname;
    const match = Object.keys(KNOWN_PROVIDERS).find(
      (domain) => hostname === domain || hostname.endsWith(`.${domain}`)
    );

    return match ? KNOWN_PROVIDERS[match] : hostname;
  } catch {
    return "a third-party form service";
  }
};

export const contactFormProvider = getProviderName();
