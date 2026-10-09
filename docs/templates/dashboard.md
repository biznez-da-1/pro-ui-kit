# Dashboard template recipe

A reusable starting point for an authenticated product dashboard. This is a UI composition recipe, not a complete authentication or data backend.

## Suggested layout

- **Application shell:** Sidebar for primary navigation, Navbar for account and global actions.
- **Page header:** Title, short description, and one primary action.
- **Summary row:** Three or four StatCards with clear metric labels and optional trend descriptions.
- **Main content:** A responsive two-column grid with a chart or table on the wider side and an ActivityFeed on the other.
- **Empty state:** Use EmptyState when a new account has no data yet. Include a useful next step.
- **Feedback:** Use Alert for persistent, important messages and Toast for short-lived action confirmation.
- **Overlays:** Use Dialog for confirmation and Sheet for secondary workflows on small screens.

## Composition example

```tsx
import {
  ActivityFeed,
  Button,
  EmptyState,
  Navbar,
  Sidebar,
  StatCard,
} from "@/components/ui";

export function DashboardTemplate() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navbar />
      <div className="mx-auto grid max-w-7xl gap-6 p-4 md:grid-cols-[240px_minmax(0,1fr)] md:p-6">
        <aside>
          <Sidebar />
        </aside>
        <main className="min-w-0 space-y-6">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold">Dashboard</h1>
              <p className="mt-1 text-sm text-neutral-400">
                A quick overview of recent activity.
              </p>
            </div>
            <Button>New project</Button>
          </header>
          <section aria-label="Key metrics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard title="Projects" value="12" />
            <StatCard title="Active users" value="1,284" />
            <StatCard title="Conversion" value="4.8%" />
            <StatCard title="Revenue" value="$8,420" />
          </section>
          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-neutral-800 p-5">
              <h2 className="text-lg font-medium">Recent activity</h2>
              <ActivityFeed items={[]} />
            </div>
            <div className="rounded-2xl border border-neutral-800 p-5">
              <EmptyState
                title="No reports yet"
                description="Create a report to see trends here."
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
```

> **Integration note:** Verify the exact props required by Navbar, Sidebar, StatCard, ActivityFeed, and EmptyState against their current definitions before using this as a copy-paste screen. Replace sample metrics with real data, add loading/error states, and verify the layout at 320px width. Do not use placeholder numbers in production.
