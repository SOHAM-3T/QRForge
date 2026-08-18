import QRCodeStyling from 'qr-code-styling';
import type {
  QRDesignConfig,
  QRLogoConfig,
  ColorConfig,
  ExportFormat,
} from '@/types/qr';

type QRCodeStylingOptions = ConstructorParameters<typeof QRCodeStyling>[0];

/**
 * Convert our ColorConfig into qr-code-styling color/gradient options.
 */
function mapColor(config: ColorConfig): { color?: string; gradient?: { type: 'linear' | 'radial'; rotation: number; colorStops: Array<{ offset: number; color: string }> } } {
  if (config.gradient && config.gradient.colorStops.length >= 2) {
    return {
      gradient: {
        type: config.gradient.type,
        rotation: config.gradient.rotation,
        colorStops: config.gradient.colorStops,
      },
    };
  }
  return { color: config.color };
}

/**
 * Build qr-code-styling options from our design config, data, and optional logo.
 */
export function buildQROptions(
  data: string,
  design: QRDesignConfig,
  logo: QRLogoConfig | null,
): QRCodeStylingOptions {
  const options: QRCodeStylingOptions = {
    width: design.width,
    height: design.height,
    type: 'svg',
    data,
    margin: design.margin,
    qrOptions: {
      errorCorrectionLevel: design.errorCorrectionLevel,
    },
    dotsOptions: {
      type: design.dotType,
      ...mapColor(design.dotColor),
    },
    cornersSquareOptions: {
      type: design.cornerSquareType,
      ...mapColor(design.cornerSquareColor),
    },
    cornersDotOptions: {
      type: design.cornerDotType,
      ...mapColor(design.cornerDotColor),
    },
    backgroundOptions: {
      ...mapColor(design.backgroundColor),
    },
  };

  if (logo && logo.src) {
    options.image = logo.src;
    options.imageOptions = {
      hideBackgroundDots: logo.hideBackgroundDots,
      imageSize: logo.size,
      margin: logo.padding,
      crossOrigin: 'anonymous',
    };
  }

  return options;
}

/**
 * Create a new QRCodeStyling instance.
 */
export function createQRInstance(
  data: string,
  design: QRDesignConfig,
  logo: QRLogoConfig | null,
): QRCodeStyling {
  const options = buildQROptions(data, design, logo);
  return new QRCodeStyling(options);
}

/**
 * Map our ExportFormat to the extension string expected by qr-code-styling.
 */
function mapFormat(format: ExportFormat): 'png' | 'jpeg' | 'webp' | 'svg' {
  return format;
}

/**
 * Export a QR code as a downloadable file.
 */
export async function exportQR(
  qrInstance: QRCodeStyling,
  format: ExportFormat,
  filename: string,
): Promise<void> {
  await qrInstance.download({
    name: filename,
    extension: mapFormat(format),
  });
}

/**
 * Get raw blob data for a QR code in a specified format.
 */
export async function getQRBlob(
  qrInstance: QRCodeStyling,
  format: ExportFormat,
): Promise<Blob | undefined> {
  const blob = await qrInstance.getRawData(mapFormat(format));
  if (blob instanceof Blob) return blob;
  return undefined;
}
