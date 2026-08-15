import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { useQRStore } from '@/store/qr-store';
import { exportQRCode, generateFilename } from '@/lib/export-engine';
import { encodeQRContent } from '@/lib/qr-encoder';
import { toast } from 'sonner';
import type { ExportFormat } from '@/types/qr';

export function ExportPanel() {
  const { contentType, content, design, logo } = useQRStore();
  const [format, setFormat] = useState<ExportFormat>('png');
  const [size, setSize] = useState(1024);
  const [transparent, setTransparent] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const dataString = encodeQRContent(contentType, content);
      
      await exportQRCode({
        data: dataString,
        design,
        logo,
        format,
        exportWidth: size,
        exportHeight: size,
        transparentBackground: transparent,
        filename: generateFilename(`qrforge-${contentType}-{timestamp}`),
      });
      
      toast.success('QR Code exported successfully!');
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('Failed to export QR code. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-semibold">Format</Label>
          <Select value={format} onValueChange={(v) => setFormat(v as ExportFormat)}>
            <SelectTrigger>
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="png">PNG (Best for web)</SelectItem>
              <SelectItem value="svg">SVG (Vector, best for print)</SelectItem>
              <SelectItem value="jpeg">JPEG (Smaller file size)</SelectItem>
              <SelectItem value="webp">WebP (Modern format)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-semibold">Resolution</Label>
            <span className="text-xs text-muted-foreground">{size} x {size} px</span>
          </div>
          <Slider
            value={[size]}
            min={256}
            max={4096}
            step={256}
            onValueChange={([val]) => setSize(val)}
            disabled={format === 'svg'} // SVG is infinitely scalable
          />
          {format === 'svg' && (
            <p className="text-xs text-muted-foreground">Resolution does not affect SVG exports.</p>
          )}
        </div>

        <div className="flex items-center justify-between pt-2">
          <Label htmlFor="transparent-bg" className="text-sm font-semibold">Transparent Background</Label>
          <Switch 
            id="transparent-bg" 
            checked={transparent} 
            onCheckedChange={setTransparent}
            disabled={format === 'jpeg'} // JPEG doesn't support transparency
          />
        </div>
      </div>

      <Button 
        className="w-full gradient-primary border-0 text-white shadow-md hover:opacity-90" 
        size="lg"
        onClick={handleExport}
        disabled={isExporting}
      >
        {isExporting ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Download className="mr-2 h-4 w-4" />
        )}
        Export QR Code
      </Button>
    </div>
  );
}
