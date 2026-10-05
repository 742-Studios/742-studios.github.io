"use client";

import { useId, useState } from "react";

import { contactFormEndpoint, isContactFormEnabled } from "@/lib/contact-form";
import { contactEmail } from "@/lib/content";

import DotLabel from "./dot-label";

interface FieldProps {
  autoComplete?: string;
  label: string;
  multiline?: boolean;
  name: string;
  required?: boolean;
  type?: string;
}

/**
 * One form field: a small label above a single underline, as in the
 * reference design. Optional fields say so; required ones don't need a mark.
 *
 * @param props - Field configuration
 * @returns A labelled input or textarea
 */
const Field = ({
  autoComplete,
  label,
  multiline = false,
  name,
  required = false,
  type = "text",
}: FieldProps) => {
  const id = useId();
  const inputClassName =
    "mt-2 block w-full border-b border-ink/35 bg-transparent pb-2 text-lg outline-none transition-colors placeholder:text-muted focus:border-ink focus-visible:border-b-2";

  return (
    <div>
      <label className="text-muted text-sm" htmlFor={id}>
        {label}
        {required ? null : " (optional)"}
      </label>
      {multiline ? (
        <textarea
          className={`${inputClassName} min-h-32 resize-y`}
          id={id}
          name={name}
          required={required}
          rows={4}
        />
      ) : (
        <input
          autoComplete={autoComplete}
          className={inputClassName}
          id={id}
          name={name}
          required={required}
          type={type}
        />
      )}
    </div>
  );
};

Field.displayName = "Field";

type SubmitState = "error" | "idle" | "sending" | "sent" | "unconfigured";

/** What the status line says after each outcome. */
const STATUS_MESSAGES: Record<SubmitState, string> = {
  error: `Your enquiry wasn’t sent. Check your connection and try again, or email ${contactEmail}.`,
  idle: "",
  sending: "",
  sent: "Enquiry sent. I’ll reply within two working days.",
  unconfigured: `This form isn’t connected yet, so your message wasn’t sent. Email ${contactEmail} instead.`,
};

/**
 * Project enquiry form.
 *
 * Posts straight from the browser to the form service configured in
 * `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` (see `lib/contact-form.ts`), asking for
 * a JSON response so the page stays put. With no endpoint configured it
 * validates, sends nothing, and points to the email address instead.
 *
 * @returns The enquiry form
 */
const ContactForm = () => {
  const [state, setState] = useState<SubmitState>("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isContactFormEnabled) {
      setState("unconfigured");
      return;
    }

    const form = event.currentTarget;
    setState("sending");

    try {
      const response = await fetch(contactFormEndpoint, {
        body: new FormData(form),
        headers: { Accept: "application/json" },
        method: "POST",
      });

      if (!response.ok) throw new Error(`Form service: ${response.status}`);

      form.reset();
      setState("sent");
    } catch {
      setState("error");
    }
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      {/*
        Honeypot. Hidden from people and assistive technology, so only bots
        fill it in; form services that support `_gotcha` drop those
        submissions silently.
      */}
      <input
        autoComplete="off"
        className="hidden"
        name="_gotcha"
        tabIndex={-1}
        type="text"
      />
      <div className="grid gap-8 sm:grid-cols-2">
        <Field autoComplete="name" label="Name" name="name" required />
        <Field
          autoComplete="email"
          label="Email"
          name="email"
          required
          type="email"
        />
      </div>
      <Field autoComplete="organization" label="Company" name="company" />
      <Field label="About your project" multiline name="message" required />

      <div className="flex flex-col-reverse gap-6 sm:flex-row sm:items-start sm:justify-between">
        <p className="text-muted max-w-[44ch] text-sm" role="status">
          {STATUS_MESSAGES[state]}
        </p>
        <button
          className="group shrink-0 self-end rounded-sm text-xl disabled:opacity-60"
          disabled={state === "sending"}
          type="submit"
        >
          <DotLabel>
            {state === "sending" ? "Sending…" : "Send enquiry"}
          </DotLabel>
        </button>
      </div>
    </form>
  );
};

ContactForm.displayName = "ContactForm";

export default ContactForm;
