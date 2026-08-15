import type { QRTemplate, QRDesignConfig, QRBrandingConfig } from '@/types/qr';
import { DEFAULT_DESIGN, DEFAULT_BRANDING } from '@/lib/constants';

function template(
  id: string,
  name: string,
  description: string,
  designOverrides: Partial<QRDesignConfig>,
  brandingOverrides?: Partial<QRBrandingConfig>,
): QRTemplate {
  return {
    id,
    name,
    description,
    design: { ...DEFAULT_DESIGN, ...designOverrides },
    logo: null,
    branding: { ...DEFAULT_BRANDING, ...brandingOverrides },
    isBuiltIn: true,
  };
}

export const BUILT_IN_TEMPLATES: QRTemplate[] = [
  template(
    'classic',
    'Classic',
    'Simple black and white QR code — clean and universally scannable.',
    {
      dotType: 'square',
      dotColor: { color: '#000000' },
      cornerSquareType: 'square',
      cornerSquareColor: { color: '#000000' },
      cornerDotType: 'square',
      cornerDotColor: { color: '#000000' },
      backgroundColor: { color: '#ffffff' },
    },
  ),
  template(
    'minimal',
    'Minimal',
    'Clean modern QR code with subtle rounded modules.',
    {
      dotType: 'rounded',
      dotColor: { color: '#1e1e2e' },
      cornerSquareType: 'extra-rounded',
      cornerSquareColor: { color: '#1e1e2e' },
      cornerDotType: 'dot',
      cornerDotColor: { color: '#1e1e2e' },
      backgroundColor: { color: '#f8f9fa' },
      margin: 16,
    },
  ),
  template(
    'gradient',
    'Gradient',
    'QR code using a vibrant indigo-to-violet gradient.',
    {
      dotType: 'classy-rounded',
      dotColor: {
        color: '#818cf8',
        gradient: {
          type: 'linear',
          rotation: Math.PI / 4,
          colorStops: [
            { offset: 0, color: '#818cf8' },
            { offset: 1, color: '#c084fc' },
          ],
        },
      },
      cornerSquareType: 'extra-rounded',
      cornerSquareColor: { color: '#6366f1' },
      cornerDotType: 'dot',
      cornerDotColor: { color: '#a855f7' },
      backgroundColor: { color: '#0f0a1e' },
    },
  ),
  template(
    'branded',
    'Branded',
    'QR code with central logo area and branding — perfect for businesses.',
    {
      dotType: 'extra-rounded',
      dotColor: { color: '#1a1a2e' },
      cornerSquareType: 'extra-rounded',
      cornerSquareColor: { color: '#16213e' },
      cornerDotType: 'dot',
      cornerDotColor: { color: '#0f3460' },
      backgroundColor: { color: '#ffffff' },
      errorCorrectionLevel: 'H',
      margin: 20,
    },
    {
      frameStyle: 'modern',
      labelText: 'SCAN ME',
      labelFontSize: 12,
      labelFontWeight: 700,
      labelColor: '#1a1a2e',
    },
  ),
  template(
    'business',
    'Business',
    'Professional QR design with deep navy and gold accents.',
    {
      dotType: 'classy',
      dotColor: { color: '#0c1445' },
      cornerSquareType: 'square',
      cornerSquareColor: { color: '#0c1445' },
      cornerDotType: 'square',
      cornerDotColor: { color: '#c9a84c' },
      backgroundColor: { color: '#fafafa' },
      margin: 16,
    },
    {
      frameStyle: 'simple',
      labelText: '',
    },
  ),
  template(
    'social',
    'Social',
    'Modern QR design with bold colors optimized for social profiles.',
    {
      dotType: 'dots',
      dotColor: {
        color: '#e11d48',
        gradient: {
          type: 'radial',
          rotation: 0,
          colorStops: [
            { offset: 0, color: '#e11d48' },
            { offset: 1, color: '#f97316' },
          ],
        },
      },
      cornerSquareType: 'extra-rounded',
      cornerSquareColor: { color: '#e11d48' },
      cornerDotType: 'dot',
      cornerDotColor: { color: '#f97316' },
      backgroundColor: { color: '#fef2f2' },
      margin: 14,
    },
  ),
];
