# Dashboard template recipe

A responsive dashboard composition recipe. It provides layout and sample UI only, not authentication, data fetching, persistence, or authorization.

## Component contracts used here

- `Navbar`: all props are optional; use `logo`, `children`, `actions`, or `mobileMenu` for its supported slots.
- `Sidebar`: requires an `items` array. Each item needs an `id` and `label`; an item can use `href` or `onClick`.
- `StatCard`: requires `title` and `value`.
- `ActivityFeed`: requires an `items` array. Each activity needs `id`, `title`, and `timestamp`.
- `EmptyState`: requires `title`; `description` and `action` are optional.

## Example

```tsx
"use client";

import * as React from "react";
import {
  ActivityFeed,
  Button,
  EmptyState,
  Navbar,
  Sidebar,
  StatCard,
} from "@/components/ui";

export function DashboardTemplate() {
  const [notice, setNotice] = React.useState("");

  const navItems = [
    { id: "overview", label: "Overview", href: "#overview", active: true },
    { id: "activity", label: "Activity", href: "#activity" },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navbar />
      <div className="mx-auto grid max-w-7xl gap-6 p-4 md:grid-cols-[240px_minmax(0,1fr)] md:p-6">
        <Sidebar items={navItems} />
        <main id="overview" className="min-w-0 space-y-6">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold">Dashboard</h1>
              <p className="mt-1 text-sm text-neutral-400">A quick overview of recent activity.</p>
            </div>
            <Button onClick={() => setNotice("Create-project flow is not connected yet.")}>New project</Button>
          </header>
          {notice && <p role="status" className="text-sm text-neutral-300">{notice}</p>}
          <section aria-label="Sample metrics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard title="Projects" value="12" />
            <StatCard title="Active users" value="1,284" />
            <StatCard title="Conversion" value="4.8%" />
            <StatCard title="Revenue" value="$8,420" />
          </section>
          <section id="activity" className="grid gap-6 lg:grid-cols-2">
            <div className="min-w-0 rounded-2xl border border-neutral-800 p-5">
              <h2 className="text-lg font-medium">Recent activity</h2>
              <ActivityFeed items={[]} />
            </div>
            <div className="min-w-0 rounded-2xl border border-neutral-800 p-5">
              <EmptyState title="No reports yet" description="Create a report to see trends here." />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
```

Sample metric values are placeholders. Replace them with authorized, validated data and add loading, error, empty, and permission-aware states. Verify the layout at 320px width. The example intentionally does not wire real project creation or a data backend.
