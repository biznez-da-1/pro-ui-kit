# Loading, error, and empty states

Use the same state model across pages so people always know whether content is loading, unavailable, or simply not there yet.

## State rules

- **Loading:** show a small number of Skeleton blocks that match the shape of the expected content. Hide decorative placeholders from assistive technology and avoid announcing every skeleton separately.
- **Success with data:** render the content and give repeated collections meaningful headings.
- **Empty:** use EmptyState with a specific explanation and one useful next action.
- **Recoverable error:** use Alert with a clear description and an explicit retry action. Keep existing user input when possible.
- **Background progress:** use Progress with a useful label and a real numeric value.
- **Short action confirmation:** use Toast. Reserve assertive announcements for errors that need immediate attention.

## Composition example

```tsx
import { Alert, Button, EmptyState, Progress, Skeleton } from "@/components/ui";

type ResourceState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "empty" }
  | { status: "ready"; items: { id: string; title: string }[] };

export function ResourcePanel({ state, onRetry }: {
  state: ResourceState;
  onRetry: () => void;
}) {
  if (state.status === "loading") {
    return (
      <section aria-busy="true" aria-label="Loading projects" className="space-y-3">
        <Skeleton className="h-7 w-1/3" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </section>
    );
  }

  if (state.status === "error") {
    return (
      <Alert variant="error" title="Projects could not be loaded">
        <p>{state.message}</p>
        <Button className="mt-3" variant="outline" onClick={onRetry}>
          Try again
        </Button>
      </Alert>
    );
  }

  if (state.status === "empty" || state.items.length === 0) {
    return (
      <EmptyState
        title="No projects yet"
        description="Create a project to keep your work organized."
        action={<Button onClick={onRetry}>Create a project</Button>}
      />
    );
  }

  return (
    <section aria-labelledby="projects-heading">
      <h2 id="projects-heading" className="text-lg font-semibold">Projects</h2>
      <ul className="mt-3 space-y-2">
        {state.items.map((item) => (
          <li key={item.id} className="rounded-xl border p-4">{item.title}</li>
        ))}
      </ul>
      <Progress label="Projects loaded" value={state.items.length} max={Math.max(state.items.length, 1)} />
    </section>
  );
}
```

## Production checklist

- Keep loading placeholders visually similar to the final layout to reduce layout shift.
- Use `aria-busy` only while the region is updating, then remove it.
- Preserve a clear heading and focus order when an error replaces the content.
- Avoid auto-retrying indefinitely or repeatedly announcing the same failure.
- Make the empty-state action match the user's permissions and the current route.
- Add server-side loading, error handling, and data validation; this recipe is UI composition only.
