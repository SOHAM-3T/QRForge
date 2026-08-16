import {
  Shield,
  Download,
  Palette,
  Layers,
  Eye,
  ImagePlus,
  Zap,
  Lock,
  Globe,
  Server,
} from 'lucide-react';

const FEATURES_DETAIL = [
  {
    icon: Layers,
    title: '12 Content Types',
    description:
      'URL, plain text, email, phone, SMS, Wi-Fi, vCard contact, geolocation, UPI payment, calendar event, social profiles, and custom data.',
  },
  {
    icon: Palette,
    title: 'Full Visual Designer',
    description:
      'Customize dot patterns (square, dots, rounded, classy), eye frame and center dot styles, foreground and background colors.',
  },
  {
    icon: ImagePlus,
    title: 'Logo Embedding',
    description:
      'Upload your brand logo with automatic error correction adjustment, configurable size, padding, and background dot removal.',
  },
  {
    icon: Eye,
    title: 'Live Preview',
    description:
      'Every change updates the QR code in real time with debounced rendering for smooth interactions.',
  },
  {
    icon: Download,
    title: 'Multi-Format Export',
    description:
      'Export in PNG, SVG, JPEG, or WebP at resolutions up to 4096×4096 with optional transparent backgrounds.',
  },
  {
    icon: Zap,
    title: 'Undo / Redo',
    description:
      'Full history with Ctrl+Z / Ctrl+Y support. Up to 50 undo steps with automatic state autosave to localStorage.',
  },
];

export function AboutPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 right-1/4 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* Hero */}
      <section className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
        <h1 className="animate-fade-in text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          About QR<span className="text-primary">Forge</span>
        </h1>
        <p className="animate-slide-up mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          QRForge is a privacy-first, fully client-side QR code design studio.
          We believe you shouldn't have to sacrifice privacy or pay subscription
          fees just to create a beautiful QR code.
        </p>
      </section>

      {/* Privacy Section */}
      <section className="relative border-t border-border/30 bg-card/20 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="flex items-start gap-4 mb-8">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
              <Shield className="size-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Privacy First</h2>
              <p className="mt-1 text-muted-foreground">
                Your data never leaves your browser. Period.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: Lock,
                title: 'No Server Processing',
                text: 'All QR generation, styling, and export happens entirely in your browser using JavaScript.',
              },
              {
                icon: Globe,
                title: 'No Tracking',
                text: 'We don\'t track QR codes you create, the data you encode, or usage analytics.',
              },
              {
                icon: Server,
                title: 'No Cloud Storage',
                text: 'Your designs are saved only in your browser\'s localStorage. Clear it anytime.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border/50 bg-card/50 p-5 transition-all hover:border-emerald-500/20 hover:shadow-sm"
              >
                <item.icon className="mb-3 size-5 text-emerald-500" />
                <h3 className="mb-1 text-sm font-semibold text-foreground">{item.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Detail */}
      <section className="relative py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="mb-10 text-2xl font-bold text-foreground">Feature Overview</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {FEATURES_DETAIL.map((feature) => (
              <div
                key={feature.title}
                className="group flex gap-4 rounded-xl border border-border/50 bg-card/50 p-5 transition-all hover:border-primary/20 hover:bg-card"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <feature.icon className="size-5" />
                </div>
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="relative border-t border-border/30 bg-card/20 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="mb-6 text-2xl font-bold text-foreground">Built With</h2>
          <div className="flex flex-wrap gap-3">
            {[
              'React 19',
              'TypeScript',
              'Vite',
              'Tailwind CSS v4',
              'shadcn/ui',
              'qr-code-styling',
              'Zustand',
              'Lucide Icons',
              'react-colorful',
            ].map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border/50 bg-card px-4 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/30 hover:bg-primary/5"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Export Formats */}
      <section className="relative py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="mb-6 text-2xl font-bold text-foreground">Supported Export Formats</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { format: 'PNG', desc: 'Universal bitmap, best for web and digital' },
              { format: 'SVG', desc: 'Vector format, infinite scalability for print' },
              { format: 'JPEG', desc: 'Compact file size for sharing' },
              { format: 'WebP', desc: 'Modern format, smaller than PNG' },
            ].map((f) => (
              <div
                key={f.format}
                className="rounded-xl border border-border/50 bg-card/50 p-4 text-center transition-all hover:border-primary/20"
              >
                <p className="text-xl font-bold text-primary">{f.format}</p>
                <p className="mt-1 text-xs text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
