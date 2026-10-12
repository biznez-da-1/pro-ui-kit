# Marketing landing page recipe

Use this recipe as a UI-only starting point for a product or SaaS landing page. It uses the kit's existing `Button`, `Badge`, and `Card` primitives and responsive Tailwind utilities.

## Suggested page structure

1. **Header:** brand, a small set of anchor links, and one primary call to action.
2. **Hero:** a clear outcome-focused headline, a short explanation, and one primary plus one secondary action.
3. **Proof points:** three concise benefits that explain value rather than listing vague adjectives.
4. **Feature sections:** connect each feature to a user problem and a concrete result.
5. **Pricing:** state what is included, whether billing recurs, and any material limits.
6. **FAQ and footer:** answer purchase blockers and include contact, terms, and privacy links.

## Copy-ready section

```tsx
import Link from "next/link";
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";

const benefits = [
  {
    title: "Start with a system",
    description: "Reuse consistent patterns instead of rebuilding common interface elements.",
  },
  {
    title: "Keep interfaces accessible",
    description: "Use semantic controls, visible focus states, and clear feedback as a baseline.",
  },
  {
    title: "Adapt the details",
    description: "Customize the composition and styling to match your product and users.",
  },
];

export function MarketingLandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
        <Link href="#top" className="font-bold tracking-tight">
          Your product
        </Link>
        <nav aria-label="Main navigation" className="flex items-center gap-4 text-sm">
          <Link href="#features" className="hover:underline">Features</Link>
          <Link href="#pricing" className="hover:underline">Pricing</Link>
          <Button asChild>
            <Link href="#pricing">Get started</Link>
          </Button>
        </nav>
      </header>

      <section id="top" className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28">
        <Badge variant="info">A clearer way to build</Badge>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
          Build a better workflow, without the busywork.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-foreground/70 sm:text-lg">
          Explain who the product helps, the problem it solves, and the result a customer can expect.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="#pricing">Explore plans</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="#features">See how it works</Link>
          </Button>
        </div>
      </section>

      <section id="features" aria-labelledby="features-title" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 max-w-2xl">
          <h2 id="features-title" className="text-2xl font-semibold sm:text-3xl">Made for the work that matters</h2>
          <p className="mt-3 text-foreground/70">Connect each benefit to a real task your audience needs to complete.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {benefits.map((benefit) => (
            <Card key={benefit.title}>
              <CardHeader>
                <CardTitle>{benefit.title}</CardTitle>
                <CardDescription>{benefit.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground/70">
                  Replace this line with a screenshot, a short workflow, or a measurable customer outcome.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="pricing" aria-labelledby="pricing-title" className="border-t px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="pricing-title" className="text-2xl font-semibold sm:text-3xl">Straightforward pricing</h2>
          <p className="mt-3 text-foreground/70">
            Explain the price, what is included, and any usage or renewal terms before checkout.
          </p>
          <div className="mt-6">
            <Button asChild>
              <Link href="/contact">Talk to us</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
```

> **Component API note:** This example assumes the kit's `Button` supports `asChild`. Confirm that contract in the current implementation before copying the example; if it does not, render a normal `Link` styled with the project's approved link/button pattern instead. The recipe is illustrative and is not wired to checkout.

## Before publishing

- Replace generic copy with specific, verifiable product claims.
- Make every navigation link and call to action lead somewhere real.
- Test at narrow widths, 200% zoom, keyboard-only navigation, and with a screen reader.
- Confirm heading order, focus visibility, text contrast, reduced-motion behavior, and meaningful link text.
- Add real pricing, refund terms, privacy information, and contact details.
- Do not imply a checkout, account, waitlist, or form works until its server-side flow and error handling are implemented and tested.
