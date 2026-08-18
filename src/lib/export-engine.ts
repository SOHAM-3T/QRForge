import QRCodeStyling from 'qr-code-styling';
import { buildQROptions } from '@/lib/qr-engine';
import type { QRDesignConfig, QRLogoConfig, ExportFormat } from '@/types/qr';

/**
 * Generate a QR code and export it as a downloadable file.
 */
export async function exportQRCode(options: {
  data: string;
  design: QRDesignConfig;
  logo: QRLogoConfig | null;
  format: ExportFormat;
  exportWidth: number;
  exportHeight: number;
  transparentBackground: boolean;
  filename: string;
}): Promise<void> {
  const { data, design, logo, format, exportWidth, exportHeight, transparentBackground, filename } = options;

  // Create a high-res version of the design config
  const exportDesign: QRDesignConfig = {
    ...design,
    width: exportWidth,
    height: exportHeight,
  };

  // Handle transparent background
  if (transparentBackground && format !== 'jpeg') {
    exportDesign.backgroundColor = { color: 'transparent' };
  }

  // Scale logo proportionally if present
  let exportLogo = logo;
  if (logo && logo.src) {
    const scale = exportWidth / design.width;
    exportLogo = {
      ...logo,
      // size is a coefficient (0-1), it is resolution-independent
      size: logo.size,
      // padding is in pixels, so it should be scaled
      padding: Math.round(logo.padding * scale),
    };
  }

  const qrOptions = buildQROptions(data, exportDesign, exportLogo) as NonNullable<ConstructorParameters<typeof QRCodeStyling>[0]>;

  // For canvas-based formats, use canvas type
  if (format !== 'svg') {
    qrOptions.type = 'canvas';
  }

  const qr = new QRCodeStyling(qrOptions);

  await qr.download({
    name: filename,
    extension: format,
  });
}

/**
 * Generate a filename with timestamp.
 */
export function generateFilename(pattern: string = 'qrforge-{timestamp}'): string {
  const now = new Date();
  const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, 19);
  return pattern.replace('{timestamp}', timestamp);
}

/**
 * Get a blob URL for preview purposes.
 */
export async function getQRPreviewBlob(options: {
  data: string;
  design: QRDesignConfig;
  logo: QRLogoConfig | null;
  format?: ExportFormat;
}): Promise<string | null> {
  const { data, design, logo, format = 'png' } = options;

  const qrOptions = buildQROptions(data, design, logo) as NonNullable<ConstructorParameters<typeof QRCodeStyling>[0]>;
  if (format !== 'svg') {
    qrOptions.type = 'canvas';
  }

  const qr = new QRCodeStyling(qrOptions);
  const blob = await qr.getRawData(format);

  if (blob instanceof Blob) {
    return URL.createObjectURL(blob);
  }

  return null;
}
