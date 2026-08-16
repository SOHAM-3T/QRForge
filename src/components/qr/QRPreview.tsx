import { useEffect, useRef, useState, useCallback } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { useQRStore } from '@/store/qr-store';
import { encodeQRContent } from '@/lib/qr-encoder';
import { buildQROptions } from '@/lib/qr-engine';

export function QRPreview() {
  const { contentType, content, design, logo } = useQRStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);
  const [isRendering, setIsRendering] = useState(false);

  const render = useCallback(() => {
    setIsRendering(true);
    const dataString = encodeQRContent(contentType, content);

    const options = buildQROptions(dataString, design, logo) as NonNullable<
      ConstructorParameters<typeof QRCodeStyling>[0]
    >;
    options.type = 'svg';

    if (!qrCodeRef.current) {
      qrCodeRef.current = new QRCodeStyling(options);
      if (containerRef.current) {
        // Clear any previous content
        containerRef.current.innerHTML = '';
        qrCodeRef.current.append(containerRef.current);
      }
    } else {
      qrCodeRef.current.update(options);
    }

    // Small delay so the user sees the spinner on slow renders
    requestAnimationFrame(() => setIsRendering(false));
  }, [contentType, content, design, logo]);

  useEffect(() => {
    const timer = setTimeout(render, 200);
    return () => clearTimeout(timer);
  }, [render]);

  return (
    <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl border border-border/30 bg-muted/20">
      {/* Checkerboard grid for transparent backgrounds */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(45deg, var(--border) 25%, transparent 25%), linear-gradient(-45deg, var(--border) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, var(--border) 75%), linear-gradient(-45deg, transparent 75%, var(--border) 75%)',
          backgroundSize: '16px 16px',
          backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0',
        }}
      />

      {/* QR Code render target */}
      <div
        ref={containerRef}
        className="relative z-10 flex h-full w-full items-center justify-center p-4 [&_svg]:max-h-full [&_svg]:max-w-full"
      />

      {/* Loading overlay */}
      {isRendering && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/30 backdrop-blur-[2px]">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      )}
    </div>
  );
}
