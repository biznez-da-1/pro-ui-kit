import type { Metadata } from "next";
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";

export const metadata: Metadata = {
  title: "Product preview",
  description:
    "Preview Pro UI Kit: reusable React and TypeScript components, accessible interaction patterns, and practical interface recipes.",
  robots: { index: false, follow: false },
};

const features = [
  {
    title: "40 reusable components",
    description:
      "Explore foundations, form controls, navigation, overlays, feedback, and utility patterns in the interactive showcase.",
  },
  {
    title: "TypeScript + Tailwind",
    description:
      "Start from typed React components and utility-first styling that can be adapted to your own design system.",
  },
  {
    title: "Practical recipes",
    description:
      "Use documented examples for dashboards, forms, settings, marketing pages, tables, and common UI states.",
  },
];

const includes = [
  "React component source code",
  "TypeScript component APIs",
  "Tailwind CSS styling",
  "Interactive component showcase",
  "Usage recipes and accessibility checklists",
];

export default function ProductPreviewPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-foreground/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <a href="#top" className="font-bold tracking-tight">PRO UI KIT</a>
          <nav aria-label="Main navigation" className="flex items-center gap-4 text-sm">
            <a href="#features" className="text-foreground/70 hover:text-foreground">Features</a>
            <a href="#included" className="text-foreground/70 hover:text-foreground">What's included</a>
            <a href="#pricing" className="text-foreground/70 hover:text-foreground">Availability</a>
          </nav>
        </div>
      </header>

      <section id="top" className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 sm:py-28">
        <Badge variant="info">Product preview · In development</Badge>
        <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
          Spend less time rebuilding UI. More time building your product.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-foreground/70 sm:text-lg">
          Pro UI Kit is a React, TypeScript, and Tailwind component collection with interactive examples and practical interface recipes.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}>
            Explore the benefits
          </Button>
          <Button variant="outline" onClick={() => window.location.assign("/")}>
            Open component showcase
          </Button>
        </div>
        <p className="mx-auto mt-5 max-w-xl text-xs text-foreground/60">
          This is a preview, not an active storefront. Checkout, licensing, and secure file delivery are not connected yet.
        </p>
      </section>

      <section id="features" aria-labelledby="features-title" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 max-w-2xl">
          <h2 id="features-title" className="text-2xl font-semibold sm:text-3xl">A practical starting point</h2>
          <p className="mt-3 text-foreground/70">A clear baseline for teams that want reusable patterns and fewer one-off interface decisions.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section id="included" aria-labelledby="included-title" className="border-y border-foreground/10 bg-foreground/[0.02] px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 id="included-title" className="text-2xl font-semibold sm:text-3xl">What the planned package includes</h2>
            <p className="mt-3 leading-7 text-foreground/70">
              The intended product is a source-code kit and documentation bundle. It is not a hosted app, backend service, or subscription.
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Planned package contents</CardTitle>
              <CardDescription>Final contents and terms must be confirmed before release.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <span aria-hidden="true" className="mt-0.5 text-emerald-500">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="pricing" aria-labelledby="pricing-title" className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
        <Badge variant="warning">Not available for purchase yet</Badge>
        <h2 id="pricing-title" className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">Planned one-time price: $49</h2>
        <p className="mx-auto mt-4 max-w-2xl leading-7 text-foreground/70">
          The price is a planning placeholder based on the current showcase. Purchase terms, final package contents, licensing, refunds, support, checkout, and download delivery must be completed before sales open.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button disabled>Checkout coming soon</Button>
          <Button variant="outline" onClick={() => window.location.assign("/")}>Return to showcase</Button>
        </div>
      </section>

      <footer className="border-t border-foreground/10 px-4 py-8 text-center text-sm text-foreground/60">
        Pro UI Kit · Product preview only · No checkout or file delivery is active.
      </footer>
    </main>
  );
}
