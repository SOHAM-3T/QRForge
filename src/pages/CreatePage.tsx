import { useQRStore } from '@/store/qr-store';
import { ContentTypeSelector, ContentForm } from '@/components/content';
import { QRPreview } from '@/components/qr/QRPreview';
import { DesignPanel } from '@/components/designer/DesignPanel';
import { ExportPanel } from '@/components/export/ExportPanel';
import { ValidationBadge } from '@/components/qr/ValidationBadge';

export function CreatePage() {
  const { contentType, setContentType, content, updateContent } = useQRStore();

  return (
    <div className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
        {/* Left Column: Content Configuration */}
        <div className="flex flex-col gap-6 lg:col-span-4 xl:col-span-3">
          <div className="rounded-xl border border-border/50 bg-card p-4 shadow-sm">
            <ContentTypeSelector selected={contentType} onSelect={setContentType} />
            <div className="mt-6 border-t border-border/50 pt-6">
              <ContentForm contentType={contentType} content={content} onChange={updateContent} />
            </div>
          </div>
        </div>

        {/* Center Column: Live Preview */}
        <div className="flex flex-col gap-6 lg:col-span-4 xl:col-span-6">
          <div className="sticky top-20 rounded-xl border border-border/50 bg-card p-4 shadow-sm lg:p-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Preview</h2>
              <ValidationBadge />
            </div>
            <QRPreview />
          </div>
        </div>

        {/* Right Column: Design Controls */}
        <div className="flex flex-col gap-6 lg:col-span-4 xl:col-span-3">
          <div className="rounded-xl border border-border/50 bg-card p-4 shadow-sm">
            <DesignPanel />
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-4 shadow-sm mt-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Export</h2>
            <ExportPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
