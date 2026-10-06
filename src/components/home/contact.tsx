import Panel from "@/components/panel";
import { contactEmail } from "@/lib/content";

import ContactForm from "./contact-form";
import SectionHeading from "./section-heading";

/**
 * Contact section: a short invitation and direct email on the left, the
 * enquiry form on the right
 * @returns The contact panel
 */
const Contact = () => {
  return (
    <Panel
      aria-labelledby="contact-heading"
      className="grid gap-12 px-6 py-16 sm:px-10 lg:grid-cols-12 lg:gap-8 lg:px-14 lg:py-24"
      id="contact"
    >
      <div className="lg:col-span-5">
        <SectionHeading id="contact-heading">Contact</SectionHeading>
        <p className="text-muted mt-8 max-w-[38ch] text-lg leading-relaxed">
          Tell me what you’re building and roughly when you need it. I reply to
          every enquiry within two working days.
        </p>
        <a
          className="mt-8 inline-block rounded-sm text-xl underline underline-offset-[6px] hover:no-underline"
          href={`mailto:${contactEmail}`}
        >
          {contactEmail}
        </a>
      </div>

      <div className="lg:col-span-6 lg:col-start-7">
        <ContactForm />
      </div>
    </Panel>
  );
};

Contact.displayName = "Contact";

export default Contact;
