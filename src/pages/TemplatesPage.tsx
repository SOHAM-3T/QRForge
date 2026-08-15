import { TemplateGallery } from '@/components/templates/TemplateGallery';

export function TemplatesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Templates</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Choose a starting point for your QR code design.
        </p>
      </div>
      <div className="mt-12">
        <TemplateGallery />
      </div>
    </div>
  );
}
