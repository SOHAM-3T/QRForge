import { Link } from 'react-router-dom';
import {
  QrCode,
  Palette,
  ImagePlus,
  Eye,
  Download,
  Shield,
  Layers,
  Zap,
  ArrowRight,
  Sparkles,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const FEATURES = [
  {
    icon: Layers,
    title: '12 Content Types',
    description: 'URL, text, email, phone, Wi-Fi, vCard, UPI, events, social profiles and more.',
  },
  {
    icon: Palette,
    title: 'Visual Designer',
    description: 'Customize patterns, eye styles, colors, gradients — make your QR code unique.',
  },
  {
    icon: ImagePlus,
    title: 'Logo Support',
    description: 'Upload your brand logo and the QR adjusts error correction automatically.',
  },
  {
    icon: Eye,
    title: 'Live Preview',
    description: 'Every change is reflected instantly in real-time — no waiting for regeneration.',
  },
  {
    icon: Download,
    title: 'High-Res Export',
    description: 'Export as PNG, SVG, JPEG or WebP in up to 4096×4096 resolution.',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Everything runs in your browser. No data ever leaves your device.',
  },
];

const WORKFLOW_STEPS = [
  'Choose your content type',
  'Enter your data',
  'Customize the design',
  'Add your logo (optional)',
  'Export in any format',
];

export function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 left-0 h-[400px] w-[400px] rounded-full bg-primary/3 blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-32">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="animate-fade-in mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
            <Sparkles className="size-3.5" />
            Privacy-first • Fully client-side
          </div>

          {/* Headline */}
          <h1 className="animate-fade-in max-w-4xl text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Design QR Codes That
            <span className="relative ml-3 inline-block">
              <span className="relative z-10 bg-gradient-to-r from-primary to-[oklch(0.72_0.16_300)] bg-clip-text text-transparent">
                Actually Look Good
              </span>
            </span>
          </h1>

          {/* Subheadline */}
          <p className="animate-slide-up mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Create, customize, brand, and export beautiful QR codes in seconds.
            No sign-up required. No data leaves your browser.
          </p>

          {/* CTAs */}
          <div className="animate-slide-up mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Link to="/create">
              <Button size="lg" className="gradient-primary border-0 px-8 text-white shadow-lg hover:opacity-90">
                <QrCode className="mr-2 size-4" />
                Create QR Code
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
            <Link to="/templates">
              <Button variant="outline" size="lg" className="px-8">
                Explore Templates
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero QR Preview */}
        <div className="animate-fade-in-scale relative mx-auto mt-16 max-w-sm">
          <div className="glow-primary-strong rounded-2xl border border-border/50 bg-card p-6">
            <div className="flex items-center justify-center">
              <div className="relative flex size-48 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5">
                <QrCode className="size-32 text-primary/30" strokeWidth={1} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex size-12 items-center justify-center rounded-xl gradient-primary shadow-lg">
                    <Zap className="size-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Your beautifully designed QR code appears here
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need
          </h2>
          <p className="mt-3 text-muted-foreground">
            A complete QR code design studio — right in your browser.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border/50 bg-card/50 p-6 transition-all duration-300 hover:border-primary/20 hover:bg-card hover:shadow-lg"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="mb-4 inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <feature.icon className="size-5" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-foreground">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Workflow Section */}
      <section className="relative border-t border-border/30 bg-card/20 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Simple 5-step workflow
            </h2>
            <p className="mt-3 text-muted-foreground">
              From idea to export in under a minute.
            </p>
          </div>

          <div className="mx-auto max-w-lg space-y-4">
            {WORKFLOW_STEPS.map((step, i) => (
              <div
                key={step}
                className="flex items-center gap-4 rounded-xl border border-border/50 bg-card/60 px-5 py-4 transition-all hover:border-primary/20"
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full gradient-primary text-sm font-bold text-white">
                  {i + 1}
                </div>
                <span className="text-sm font-medium text-foreground">{step}</span>
                <Check className="ml-auto size-4 text-primary/40" />
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/create">
              <Button size="lg" className="gradient-primary border-0 px-8 text-white hover:opacity-90">
                Get Started
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
