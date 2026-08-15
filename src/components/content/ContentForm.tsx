import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type {
  QRContentTypeId,
  QRContent,
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
  WifiEncryption,
  SocialPlatform,
} from '@/types/qr';
import { SOCIAL_PLATFORMS } from '@/lib/constants';

interface ContentFormProps {
  contentType: QRContentTypeId;
  content: QRContent;
  onChange: (partial: Partial<QRContent>) => void;
}

function FormField({ label, children, id }: { label: string; children: React.ReactNode; id: string }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs font-medium text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

// ─── Individual Forms ──────────────────────────────────────────

function UrlForm({ content, onChange }: { content: UrlContent; onChange: (p: Partial<UrlContent>) => void }) {
  return (
    <FormField label="Website URL" id="url">
      <Input id="url" type="url" placeholder="https://example.com" value={content.url} onChange={(e) => onChange({ url: e.target.value })} />
    </FormField>
  );
}

function TextForm({ content, onChange }: { content: TextContent; onChange: (p: Partial<TextContent>) => void }) {
  return (
    <FormField label="Text Content" id="text">
      <textarea
        id="text"
        className="flex min-h-[80px] w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        placeholder="Enter your text…"
        value={content.text}
        onChange={(e) => onChange({ text: e.target.value })}
      />
    </FormField>
  );
}

function EmailForm({ content, onChange }: { content: EmailContent; onChange: (p: Partial<EmailContent>) => void }) {
  return (
    <div className="space-y-3">
      <FormField label="Email Address" id="email"><Input id="email" type="email" placeholder="hello@example.com" value={content.email} onChange={(e) => onChange({ email: e.target.value })} /></FormField>
      <FormField label="Subject (optional)" id="email-subject"><Input id="email-subject" placeholder="Hello!" value={content.subject} onChange={(e) => onChange({ subject: e.target.value })} /></FormField>
      <FormField label="Body (optional)" id="email-body">
        <textarea id="email-body" className="flex min-h-[60px] w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="Message body…" value={content.body} onChange={(e) => onChange({ body: e.target.value })} />
      </FormField>
    </div>
  );
}

function PhoneForm({ content, onChange }: { content: PhoneContent; onChange: (p: Partial<PhoneContent>) => void }) {
  return (
    <FormField label="Phone Number" id="phone">
      <Input id="phone" type="tel" placeholder="+1 234 567 8900" value={content.phone} onChange={(e) => onChange({ phone: e.target.value })} />
    </FormField>
  );
}

function SmsForm({ content, onChange }: { content: SmsContent; onChange: (p: Partial<SmsContent>) => void }) {
  return (
    <div className="space-y-3">
      <FormField label="Phone Number" id="sms-phone"><Input id="sms-phone" type="tel" placeholder="+1 234 567 8900" value={content.phone} onChange={(e) => onChange({ phone: e.target.value })} /></FormField>
      <FormField label="Message (optional)" id="sms-msg">
        <textarea id="sms-msg" className="flex min-h-[60px] w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="Pre-filled message…" value={content.message} onChange={(e) => onChange({ message: e.target.value })} />
      </FormField>
    </div>
  );
}

function WifiForm({ content, onChange }: { content: WifiContent; onChange: (p: Partial<WifiContent>) => void }) {
  return (
    <div className="space-y-3">
      <FormField label="Network Name (SSID)" id="wifi-ssid"><Input id="wifi-ssid" placeholder="MyNetwork" value={content.ssid} onChange={(e) => onChange({ ssid: e.target.value })} /></FormField>
      <FormField label="Password" id="wifi-pass"><Input id="wifi-pass" type="password" placeholder="Password" value={content.password} onChange={(e) => onChange({ password: e.target.value })} /></FormField>
      <FormField label="Encryption" id="wifi-enc">
        <Select value={content.encryption} onValueChange={(v) => onChange({ encryption: v as WifiEncryption })}>
          <SelectTrigger id="wifi-enc"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="WPA">WPA/WPA2</SelectItem>
            <SelectItem value="WEP">WEP</SelectItem>
            <SelectItem value="nopass">None</SelectItem>
          </SelectContent>
        </Select>
      </FormField>
      <div className="flex items-center justify-between">
        <Label htmlFor="wifi-hidden" className="text-xs text-muted-foreground">Hidden Network</Label>
        <Switch id="wifi-hidden" checked={content.hidden} onCheckedChange={(v) => onChange({ hidden: v })} />
      </div>
    </div>
  );
}

function VCardForm({ content, onChange }: { content: VCardContent; onChange: (p: Partial<VCardContent>) => void }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <FormField label="First Name" id="vc-first"><Input id="vc-first" placeholder="John" value={content.firstName} onChange={(e) => onChange({ firstName: e.target.value })} /></FormField>
        <FormField label="Last Name" id="vc-last"><Input id="vc-last" placeholder="Doe" value={content.lastName} onChange={(e) => onChange({ lastName: e.target.value })} /></FormField>
      </div>
      <FormField label="Organization" id="vc-org"><Input id="vc-org" placeholder="Acme Inc." value={content.organization} onChange={(e) => onChange({ organization: e.target.value })} /></FormField>
      <FormField label="Phone" id="vc-phone"><Input id="vc-phone" type="tel" placeholder="+1 234 567 8900" value={content.phone} onChange={(e) => onChange({ phone: e.target.value })} /></FormField>
      <FormField label="Email" id="vc-email"><Input id="vc-email" type="email" placeholder="john@example.com" value={content.email} onChange={(e) => onChange({ email: e.target.value })} /></FormField>
      <FormField label="Website" id="vc-web"><Input id="vc-web" type="url" placeholder="https://example.com" value={content.website} onChange={(e) => onChange({ website: e.target.value })} /></FormField>
      <FormField label="Address" id="vc-addr"><Input id="vc-addr" placeholder="123 Main St, City" value={content.address} onChange={(e) => onChange({ address: e.target.value })} /></FormField>
    </div>
  );
}

