# Accessible form workflow recipe

This is a client-side form composition example. It demonstrates labels, native browser validation, and a visible submission status. It does **not** submit data to a server or provide spam protection, persistence, or server-side validation.

```tsx
"use client";

import * as React from "react";
import {
  Alert,
  Button,
  Checkbox,
  Input,
  Select,
  Textarea,
} from "@/components/ui";

export function ContactFormTemplate() {
  const [submitted, setSubmitted] = React.useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-xl space-y-5">
      <div>
        <h1 className="text-2xl font-semibold">Contact us</h1>
        <p className="mt-1 text-sm text-neutral-400">
          Tell us what you need and we’ll point you in the right direction.
        </p>
      </div>

      {submitted && (
        <p role="status" className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-200">
          The form passed browser validation. Connect this handler to your API before production.
        </p>
      )}

      <div className="space-y-2">
        <label htmlFor="contact-name" className="block text-sm font-medium">Name</label>
        <Input id="contact-name" name="name" autoComplete="name" required />
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-email" className="block text-sm font-medium">Email address</label>
        <Input id="contact-email" name="email" type="email" autoComplete="email" required />
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-topic" className="block text-sm font-medium">Topic</label>
        <Select id="contact-topic" name="topic" defaultValue="" required>
          <option value="" disabled>Select a topic</option>
          <option value="support">Product support</option>
          <option value="sales">Sales question</option>
          <option value="feedback">Feedback</option>
        </Select>
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-message" className="block text-sm font-medium">Message</label>
        <Textarea id="contact-message" name="message" rows={5} required aria-describedby="contact-message-help" />
        <p id="contact-message-help" className="text-xs text-neutral-500">Do not include passwords or sensitive personal information.</p>
      </div>

      <Checkbox name="updates" label="Email me occasional product updates" />

      <Button type="submit" className="w-full">Validate form</Button>
    </form>
  );
}
```

## Before production

- Connect the submit handler to a server action or API endpoint.
- Validate all fields on the server, even when browser validation is enabled.
- Add pending, success, and recoverable error states.
- Define privacy, retention, consent, and abuse-prevention requirements for the data being collected.
- Verify keyboard use, screen-reader announcements, narrow-screen layout, and browser validation behavior.
