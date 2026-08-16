import { useNavigate } from 'react-router-dom';
import QRCodeStyling from 'qr-code-styling';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useQRStore } from '@/store/qr-store';
import { buildQROptions } from '@/lib/qr-engine';
import type { QRTemplate } from '@/types/qr';

interface TemplateCardProps {
  template: QRTemplate;
}

export function TemplateCard({ template }: TemplateCardProps) {
  const { setDesign, setLogo, setBranding } = useQRStore();
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const [qrCode, setQrCode] = useState<QRCodeStyling | null>(null);

  useEffect(() => {
    // Generate a static preview for the template using placeholder data
    const options = buildQROptions(
      'https://qrforge.dev',
      { ...template.design, width: 200, height: 200, margin: 10 },
      template.logo
    ) as NonNullable<ConstructorParameters<typeof QRCodeStyling>[0]>;
    options.type = 'svg';

    if (!qrCode) {
      const qr = new QRCodeStyling(options);
      setQrCode(qr);
      if (ref.current) {
        ref.current.innerHTML = '';
        qr.append(ref.current);
      }
    } else {
      qrCode.update(options);
    }
  }, [template]);

  const handleUseTemplate = () => {
    setDesign(template.design);
    setLogo(template.logo);
    setBranding(template.branding);
    navigate('/create');
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border/50 bg-card transition-all hover:border-primary/30 hover:shadow-md">
      {/* Preview Area */}
      <div className="flex aspect-square items-center justify-center bg-muted/30 p-6 qr-preview-bg">
        <div 
          ref={ref} 
          className="flex h-full w-full items-center justify-center transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Details Area */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-semibold text-foreground">{template.name}</h3>
          {template.isBuiltIn && (
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-medium text-primary">
              Built-in
            </span>
          )}
        </div>
        <p className="mb-4 text-xs text-muted-foreground line-clamp-2">
          {template.description}
        </p>
        <div className="mt-auto">
          <Button 
            className="w-full transition-all group-hover:bg-primary group-hover:text-primary-foreground" 
            variant="outline"
            onClick={handleUseTemplate}
          >
            Use Template
          </Button>
        </div>
      </div>
    </div>
  );
}
