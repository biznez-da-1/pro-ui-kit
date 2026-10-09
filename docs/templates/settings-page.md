# Settings page template recipe

A responsive settings-page composition using native controls and the Pro UI Kit. This recipe is a UI example only: it does not persist changes, authenticate users, or connect to a backend.

## Example

```tsx
"use client";

import * as React from "react";
import { Button, Card, Input, Select, Switch, Textarea } from "@/components/ui";

export function SettingsTemplate() {
  const [displayName, setDisplayName] = React.useState("Alex Morgan");
  const [email, setEmail] = React.useState("alex@example.com");
  const [timezone, setTimezone] = React.useState("America/Mexico_City");
  const [productUpdates, setProductUpdates] = React.useState(false);
  const [bio, setBio] = React.useState("");
  const [notice, setNotice] = React.useState("");

  function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("Demo only: these settings have not been saved to a server.");
  }

  return (
    <main className="min-h-screen bg-neutral-950 px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-3xl space-y-6">
        <header>
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="mt-2 text-sm text-neutral-400">Manage your profile and preferences.</p>
        </header>
        <form onSubmit={handleSave} className="space-y-6">
          <Card className="space-y-5 p-5">
            <div>
              <h2 className="text-lg font-medium">Profile</h2>
              <p className="mt-1 text-sm text-neutral-400">Update the details shown on your profile.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="settings-name" className="text-sm font-medium">Display name</label>
                <Input id="settings-name" value={displayName} onChange={(event) => setDisplayName(event.target.value)} required autoComplete="name" />
              </div>
              <div className="space-y-2">
                <label htmlFor="settings-email" className="text-sm font-medium">Email address</label>
                <Input id="settings-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="settings-bio" className="text-sm font-medium">Bio</label>
              <Textarea id="settings-bio" value={bio} onChange={(event) => setBio(event.target.value)} placeholder="A short introduction" rows={4} />
            </div>
          </Card>
          <Card className="space-y-5 p-5">
            <div>
              <h2 className="text-lg font-medium">Preferences</h2>
              <p className="mt-1 text-sm text-neutral-400">Choose how this demo should be configured.</p>
            </div>
            <div className="space-y-2">
              <label htmlFor="settings-timezone" className="text-sm font-medium">Time zone</label>
              <Select id="settings-timezone" value={timezone} onChange={(event) => setTimezone(event.target.value)}>
                <option value="America/Mexico_City">Mexico City</option>
                <option value="America/Chicago">Central Time (US)</option>
                <option value="Europe/London">London</option>
                <option value="UTC">UTC</option>
              </Select>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-xl border border-neutral-800 p-4">
              <div>
                <p className="text-sm font-medium">Product updates</p>
                <p className="mt-1 text-xs text-neutral-400">Toggle the preference in this local demo.</p>
              </div>
              <Switch checked={productUpdates} onCheckedChange={setProductUpdates} />
            </div>
          </Card>
          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit">Save settings</Button>
            {notice && <p role="status" aria-live="polite" className="text-sm text-neutral-300">{notice}</p>}
          </div>
        </form>
      </div>
    </main>
  );
}
```

Before adapting this recipe, confirm the current `Switch`, `Input`, and `Textarea` prop types. This example uses local state only; add a real persistence layer and server-side authorization separately.