function LocationForm({ content, onChange }: { content: LocationContent; onChange: (p: Partial<LocationContent>) => void }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <FormField label="Latitude" id="loc-lat"><Input id="loc-lat" type="number" step="any" placeholder="40.7128" value={content.latitude} onChange={(e) => onChange({ latitude: e.target.value })} /></FormField>
      <FormField label="Longitude" id="loc-lng"><Input id="loc-lng" type="number" step="any" placeholder="-74.0060" value={content.longitude} onChange={(e) => onChange({ longitude: e.target.value })} /></FormField>
    </div>
  );
}

function UpiForm({ content, onChange }: { content: UpiContent; onChange: (p: Partial<UpiContent>) => void }) {
  return (
    <div className="space-y-3">
      <FormField label="UPI ID" id="upi-id"><Input id="upi-id" placeholder="name@upi" value={content.upiId} onChange={(e) => onChange({ upiId: e.target.value })} /></FormField>
      <FormField label="Payee Name" id="upi-name"><Input id="upi-name" placeholder="John Doe" value={content.payeeName} onChange={(e) => onChange({ payeeName: e.target.value })} /></FormField>
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Amount" id="upi-amt"><Input id="upi-amt" type="number" step="0.01" placeholder="100.00" value={content.amount} onChange={(e) => onChange({ amount: e.target.value })} /></FormField>
        <FormField label="Currency" id="upi-cur"><Input id="upi-cur" placeholder="INR" value={content.currency} onChange={(e) => onChange({ currency: e.target.value })} /></FormField>
      </div>
      <FormField label="Note (optional)" id="upi-note"><Input id="upi-note" placeholder="Payment for…" value={content.transactionNote} onChange={(e) => onChange({ transactionNote: e.target.value })} /></FormField>
    </div>
  );
}

function EventForm({ content, onChange }: { content: EventContent; onChange: (p: Partial<EventContent>) => void }) {
  return (
    <div className="space-y-3">
      <FormField label="Event Name" id="evt-name"><Input id="evt-name" placeholder="Team Meeting" value={content.eventName} onChange={(e) => onChange({ eventName: e.target.value })} /></FormField>
      <FormField label="Location" id="evt-loc"><Input id="evt-loc" placeholder="Conference Room A" value={content.location} onChange={(e) => onChange({ location: e.target.value })} /></FormField>
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Start Date" id="evt-start"><Input id="evt-start" type="datetime-local" value={content.startDate} onChange={(e) => onChange({ startDate: e.target.value })} /></FormField>
        <FormField label="End Date" id="evt-end"><Input id="evt-end" type="datetime-local" value={content.endDate} onChange={(e) => onChange({ endDate: e.target.value })} /></FormField>
      </div>
      <FormField label="Description" id="evt-desc">
        <textarea id="evt-desc" className="flex min-h-[60px] w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="Event details…" value={content.description} onChange={(e) => onChange({ description: e.target.value })} />
      </FormField>
    </div>
  );
}

function SocialForm({ content, onChange }: { content: SocialContent; onChange: (p: Partial<SocialContent>) => void }) {
  return (
    <div className="space-y-3">
      <FormField label="Platform" id="social-platform">
        <Select value={content.platform} onValueChange={(v) => onChange({ platform: v as SocialPlatform })}>
          <SelectTrigger id="social-platform"><SelectValue /></SelectTrigger>
          <SelectContent>
            {SOCIAL_PLATFORMS.map((p) => (
              <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>
      <FormField label="Username or URL" id="social-user"><Input id="social-user" placeholder="@username or https://…" value={content.usernameOrUrl} onChange={(e) => onChange({ usernameOrUrl: e.target.value })} /></FormField>
    </div>
  );
}

function CustomForm({ content, onChange }: { content: CustomContent; onChange: (p: Partial<CustomContent>) => void }) {
  return (
    <FormField label="Custom Data" id="custom-data">
      <textarea id="custom-data" className="flex min-h-[100px] w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm font-mono shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="Enter any data…" value={content.data} onChange={(e) => onChange({ data: e.target.value })} />
    </FormField>
  );
}

// ─── Main Content Form ────────────────────────────────────────

export function ContentForm({ contentType, content, onChange }: ContentFormProps) {
  switch (contentType) {
    case 'url':
      return <UrlForm content={content as UrlContent} onChange={onChange} />;
    case 'text':
      return <TextForm content={content as TextContent} onChange={onChange} />;
    case 'email':
      return <EmailForm content={content as EmailContent} onChange={onChange} />;
    case 'phone':
      return <PhoneForm content={content as PhoneContent} onChange={onChange} />;
    case 'sms':
      return <SmsForm content={content as SmsContent} onChange={onChange} />;
    case 'wifi':
      return <WifiForm content={content as WifiContent} onChange={onChange} />;
    case 'vcard':
      return <VCardForm content={content as VCardContent} onChange={onChange} />;
    case 'location':
      return <LocationForm content={content as LocationContent} onChange={onChange} />;
    case 'upi':
      return <UpiForm content={content as UpiContent} onChange={onChange} />;
    case 'event':
      return <EventForm content={content as EventContent} onChange={onChange} />;
    case 'social':
      return <SocialForm content={content as SocialContent} onChange={onChange} />;
    case 'custom':
      return <CustomForm content={content as CustomContent} onChange={onChange} />;
    default:
      return null;
  }
}
