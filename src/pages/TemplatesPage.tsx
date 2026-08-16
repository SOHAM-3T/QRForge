import { Sparkles } from 'lucide-react';
import { TemplateGallery } from '@/components/templates/TemplateGallery';

export function TemplatesPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/3 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
            <Sparkles className="size-3.5" />
            Pre-built starting points
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            QR Code Templates
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose a beautifully designed template as your starting point, then customize
            every detail in the designer.
          </p>
        </div>

        {/* Template Gallery */}
        <TemplateGallery />
      </div>
    </div>
  );
}
