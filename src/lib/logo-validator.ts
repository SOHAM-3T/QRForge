import type { QRLogoConfig, QRDesignConfig, ValidationResult } from '@/types/qr';

/**
 * Validate the logo configuration against the QR design to ensure scanability.
 */
export function validateLogo(
  logo: QRLogoConfig | null,
  design: QRDesignConfig,
): ValidationResult[] {
  const results: ValidationResult[] = [];

  if (!logo || !logo.src) return results;

  // Check logo area percentage
  const qrArea = design.width * design.height;
  const logoArea = logo.size * logo.size;
  const areaPercent = (logoArea / qrArea) * 100;

  if (areaPercent > 30) {
    results.push({
      id: 'logo-too-large-critical',
      severity: 'error',
      message: `Logo covers ${areaPercent.toFixed(0)}% of the QR code. Maximum recommended is 30%. The QR code may not scan.`,
    });
  } else if (areaPercent > 20) {
    results.push({
      id: 'logo-too-large-warning',
      severity: 'warning',
      message: `Logo covers ${areaPercent.toFixed(0)}% of the QR code. Consider keeping it under 20% for best results.`,
    });
  }

  // Check error correction level
  if (design.errorCorrectionLevel !== 'H' && areaPercent > 10) {
    results.push({
      id: 'error-correction-recommendation',
      severity: 'warning',
      message: 'Using a logo with error correction level lower than "H" may reduce scanability. Consider switching to "High" error correction.',
    });
  }

  // Check logo opacity
  if (logo.opacity < 0.5) {
    results.push({
      id: 'logo-low-opacity',
      severity: 'info',
      message: 'Logo opacity is very low. It may not be visible in the final QR code.',
    });
  }

  return results;
}

/**
 * Validate general QR design configuration.
 */
export function validateDesign(design: QRDesignConfig): ValidationResult[] {
  const results: ValidationResult[] = [];

  // Check minimum size
  if (design.width < 100 || design.height < 100) {
    results.push({
      id: 'qr-too-small',
      severity: 'warning',
      message: 'QR code is smaller than 100×100px. It may be difficult to scan.',
    });
  }

  // Check margin (quiet zone)
  if (design.margin < 4) {
    results.push({
      id: 'quiet-zone-small',
      severity: 'warning',
      message: 'Quiet zone (margin) is very small. QR scanners may have difficulty detecting the code.',
    });
  }

  // Check contrast between foreground and background
  const fgColor = design.dotColor.color;
  const bgColor = design.backgroundColor.color;
  if (fgColor && bgColor) {
    const contrast = getContrastRatio(fgColor, bgColor);
    if (contrast < 3) {
      results.push({
        id: 'low-contrast',
        severity: 'error',
        message: `Low contrast ratio (${contrast.toFixed(1)}:1) between QR modules and background. Minimum 3:1 is recommended for reliable scanning.`,
      });
    } else if (contrast < 4.5) {
      results.push({
        id: 'moderate-contrast',
        severity: 'warning',
        message: `Moderate contrast ratio (${contrast.toFixed(1)}:1). A ratio of 4.5:1 or higher is ideal.`,
      });
    }
  }

  return results;
}

/**
 * Parse a hex color to RGB values.
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return null;
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

/**
 * Get relative luminance of a color.
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two hex colors.
 */
function getContrastRatio(hex1: string, hex2: string): number {
  const c1 = hexToRgb(hex1);
  const c2 = hexToRgb(hex2);
  if (!c1 || !c2) return 21; // Assume good contrast if colors can't be parsed
  const l1 = getLuminance(c1.r, c1.g, c1.b);
  const l2 = getLuminance(c2.r, c2.g, c2.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}
