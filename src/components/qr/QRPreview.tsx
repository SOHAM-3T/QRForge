import { useEffect, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { useQRStore } from '@/store/qr-store';
import { encodeQRContent } from '@/lib/qr-encoder';
import { buildQROptions } from '@/lib/qr-engine';


export function QRPreview() {
  const { contentType, content, design, logo } = useQRStore();
  const ref = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);
  const [isRendering, setIsRendering] = useState(true);

  useEffect(() => {
    // Small debounce for rendering
    const timer = setTimeout(() => {
      setIsRendering(true);
      const dataString = encodeQRContent(contentType, content);
      
      const options = buildQROptions(dataString, design, logo) as NonNullable<ConstructorParameters<typeof QRCodeStyling>[0]>;
      // For preview, SVG is better for sharp rendering in DOM
      options.type = 'svg';
      
      if (!qrCodeRef.current) {
        qrCodeRef.current = new QRCodeStyling(options);
        if (ref.current) {
          qrCodeRef.current.append(ref.current);
        }
      } else {
        qrCodeRef.current.update(options);
      }
      setIsRendering(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [contentType, content, design, logo]);

  return (
    <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl border border-border/50 bg-white qr-preview-bg">
      <div 
        ref={ref} 
        className="flex h-full w-full items-center justify-center p-4 transition-opacity duration-300"
        style={{ opacity: isRendering ? 0.5 : 1 }}
      />
      {isRendering && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-sm">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      )}
    </div>
  );
}
