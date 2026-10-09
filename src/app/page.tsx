"use client";

import * as React from "react";
import {
  Activity,
  ArrowRight,
  Bell,
  Check,
  ChevronRight,
  Code2,
  Download,
  Folder,
  Home as HomeIcon,
  Layers3,
  Menu,
  Search,
  Settings,
  Star,
  Zap,
} from "lucide-react";

import {
  Accordion,
  ActivityFeed,
  Alert,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Card,
  CommandMenu,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  CodeBlock,
  CopyButton,
  Dialog,
  DropdownMenu,
  EmptyState,
  FileUpload,
  FilterBar,
  Input,
  Kbd,
  Navbar,
  Popover,
  PricingCard,
  Progress,
  RadioGroup,
  SearchInput,
  Select,
  Separator,
  Sheet,
  Sidebar,
  Skeleton,
  Slider,
  Spinner,
  StatCard,
  Stepper,
  Switch,
  Tabs,
  Textarea,
  Timeline,
  Toast,
  Tooltip,
} from "@/components/ui";

const componentGroups = [
  {
    name: "Foundations",
    items: [
      "Badge",
      "Button",
      "Card",
      "Input",
      "Separator",
      "Skeleton",
      "Spinner",
    ],
  },
  {
    name: "Forms",
    items: [
      "Checkbox",
      "RadioGroup",
      "Select",
      "Slider",
      "Switch",
      "Textarea",
    ],
  },
  {
    name: "Navigation",
    items: [
      "Breadcrumb",
      "Navbar",
      "Sidebar",
      "Tabs",
      "Stepper",
    ],
  },
  {
    name: "Overlays",
    items: [
      "Dialog",
      "DropdownMenu",
      "Popover",
      "Sheet",
      "Tooltip",
    ],
  },
  {
    name: "Data & Feedback",
    items: [
      "Accordion",
      "ActivityFeed",
      "Alert",
      "Progress",
      "StatCard",
      "Timeline",
      "Toast",
    ],
  },
  {
    name: "Commerce",
    items: ["PricingCard"],
  },
  {
    name: "Utilities",
    items: [
      "Avatar",
      "CodeBlock",
      "CopyButton",
      "EmptyState",
      "FileUpload",
      "FilterBar",
      "Kbd",
      "SearchInput",
      "CommandMenu",
    ],
  },
];

const allComponents = componentGroups.flatMap((group) => group.items);

function DemoShell({
  name,
  description,
  children,
}: {
  name: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={`component-${name.toLowerCase().replace(/\s+/g, "-")}`}
      className="scroll-mt-24"
    >
      <Card variant="glass">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle>{name}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
            <Badge variant="info">Live</Badge>
          </div>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </section>
  );
}

