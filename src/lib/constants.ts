import type {
  QRContentTypeId,
  QRContentTypeInfo,
  QRDesignConfig,
  QRLogoConfig,
  QRBrandingConfig,
} from '@/types/qr';

// ─── Content Type Definitions ─────────────────────────────────────

export const CONTENT_TYPES: QRContentTypeInfo[] = [
  { id: 'url', name: 'Website URL', icon: 'Globe', description: 'Link to any website or web page' },
  { id: 'text', name: 'Plain Text', icon: 'Type', description: 'Any text content' },
  { id: 'email', name: 'Email', icon: 'Mail', description: 'Email address with optional subject and body' },
  { id: 'phone', name: 'Phone', icon: 'Phone', description: 'Phone number for direct calling' },
  { id: 'sms', name: 'SMS', icon: 'MessageSquare', description: 'Text message with pre-filled content' },
  { id: 'wifi', name: 'Wi-Fi', icon: 'Wifi', description: 'Connect to a Wi-Fi network instantly' },
  { id: 'vcard', name: 'Contact', icon: 'Contact', description: 'Share contact information (vCard)' },
  { id: 'location', name: 'Location', icon: 'MapPin', description: 'Geographic coordinates on a map' },
  { id: 'upi', name: 'UPI Payment', icon: 'IndianRupee', description: 'UPI payment link with amount' },
  { id: 'event', name: 'Event', icon: 'Calendar', description: 'Calendar event with date and location' },
  { id: 'social', name: 'Social Profile', icon: 'Share2', description: 'Link to a social media profile' },
  { id: 'custom', name: 'Custom Data', icon: 'Code', description: 'Any custom data or payload' },
];

// ─── Default Design Config ────────────────────────────────────────

export const DEFAULT_DESIGN: QRDesignConfig = {
  dotType: 'square',
  dotColor: { color: '#ffffff' },
  cornerSquareType: 'square',
  cornerSquareColor: { color: '#ffffff' },
  cornerDotType: 'square',
  cornerDotColor: { color: '#ffffff' },
  backgroundColor: { color: '#0f0a1e' },
  width: 300,
  height: 300,
  margin: 10,
  errorCorrectionLevel: 'H',
};

// ─── Default Branding ─────────────────────────────────────────────

export const DEFAULT_BRANDING: QRBrandingConfig = {
  frameStyle: 'none',
  labelText: '',
  labelFont: 'Inter',
  labelFontSize: 14,
  labelFontWeight: 500,
  labelColor: '#ffffff',
};

// ─── Default Content By Type ──────────────────────────────────────

export function getDefaultContent(type: QRContentTypeId): Record<string, unknown> {
  switch (type) {
    case 'url':
      return { url: 'https://example.com' };
    case 'text':
      return { text: '' };
    case 'email':
      return { email: '', subject: '', body: '' };
    case 'phone':
      return { phone: '' };
    case 'sms':
      return { phone: '', message: '' };
    case 'wifi':
      return { ssid: '', password: '', encryption: 'WPA' as const, hidden: false };
    case 'vcard':
      return { firstName: '', lastName: '', organization: '', phone: '', email: '', website: '', address: '' };
    case 'location':
      return { latitude: '', longitude: '' };
    case 'upi':
      return { upiId: '', payeeName: '', amount: '', currency: 'INR', transactionNote: '' };
    case 'event':
      return { eventName: '', location: '', startDate: '', endDate: '', description: '' };
    case 'social':
      return { platform: 'twitter' as const, usernameOrUrl: '' };
    case 'custom':
      return { data: '' };
  }
}

// ─── Default Logo Config ──────────────────────────────────────────

export const DEFAULT_LOGO: QRLogoConfig = {
  src: '',
  size: 60,
  padding: 5,
  backgroundColor: 'transparent',
  borderRadius: 8,
  opacity: 1,
  hideBackgroundDots: true,
};

// ─── Error Correction Info ────────────────────────────────────────

export const ERROR_CORRECTION_INFO = [
  { level: 'L' as const, name: 'Low', recovery: '~7%', description: 'Smallest QR code size' },
  { level: 'M' as const, name: 'Medium', recovery: '~15%', description: 'Good balance of size and reliability' },
  { level: 'Q' as const, name: 'Quartile', recovery: '~25%', description: 'Recommended for moderate damage' },
  { level: 'H' as const, name: 'High', recovery: '~30%', description: 'Best for logos and damaged QR codes' },
] as const;

// ─── Social Platforms ─────────────────────────────────────────────

export const SOCIAL_PLATFORMS = [
  { id: 'twitter' as const, name: 'Twitter / X', baseUrl: 'https://x.com/' },
  { id: 'instagram' as const, name: 'Instagram', baseUrl: 'https://instagram.com/' },
  { id: 'facebook' as const, name: 'Facebook', baseUrl: 'https://facebook.com/' },
  { id: 'linkedin' as const, name: 'LinkedIn', baseUrl: 'https://linkedin.com/in/' },
  { id: 'github' as const, name: 'GitHub', baseUrl: 'https://github.com/' },
  { id: 'youtube' as const, name: 'YouTube', baseUrl: 'https://youtube.com/@' },
  { id: 'tiktok' as const, name: 'TikTok', baseUrl: 'https://tiktok.com/@' },
  { id: 'whatsapp' as const, name: 'WhatsApp', baseUrl: 'https://wa.me/' },
  { id: 'telegram' as const, name: 'Telegram', baseUrl: 'https://t.me/' },
  { id: 'snapchat' as const, name: 'Snapchat', baseUrl: 'https://snapchat.com/add/' },
  { id: 'other' as const, name: 'Other', baseUrl: '' },
] as const;

// ─── Export Presets ───────────────────────────────────────────────

export const RESOLUTION_PRESETS = [
  { label: '512×512', width: 512, height: 512 },
  { label: '1024×1024', width: 1024, height: 1024 },
  { label: '2048×2048', width: 2048, height: 2048 },
  { label: '4096×4096', width: 4096, height: 4096 },
] as const;
