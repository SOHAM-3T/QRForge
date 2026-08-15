import type {
  QRContent,
  QRContentTypeId,
  UrlContent,
  TextContent,
  EmailContent,
  PhoneContent,
  SmsContent,
  WifiContent,
  VCardContent,
  LocationContent,
  UpiContent,
  EventContent,
  SocialContent,
  CustomContent,
} from '@/types/qr';
import { SOCIAL_PLATFORMS } from '@/lib/constants';

/**
 * Encode QR content into the raw string that gets embedded in the QR code.
 * Each content type has its own encoding format/scheme.
 */
export function encodeQRContent(type: QRContentTypeId, content: QRContent): string {
  switch (type) {
    case 'url':
      return encodeUrl(content as UrlContent);
    case 'text':
      return encodeText(content as TextContent);
    case 'email':
      return encodeEmail(content as EmailContent);
    case 'phone':
      return encodePhone(content as PhoneContent);
    case 'sms':
      return encodeSms(content as SmsContent);
    case 'wifi':
      return encodeWifi(content as WifiContent);
    case 'vcard':
      return encodeVCard(content as VCardContent);
    case 'location':
      return encodeLocation(content as LocationContent);
    case 'upi':
      return encodeUpi(content as UpiContent);
    case 'event':
      return encodeEvent(content as EventContent);
    case 'social':
      return encodeSocial(content as SocialContent);
    case 'custom':
      return encodeCustom(content as CustomContent);
    default:
      return '';
  }
}

function encodeUrl(content: UrlContent): string {
  const url = content.url.trim();
  if (!url) return 'https://example.com';
  // Add protocol if missing
  if (!/^https?:\/\//i.test(url)) {
    return `https://${url}`;
  }
  return url;
}

function encodeText(content: TextContent): string {
  return content.text || 'Hello World';
}

function encodeEmail(content: EmailContent): string {
  const parts: string[] = [];
  if (content.subject) parts.push(`subject=${encodeURIComponent(content.subject)}`);
  if (content.body) parts.push(`body=${encodeURIComponent(content.body)}`);
  const query = parts.length > 0 ? `?${parts.join('&')}` : '';
  return `mailto:${content.email}${query}`;
}

function encodePhone(content: PhoneContent): string {
  return `tel:${content.phone}`;
}

function encodeSms(content: SmsContent): string {
  const body = content.message ? `?body=${encodeURIComponent(content.message)}` : '';
  return `sms:${content.phone}${body}`;
}

function encodeWifi(content: WifiContent): string {
  const hidden = content.hidden ? 'H:true' : '';
  const password = content.encryption !== 'nopass' ? `P:${escapeWifi(content.password)}` : '';
  return `WIFI:T:${content.encryption};S:${escapeWifi(content.ssid)};${password};${hidden};;`;
}

/** Escape special characters in Wi-Fi fields per the spec */
function escapeWifi(value: string): string {
  return value.replace(/[\\;,":]/g, (char) => `\\${char}`);
}

function encodeVCard(content: VCardContent): string {
  const lines: string[] = [
    'BEGIN:VCARD',
    'VERSION:3.0',
  ];

  const fullName = [content.firstName, content.lastName].filter(Boolean).join(' ');
  if (fullName) {
    lines.push(`FN:${fullName}`);
    lines.push(`N:${content.lastName || ''};${content.firstName || ''};;;`);
  }
  if (content.organization) lines.push(`ORG:${content.organization}`);
  if (content.phone) lines.push(`TEL:${content.phone}`);
  if (content.email) lines.push(`EMAIL:${content.email}`);
  if (content.website) lines.push(`URL:${content.website}`);
  if (content.address) lines.push(`ADR:;;${content.address};;;;`);

  lines.push('END:VCARD');
  return lines.join('\n');
}

function encodeLocation(content: LocationContent): string {
  return `geo:${content.latitude},${content.longitude}`;
}

function encodeUpi(content: UpiContent): string {
  const params: string[] = [];
  if (content.upiId) params.push(`pa=${encodeURIComponent(content.upiId)}`);
  if (content.payeeName) params.push(`pn=${encodeURIComponent(content.payeeName)}`);
  if (content.amount) params.push(`am=${content.amount}`);
  if (content.currency) params.push(`cu=${content.currency}`);
  if (content.transactionNote) params.push(`tn=${encodeURIComponent(content.transactionNote)}`);
  return `upi://pay?${params.join('&')}`;
}

function encodeEvent(content: EventContent): string {
  const formatDate = (dateStr: string): string => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  };

  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
  ];

  if (content.eventName) lines.push(`SUMMARY:${content.eventName}`);
  if (content.location) lines.push(`LOCATION:${content.location}`);
  if (content.startDate) lines.push(`DTSTART:${formatDate(content.startDate)}`);
  if (content.endDate) lines.push(`DTEND:${formatDate(content.endDate)}`);
  if (content.description) lines.push(`DESCRIPTION:${content.description}`);

  lines.push('END:VEVENT');
  lines.push('END:VCALENDAR');
  return lines.join('\n');
}

function encodeSocial(content: SocialContent): string {
  const value = content.usernameOrUrl.trim();
  // If it's already a URL, use it directly
  if (/^https?:\/\//i.test(value)) {
    return value;
  }
  // Otherwise, build URL from platform + username
  const platform = SOCIAL_PLATFORMS.find((p) => p.id === content.platform);
  if (platform && platform.baseUrl) {
    // Strip leading @ if present
    const username = value.startsWith('@') ? value.slice(1) : value;
    return `${platform.baseUrl}${username}`;
  }
  return value;
}

function encodeCustom(content: CustomContent): string {
  return content.data || 'QRForge';
}