export default function Home() {
  const [search, setSearch] = React.useState("");
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const [commandOpen, setCommandOpen] = React.useState(false);
  const [toastOpen, setToastOpen] = React.useState(false);

  const [checked, setChecked] = React.useState(true);
  const [switchValue, setSwitchValue] = React.useState(true);
  const [radioValue, setRadioValue] = React.useState("pro");
  const [selectValue, setSelectValue] = React.useState("react");
  const [sliderValue, setSliderValue] = React.useState(65);
  const [progress, setProgress] = React.useState(72);
  const [textValue, setTextValue] = React.useState("");
  const [textareaValue, setTextareaValue] = React.useState("");
  const [filterValue, setFilterValue] = React.useState("");
  const [step, setStep] = React.useState(1);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [uploadedFiles, setUploadedFiles] = React.useState<File[]>([]);
  const [selectedAction, setSelectedAction] = React.useState("None selected");

  const filteredComponents = React.useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return allComponents;

    return allComponents.filter((name) =>
      name.toLowerCase().includes(query),
    );
  }, [search]);

  const scrollToComponent = (name: string) => {
    document
      .getElementById(
        `component-${name.toLowerCase().replace(/\s+/g, "-")}`,
      )
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const showToast = () => {
    setToastOpen(true);
  };

  const demoFor = (name: string) => {
    switch (name) {
      case "Badge":
        return (
          <div className="flex flex-wrap gap-3">
            <Badge>Default</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="info">Info</Badge>
          </div>
        );

      case "Button":
        return (
          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={() => setSelectedAction("Primary clicked")}>
              Primary
            </Button>
            <Button
              variant="secondary"
              onClick={() => setSelectedAction("Secondary clicked")}
            >
              Secondary
            </Button>
            <Button
              variant="outline"
              onClick={() => setSelectedAction("Outline clicked")}
            >
              Outline
            </Button>
            <Button
              variant="ghost"
              onClick={() => setSelectedAction("Ghost clicked")}
            >
              Ghost
            </Button>
            <Button
              variant="destructive"
              onClick={() => setSelectedAction("Destructive clicked")}
            >
              Delete
            </Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <span className="text-sm text-zinc-400">
              Last action: {selectedAction}
            </span>
          </div>
        );

      case "Card":
        return (
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
                <CardDescription>Clean content container.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-zinc-400">
                Built from the Card primitives.
              </CardContent>
              <CardFooter>
                <Button size="sm">Open</Button>
              </CardFooter>
            </Card>

            <Card variant="glass">
              <CardHeader>
                <CardTitle>Glass</CardTitle>
                <CardDescription>Glassmorphism treatment.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-zinc-400">
                Useful for dashboards and premium interfaces.
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardHeader>
                <CardTitle>Outlined</CardTitle>
                <CardDescription>Minimal bordered surface.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-zinc-400">
                Strong visual separation without heavy fill.
              </CardContent>
            </Card>
          </div>
        );

      case "Input":
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              value={textValue}
              onChange={(event) => setTextValue(event.target.value)}
              placeholder="Type something..."
            />
            <Input placeholder="Error example" error />
            <p className="text-sm text-zinc-400 md:col-span-2">
              Current value: {textValue || "Nothing entered yet"}
            </p>
          </div>
        );

      case "Separator":
        return (
          <div className="space-y-6">
            <div>
              <p className="mb-3 text-sm text-zinc-400">Horizontal</p>
              <Separator />
            </div>
            <div className="flex h-12 items-center gap-4">
              <span className="text-sm">Left</span>
              <Separator orientation="vertical" />
              <span className="text-sm">Right</span>
            </div>
          </div>
        );

      case "Skeleton":
        return (
          <div className="max-w-xl space-y-4">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-10 w-32" />
          </div>
        );

      case "Spinner":
        return (
          <div className="flex flex-wrap items-center gap-6">
            <Spinner size="sm" label="Loading" />
            <Spinner size="md" label="Loading" />
            <Spinner size="lg" label="Loading" />
          </div>
        );

      case "Checkbox":
        return (
          <div className="space-y-3">
            <Checkbox
              checked={checked}
              onChange={(event) => setChecked(event.target.checked)}
              label="Enable notifications"
            />
            <p className="text-sm text-zinc-400">
              State: {checked ? "checked" : "unchecked"}
            </p>
          </div>
        );

      case "RadioGroup":
        return (
          <div className="space-y-4">
            <RadioGroup
              value={radioValue}
              onValueChange={setRadioValue}
              name="plan"
              orientation="horizontal"
              options={[
                {
                  value: "free",
                  label: "Free",
                  description: "For trying the kit.",
                },
                {
                  value: "pro",
                  label: "Pro",
                  description: "For production work.",
                },
                {
                  value: "team",
                  label: "Team",
                  description: "For larger projects.",
                },
              ]}
            />
            <p className="text-sm text-zinc-400">
              Selected: {radioValue}
            </p>
          </div>
        );

      case "Select":
        return (
          <div className="max-w-md space-y-3">
            <Select
              value={selectValue}
              onChange={(event) => setSelectValue(event.target.value)}
            >
              <option value="react">React</option>
              <option value="next">Next.js</option>
              <option value="vue">Vue</option>
              <option value="svelte">Svelte</option>
            </Select>
            <p className="text-sm text-zinc-400">
              Selected framework: {selectValue}
            </p>
          </div>
        );

      case "Slider":
        return (
          <div className="max-w-xl space-y-4">
            <Slider
              value={sliderValue}
              min={0}
              max={100}
              step={1}
              onValueChange={setSliderValue}
            />
            <div className="flex justify-between text-sm text-zinc-400">
              <span>0</span>
              <span>Value: {sliderValue}</span>
              <span>100</span>
            </div>
          </div>
        );

      case "Switch":
        return (
          <div className="space-y-3">
            <Switch
              checked={switchValue}
              onChange={(event) => setSwitchValue(event.target.checked)}
              label="Enable premium mode"
            />
            <p className="text-sm text-zinc-400">
              Premium mode: {switchValue ? "ON" : "OFF"}
            </p>
          </div>
        );

      case "Textarea":
        return (
          <div className="max-w-2xl space-y-3">
            <Textarea
              value={textareaValue}
              onChange={(event) => setTextareaValue(event.target.value)}
              placeholder="Write a message..."
              rows={5}
            />
            <p className="text-sm text-zinc-400">
              Characters: {textareaValue.length}
            </p>
          </div>
        );

      case "Breadcrumb":
        return (
          <Breadcrumb
            items={[
              { label: "Home", href: "#" },
              { label: "Components", href: "#components" },
              { label: "Breadcrumb" },
            ]}
          />
        );

      case "Navbar":
        return (
          <div className="overflow-hidden rounded-xl border border-white/10">
            <Navbar
              logo={
                <div className="font-black tracking-tight text-white">
                  PRO UI
                </div>
              }
              actions={
                <Button size="sm" onClick={() => setSelectedAction("Navbar action")}>
                  Action
                </Button>
              }
              mobileMenu={
                <div className="space-y-2 p-4 text-sm">
                  <div>Components</div>
                  <div>Pricing</div>
                  <div>Documentation</div>
                </div>
              }
            >
              <div className="hidden gap-5 text-sm text-zinc-400 md:flex">
                <span>Components</span>
                <span>Pricing</span>
                <span>Docs</span>
              </div>
            </Navbar>
          </div>
        );

      case "Sidebar":
        return (
          <div className="max-w-2xl overflow-hidden rounded-xl border border-white/10">
            <Sidebar
              collapsed={sidebarCollapsed}
              onCollapsedChange={setSidebarCollapsed}
              header={
                <div className="font-bold text-white">
                  {sidebarCollapsed ? "P" : "Pro UI"}
                </div>
              }
              items={[
                {
                  id: "dashboard",
                  label: "Dashboard",
                  icon: <HomeIcon size={16} />,
                  active: true,
                },
                {
                  id: "activity",
                  label: "Activity",
                  icon: <Activity size={16} />,
                },
                {
                  id: "settings",
                  label: "Settings",
                  icon: <Settings size={16} />,
                },
              ]}
              footer={
                <div className="text-xs text-zinc-500">
                  {sidebarCollapsed ? "v1" : "Pro UI Kit v1.0"}
                </div>
              }
            />
          </div>
        );

      case "Tabs":
        return (
          <Tabs
            defaultTab="overview"
            tabs={[
              {
                id: "overview",
                label: "Overview",
                content: (
                  <div className="rounded-lg border border-white/10 p-4 text-sm text-zinc-300">
                    Overview content is active.
                  </div>
                ),
              },
              {
                id: "activity",
                label: "Activity",
                content: (
                  <div className="rounded-lg border border-white/10 p-4 text-sm text-zinc-300">
                    Activity content is active.
                  </div>
                ),
              },
              {
                id: "settings",
                label: "Settings",
                content: (
                  <div className="rounded-lg border border-white/10 p-4 text-sm text-zinc-300">
                    Settings content is active.
                  </div>
                ),
              },
            ]}
          />
        );

      case "Stepper":
        return (
          <div className="space-y-5">
            <Stepper
              steps={[
                { id: "one", label: "Choose", description: "Select your kit." },
                { id: "two", label: "Customize", description: "Configure it." },
                { id: "three", label: "Download", description: "Get the files." },
                { id: "four", label: "Launch", description: "Ship your project." },
              ]}
              currentStep={step}
            />
            <div className="flex gap-2">
              <Button
                variant="outline"
                disabled={step === 1}
                onClick={() => setStep((value) => Math.max(1, value - 1))}
              >
                Previous
              </Button>
              <Button
                disabled={step === 3}
                onClick={() => setStep((value) => Math.min(3, value + 1))}
              >
                Next
              </Button>
            </div>
            <p className="text-sm text-zinc-400">
              Step {step + 1} of 4
            </p>
          </div>
        );

      case "Dialog":
        return (
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => setDialogOpen(true)}>
              Open Dialog
            </Button>
            <Dialog
              open={dialogOpen}
              onClose={() => setDialogOpen(false)}
              title="Confirm purchase"
              description="This is a functional dialog demonstration."
            >
              <div className="space-y-5">
                <p className="text-sm text-zinc-400">
                  The action is ready to be connected to your real checkout
                  flow later.
                </p>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      setDialogOpen(false);
                      setSelectedAction("Dialog confirmed");
                      showToast();
                    }}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </Dialog>
          </div>
        );

      case "DropdownMenu":
        return (
          <div className="flex items-center gap-4">
            <DropdownMenu
              trigger={
                <Button variant="outline">
                  Actions <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              }
              items={[
                {
                  id: "edit",
                  label: "Edit",
                  onSelect: () => setSelectedAction("Edit selected"),
                },
                {
                  id: "duplicate",
                  label: "Duplicate",
                  onSelect: () => setSelectedAction("Duplicate selected"),
                },
                {
                  id: "settings",
                  label: "Settings",
                  onSelect: () => setSelectedAction("Settings selected"),
                },
                {
                  id: "delete",
                  label: "Delete",
                  destructive: true,
                  onSelect: () => setSelectedAction("Delete selected"),
                },
              ]}
            />
            <span className="text-sm text-zinc-400">
              {selectedAction}
            </span>
          </div>
        );

      case "Popover":
        return (
          <Popover
            open={popoverOpen}
            onOpenChange={setPopoverOpen}
            trigger={<Button variant="outline">Open Popover</Button>}
            align="left"
          >
            <div className="w-64 space-y-3">
              <div className="font-semibold text-white">Quick settings</div>
              <p className="text-sm text-zinc-400">
                This content is rendered inside the controlled popover.
              </p>
              <Button size="sm" onClick={() => setPopoverOpen(false)}>
                Done
              </Button>
            </div>
          </Popover>
        );

      case "Sheet":
        return (
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => setSheetOpen(true)}>
              Open Sheet
            </Button>
            <Sheet
              open={sheetOpen}
              onClose={() => setSheetOpen(false)}
              side="right"
              title="Component settings"
              description="A full-height responsive panel."
            >
              <div className="space-y-5">
                <Input placeholder="Project name" />
                <Textarea placeholder="Project description" rows={4} />
                <div className="flex justify-end">
                  <Button onClick={() => setSheetOpen(false)}>
                    Save changes
                  </Button>
                </div>
              </div>
            </Sheet>
          </div>
        );

      case "Tooltip":
        return (
          <div className="flex flex-wrap gap-4">
            <Tooltip content="This is a helpful tooltip." side="top">
              <Button variant="outline">
                Hover me
              </Button>
            </Tooltip>
            <Tooltip content="Settings" side="right">
              <button
                type="button"
                aria-label="Settings"
                className="rounded-lg border border-white/10 p-3 text-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <Settings size={18} aria-hidden="true" />
              </button>
            </Tooltip>
          </div>
        );

      case "Accordion":
        return (
          <Accordion
            type="single"
            defaultValue="what"
            items={[
              {
                id: "what",
                title: "What is Pro UI Kit?",
                content:
                  "A reusable collection of production-ready React UI components.",
              },
              {
                id: "license",
                title: "Can I use it commercially?",
                content:
                  "The final product license will define commercial usage rights.",
              },
              {
                id: "updates",
                title: "Will it receive updates?",
                content:
                  "The product architecture is designed to support future component updates.",
              },
            ]}
          />
        );

      case "ActivityFeed":
        return (
          <ActivityFeed
            items={[
              {
                id: "1",
                title: "New component added",
                description: "CommandMenu is now available.",
                timestamp: "2 minutes ago",
                icon: <Layers3 size={16} />,
              },
              {
                id: "2",
                title: "Build completed",
                description: "Production build passed successfully.",
                timestamp: "15 minutes ago",
                icon: <Check size={16} />,
              },
              {
                id: "3",
                title: "Project updated",
                description: "Showcase improvements committed.",
                timestamp: "1 hour ago",
                icon: <Zap size={16} />,
              },
            ]}
          />
        );

      case "Alert":
        return (
          <div className="grid gap-3 md:grid-cols-2">
            <Alert variant="info" title="Information">
              Your changes are ready to review.
            </Alert>
            <Alert variant="success" title="Success">
              Everything completed successfully.
            </Alert>
            <Alert variant="warning" title="Warning">
              This action should be reviewed before launch.
            </Alert>
            <Alert variant="error" title="Error">
              Something needs your attention.
            </Alert>
          </div>
        );

      case "Progress":
        return (
          <div className="max-w-xl space-y-4">
            <Progress value={progress} max={100} showLabel />
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setProgress((value) => Math.max(0, value - 10))}
              >
                −10
              </Button>
              <Button
                size="sm"
                onClick={() => setProgress((value) => Math.min(100, value + 10))}
              >
                +10
              </Button>
            </div>
          </div>
        );

      case "StatCard":
        return (
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard
              title="Components"
              value={40}
              description="Production-ready building blocks"
              trend={12}
              trendLabel="vs last build"
              icon={<Layers3 size={18} />}
            />
            <StatCard
              title="Downloads"
              value="2,481"
              description="This month"
              trend={24}
              trendLabel="growth"
              icon={<Download size={18} />}
            />
            <StatCard
              title="Status"
              value="Live"
              description="All systems operational"
              trend={1}
              trendLabel="stable"
              icon={<Activity size={18} />}
            />
          </div>
        );

      case "Timeline":
        return (
          <Timeline
            items={[
              {
                id: "1",
                title: "Project initialized",
                description: "Next.js application created.",
                date: "Step 1",
                status: "success",
                icon: <Check size={14} />,
              },
              {
                id: "2",
                title: "Component library built",
                description: "40 reusable components implemented.",
                date: "Step 2",
                status: "success",
                icon: <Layers3 size={14} />,
              },
              {
                id: "3",
                title: "Storefront integration",
                description: "Checkout and licensing are next.",
                date: "Step 3",
                status: "warning",
                icon: <Zap size={14} />,
              },
            ]}
          />
        );

      case "Toast":
        return (
          <div className="flex items-center gap-4">
            <Button onClick={showToast}>Show Toast</Button>
            <span className="text-sm text-zinc-400">
              {toastOpen ? "Toast is visible" : "Toast is hidden"}
            </span>
            {toastOpen && (
              <Toast
                title="Success"
                message="Your action was completed."
                variant="success"
                onClose={() => setToastOpen(false)}
              />
            )}
          </div>
        );

      case "Avatar":
        return (
          <div className="flex items-center gap-5">
            <Avatar fallback="BD" size="sm" alt="Biznez" />
            <Avatar fallback="UI" size="md" alt="UI Kit" />
            <Avatar fallback="PRO" size="lg" alt="Pro UI" />
            <Avatar fallback="VIP" size="xl" alt="Premium" />
          </div>
        );

      case "CodeBlock":
        return (
          <CodeBlock
            language="tsx"
            filename="Button.tsx"
            code={`import { Button } from "@/components/ui";

export function Example() {
  return <Button>Launch</Button>;
}`}
          />
        );

      case "CopyButton":
        return (
          <div className="flex flex-wrap items-center gap-3">
            <code className="rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm text-zinc-300">
              npm install pro-ui-kit
            </code>
            <CopyButton
              value="npm install pro-ui-kit"
              label="Copy command"
            />
          </div>
        );

      case "EmptyState":
        return (
          <EmptyState
            title="No projects yet"
            description="Create your first project to start building."
            icon={<Folder size={28} />}
            action={
              <Button onClick={() => setSelectedAction("Create project clicked")}>
                Create project
              </Button>
            }
          />
        );

      case "FileUpload":
        return (
          <div className="space-y-4">
            <FileUpload
              accept=".png,.jpg,.jpeg,.svg"
              multiple
              maxSize={5 * 1024 * 1024}
              onFilesChange={setUploadedFiles}
            />
            <div className="text-sm text-zinc-400">
              {uploadedFiles.length === 0
                ? "No files selected."
                : `${uploadedFiles.length} file(s) selected: ${uploadedFiles
                    .map((file) => file.name)
                    .join(", ")}`}
            </div>
          </div>
        );

      case "FilterBar":
        return (
          <div className="space-y-4">
            <FilterBar
              options={[
                { id: "active", label: "Active", value: "active" },
                { id: "popular", label: "Popular", value: "popular" },
              ]}
              value={filterValue}
              onChange={setFilterValue}
              onClear={() => setFilterValue("")}
            />
            <p className="text-sm text-zinc-400">
              Current filter: {filterValue}
            </p>
          </div>
        );

      case "Kbd":
        return (
          <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400">
            <span>Press</span>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
            <span>to open command search.</span>
          </div>
        );

      case "SearchInput":
        return (
          <div className="max-w-xl space-y-4">
            <SearchInput
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onClear={() => setSearch("")}
              aria-label="Search all 40 components"
              placeholder="Search all 40 components..."
            />
            <p className="text-sm text-zinc-400">
              Showing {filteredComponents.length} of {allComponents.length} components.
            </p>
          </div>
        );

      case "CommandMenu":
        return (
          <div className="space-y-4">
            <Button onClick={() => setCommandOpen(true)}>
              <Search className="mr-2 h-4 w-4" />
              Open Command Menu
            </Button>

            <CommandMenu
              open={commandOpen}
              onClose={() => setCommandOpen(false)}
              placeholder="Search actions..."
              items={[
                {
                  id: "components",
                  label: "Browse components",
                  description: "Jump to the component showcase.",
                  icon: <Layers3 size={16} />,
                  onSelect: () => {
                    setCommandOpen(false);
                    scrollToComponent("Card");
                  },
                },
                {
                  id: "pricing",
                  label: "View pricing",
                  description: "See the Pro UI Kit price.",
                  icon: <Star size={16} />,
                  onSelect: () => {
                    setCommandOpen(false);
                    document
                      .getElementById("pricing")
                      ?.scrollIntoView({ behavior: "smooth" });
                  },
                },
                {
                  id: "settings",
                  label: "Settings",
                  description: "Open the settings panel.",
                  icon: <Settings size={16} />,
                  onSelect: () => {
                    setCommandOpen(false);
                    setSheetOpen(true);
                  },
                },
              ]}
            />
          </div>
        );

      case "PricingCard":
        return (
          <PricingCard
            title="Pro UI Kit"
            price="$49"
            period="one-time"
            description="The complete production-ready React component library."
            popular
            features={[
              "40 production-ready components",
              "TypeScript source",
              "Tailwind CSS",
              "Commercial-ready architecture",
              "Lifetime product access",
            ]}
            button={
              <Button
                className="w-full"
                onClick={() => setSelectedAction("Checkout demo clicked")}
              >
                Get Pro UI Kit
              </Button>
            }
          />
        );

      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-[#070707] text-white">\n      <a href="#components" className="sr-only z-[100] rounded-lg bg-white px-4 py-3 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to components</a>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#070707]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <a
            href="#top"
            className="flex items-center gap-3 font-black tracking-tight"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black">
              <Code2 size={18} />
            </div>
            <span>PRO UI KIT</span>
          </a>

          <nav aria-label="Primary navigation" className="hidden items-center gap-6 text-sm text-zinc-400 md:flex">
            <a href="#components" className="transition hover:text-white">
              Components
            </a>
            <a href="#pricing" className="transition hover:text-white">
              Pricing
            </a>
          </nav>

          <Button
            size="sm"
            onClick={() =>
              document
                .getElementById("pricing")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Get Pro UI Kit
          </Button>
        </div>
      </header>

      <div id="top" className="mx-auto max-w-7xl px-4 sm:px-6">
        <section className="relative py-20 sm:py-28">
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-red-600/10 blur-3xl" />
          </div>

          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="danger">40 production-ready components</Badge>

            <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">
              Build faster.
              <br />
              <span className="text-zinc-500">Ship cleaner.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
              A reusable React + TypeScript UI system designed for modern
              production applications. Every component below is rendered live.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button
                size="lg"
                onClick={() =>
                  document
                    .getElementById("components")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Explore components
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() =>
                  document
                    .getElementById("pricing")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                View pricing
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-2 text-xs text-zinc-500">
              <Badge variant="info">React</Badge>
              <Badge variant="info">TypeScript</Badge>
              <Badge variant="info">Tailwind CSS</Badge>
              <Badge variant="info">Next.js</Badge>
            </div>
          </div>
        </section>

        <section id="components" className="scroll-mt-24 pb-24">
          <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
            <aside className="lg:sticky lg:top-24 lg:h-fit">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold">
                  <Layers3 size={16} />
                  Components
                </div>

                <div className="space-y-5">
                  {componentGroups.map((group) => (
                    <div key={group.name}>
                      <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
                        {group.name}
                      </div>

                      <div className="space-y-1">
                        {group.items.map((item) => {
                          const visible = filteredComponents.includes(item);

                          if (!visible) return null;

                          return (
                            <button
                              key={item}
                              type="button"
                              onClick={() => scrollToComponent(item)}
                              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs text-zinc-400 transition hover:bg-white/5 hover:text-white"
                            >
                              <span>{item}</span>
                              <ChevronRight size={13} />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            <div className="min-w-0 space-y-6">
              <div className="sticky top-[73px] z-30 rounded-2xl border border-white/10 bg-[#070707]/95 p-4 backdrop-blur-xl">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <SearchInput
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    onClear={() => setSearch("")}
                    placeholder="Filter components..."
                    className="w-full sm:max-w-md"
                  />

                  <p role="status" aria-live="polite" aria-atomic="true" className="text-xs text-zinc-500">
                    Showing {filteredComponents.length} of {allComponents.length} components
                  </p>
                </div>
              </div>

              {filteredComponents.length === 0 ? (
                <EmptyState
                  title="No components found"
                  description={`Nothing matches "${search}".`}
                  icon={<Search size={28} />}
                  action={
                    <Button onClick={() => setSearch("")}>
                      Clear search
                    </Button>
                  }
                />
              ) : (
                filteredComponents.map((name) => {
                  const descriptions: Record<string, string> = {
                    Badge: "Compact status and category indicators.",
                    Button: "Primary interaction control with multiple variants.",
                    Card: "Reusable content surfaces and layout primitives.",
                    Input: "Single-line text input with validation support.",
                    Separator: "Visual separation for related content.",
                    Skeleton: "Loading placeholder for asynchronous content.",
                    Spinner: "Compact loading indicator.",
                    Checkbox: "Boolean selection control.",
                    RadioGroup: "Single-choice selection control.",
                    Select: "Native select control styled for the kit.",
                    Slider: "Interactive numeric range control.",
                    Switch: "Compact boolean toggle.",
                    Textarea: "Multi-line text input.",
                    Breadcrumb: "Hierarchical navigation trail.",
                    Navbar: "Application navigation header.",
                    Sidebar: "Application navigation sidebar.",
                    Tabs: "Switchable content panels.",
                    Stepper: "Multi-step progress/navigation indicator.",
                    Dialog: "Modal confirmation and interaction surface.",
                    DropdownMenu: "Contextual action menu.",
                    Popover: "Anchored floating content.",
                    Sheet: "Slide-in panel for secondary workflows.",
                    Tooltip: "Contextual information on hover/focus.",
                    Accordion: "Expandable content sections.",
                    ActivityFeed: "Chronological activity stream.",
                    Alert: "Prominent contextual feedback.",
                    Progress: "Visual progress indicator.",
                    StatCard: "Dashboard metric presentation.",
                    Timeline: "Chronological event presentation.",
                    Toast: "Temporary success and feedback notification.",
                    Avatar: "User or entity identity representation.",
                    CodeBlock: "Formatted source-code presentation.",
                    CopyButton: "One-click clipboard action.",
                    EmptyState: "Empty or unavailable content state.",
                    FileUpload: "Local file selection control.",
                    FilterBar: "Interactive filtering controls.",
                    Kbd: "Keyboard shortcut presentation.",
                    SearchInput: "Search field with clear behavior.",
                    CommandMenu: "Keyboard-friendly command launcher.",
                  };

                  return (
                    <DemoShell
                      key={name}
                      name={name}
                      description={descriptions[name]}
                    >
                      {demoFor(name)}
                    </DemoShell>
                  );
                })
              )}
            </div>
          </div>
        </section>

        <section id="pricing" className="scroll-mt-24 border-t border-white/10 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="success">One-time purchase</Badge>
            <h2 className="mt-5 text-3xl font-black sm:text-5xl">
              Ship your next interface faster.
            </h2>
            <p className="mt-4 text-zinc-400">
              Get the complete Pro UI Kit source package for a one-time $49
              purchase.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-md">
            <PricingCard
              title="Pro UI Kit"
              price="$49"
              period="one-time"
              description="Everything you need to build polished React interfaces."
              popular
              features={[
                "40 production-ready components",
                "TypeScript source",
                "Tailwind CSS",
                "Reusable component architecture",
                "Lifetime product access",
              ]}
              button={
                <Button
                  className="w-full"
                  onClick={() => setSelectedAction("Pricing checkout clicked")}
                >
                  Get Pro UI Kit
                </Button>
              }
            />
          </div>

          <p className="mt-5 text-center text-sm text-zinc-600">
            Checkout integration will be connected after the showcase is fully
            verified.
          </p>
        </section>
      </div>

      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>PRO UI KIT</div>
          <div>40 components · React · TypeScript · Tailwind</div>
        </div>
      </footer>

      <div className="fixed bottom-4 right-4 z-50 flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setSheetOpen(true)}
          className="hidden sm:flex"
        >
          <Menu className="mr-2 h-4 w-4" />
          Sheet
        </Button>

        <Button
          size="sm"
          onClick={showToast}
          className="hidden sm:flex"
        >
          <Bell className="mr-2 h-4 w-4" />
          Toast
        </Button>
      </div>
    </main>
  );
}
