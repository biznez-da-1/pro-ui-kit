# Accessible data table and list-view recipe

Use a native HTML table when people need to compare values across rows and columns. On small screens, keep the table in a labeled horizontal-scroll region rather than shrinking text until it becomes unreadable.

## Copy-ready table

```tsx
type Project = {
  id: string;
  name: string;
  owner: string;
  status: "Active" | "Paused" | "Complete";
  updated: string;
};

const projects: Project[] = [
  { id: "p-101", name: "Website refresh", owner: "Jordan Lee", status: "Active", updated: "2026-09-18" },
  { id: "p-102", name: "Design system", owner: "Sam Rivera", status: "Paused", updated: "2026-09-12" },
];

export function ProjectsTable() {
  if (projects.length === 0) {
    return (
      <section aria-labelledby="projects-empty-title" className="rounded-xl border p-6">
        <h2 id="projects-empty-title" className="font-semibold">No projects yet</h2>
        <p className="mt-2 text-sm text-foreground/70">
          Create a project to see its owner, status, and last update here.
        </p>
      </section>
    );
  }

  return (
    <div
      className="overflow-x-auto rounded-xl border"
      role="region"
      aria-label="Projects table"
      tabIndex={0}
    >
      <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
        <caption className="sr-only">Projects, their owners, status, and last update</caption>
        <thead>
          <tr className="border-b bg-foreground/5">
            <th scope="col" className="px-4 py-3 font-semibold">Project</th>
            <th scope="col" className="px-4 py-3 font-semibold">Owner</th>
            <th scope="col" className="px-4 py-3 font-semibold">Status</th>
            <th scope="col" className="px-4 py-3 font-semibold">Last updated</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id} className="border-b last:border-0">
              <th scope="row" className="px-4 py-3 font-medium">{project.name}</th>
              <td className="px-4 py-3">{project.owner}</td>
              <td className="px-4 py-3">{project.status}</td>
              <td className="px-4 py-3">
                <time dateTime={project.updated}>
                  {new Date(project.updated + "T12:00:00").toLocaleDateString()}
                </time>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

## Sorting and filtering

If you add sorting, use a real button inside the relevant column header. Expose the current sort column with `aria-sort` on that header cell (`ascending`, `descending`, or `none`) and update both the visible row order and the accessible state together. A filter needs a visible label and should communicate the number of matching rows. Provide a clear-filter action when users can narrow the results.

## Production checklist

- Use stable row keys and real unique record IDs.
- Keep column headers associated with cells using native table semantics.
- Do not use color as the only status indicator.
- Provide loading, error, empty, and populated states.
- Keep destructive actions separate and clearly labeled; confirm consequential actions.
- Make horizontal scrolling keyboard accessible and test at narrow widths and high zoom.
- Format dates and numbers for the user's locale, and avoid showing timestamps that imply unsupported precision.
- Connect the data source, authorization, pagination, sorting, and filtering to the server or API where appropriate. This recipe is front-end-only and does not implement those services.
