// ─── QR Content Types ──────────────────────────────────────────────

export type QRContentTypeId =
  | 'url'
  | 'text'
  | 'email'
  | 'phone'
  | 'sms'
  | 'wifi'
  | 'vcard'
  | 'location'
  | 'upi'
  | 'event'
  | 'social'
  | 'custom';

export interface QRContentTypeInfo {
  id: QRContentTypeId;
  name: string;
  icon: string;
  description: string;
}

export interface UrlContent {
  url: string;
}

export interface TextContent {
  text: string;
}

export interface EmailContent {
  email: string;
  subject: string;
  body: string;
}

export interface PhoneContent {
  phone: string;
}

export interface SmsContent {
  phone: string;
  message: string;
}

export type WifiEncryption = 'WPA' | 'WEP' | 'nopass';

export interface WifiContent {
  ssid: string;
  password: string;
  encryption: WifiEncryption;
  hidden: boolean;
}

export interface VCardContent {
  firstName: string;
  lastName: string;
  organization: string;
  phone: string;
  email: string;
  website: string;
  address: string;
}

export interface LocationContent {
  latitude: string;
  longitude: string;
}

export interface UpiContent {
  upiId: string;
  payeeName: string;
  amount: string;
  currency: string;
  transactionNote: string;
}

export interface EventContent {
  eventName: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export type SocialPlatform =
  | 'twitter'
  | 'instagram'
  | 'facebook'
  | 'linkedin'
  | 'github'
  | 'youtube'
  | 'tiktok'
  | 'whatsapp'
  | 'telegram'
  | 'snapchat'
  | 'other';

export interface SocialContent {
  platform: SocialPlatform;
  usernameOrUrl: string;
}

export interface CustomContent {
  data: string;
}

export type QRContent =
  | UrlContent
  | TextContent
  | EmailContent
  | PhoneContent
  | SmsContent
  | WifiContent
  | VCardContent
  | LocationContent
  | UpiContent
  | EventContent
  | SocialContent
  | CustomContent;

// ─── QR Design Configuration ──────────────────────────────────────

export type DotType = 'square' | 'dots' | 'rounded' | 'classy' | 'classy-rounded' | 'extra-rounded';
export type CornerSquareType = 'square' | 'dot' | 'extra-rounded';
export type CornerDotType = 'square' | 'dot';
export type GradientType = 'linear' | 'radial';
export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface ColorStop {
  offset: number;
  color: string;
}

export interface GradientConfig {
  type: GradientType;
  rotation: number;
  colorStops: ColorStop[];
}

export interface ColorConfig {
  color: string;
  gradient?: GradientConfig;
}

export interface QRDesignConfig {
  dotType: DotType;
  dotColor: ColorConfig;
  cornerSquareType: CornerSquareType;
  cornerSquareColor: ColorConfig;
  cornerDotType: CornerDotType;
  cornerDotColor: ColorConfig;
  backgroundColor: ColorConfig;
  width: number;
  height: number;
  margin: number;
  errorCorrectionLevel: ErrorCorrectionLevel;
}

// ─── Logo Configuration ────────────────────────────────────────────

export interface QRLogoConfig {
  src: string;
  size: number;
  padding: number;
  backgroundColor: string;
  borderRadius: number;
  opacity: number;
  hideBackgroundDots: boolean;
}

// ─── Branding Configuration ────────────────────────────────────────

export type FrameStyle = 'none' | 'simple' | 'rounded' | 'modern' | 'badge';

export interface QRBrandingConfig {
  frameStyle: FrameStyle;
  labelText: string;
  labelFont: string;
  labelFontSize: number;
  labelFontWeight: number;
  labelColor: string;
}

// ─── QR Document (Full Model) ──────────────────────────────────────

export interface QRDocument {
  id: string;
  name: string;
  contentType: QRContentTypeId;
  content: QRContent;
  design: QRDesignConfig;
  logo: QRLogoConfig | null;
  branding: QRBrandingConfig;
  createdAt: string;
  updatedAt: string;
}

// ─── Template ──────────────────────────────────────────────────────

export interface QRTemplate {
  id: string;
  name: string;
  description: string;
  design: QRDesignConfig;
  logo: QRLogoConfig | null;
  branding: QRBrandingConfig;
  isBuiltIn: boolean;
}

// ─── Validation ────────────────────────────────────────────────────

export type ValidationSeverity = 'info' | 'warning' | 'error';

export interface ValidationResult {
  id: string;
  severity: ValidationSeverity;
  message: string;
}

// ─── Export ─────────────────────────────────────────────────────────

export type ExportFormat = 'png' | 'jpeg' | 'svg' | 'webp';

export interface ExportConfig {
  format: ExportFormat;
  width: number;
  height: number;
  transparentBackground: boolean;
  includeMargin: boolean;
  filename: string;
}
