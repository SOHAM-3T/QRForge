import { useState, useRef } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useQRStore } from '@/store/qr-store';
import { Switch } from '@/components/ui/switch';

export function LogoPanel() {
  const { logo, setLogo, updateLogo } = useQRStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      loadLogo(file);
    }
  };

  const loadLogo = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      setLogo({
        src,
        size: 0.3, // default size 30% of QR width
        padding: 5,
        hideBackgroundDots: true,
        backgroundColor: '#ffffff',
        borderRadius: 0,
        opacity: 1,
      });
    };
    reader.readAsDataURL(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      loadLogo(file);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {!logo ? (
        <div
          className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-colors ${
            isDragging ? 'border-primary bg-primary/5' : 'border-border/50 hover:border-primary/50'
          }`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">
            <Upload className="size-6" />
          </div>
          <p className="mb-1 text-sm font-medium">Drag & drop your logo here</p>
          <p className="mb-4 text-xs text-muted-foreground">Supports PNG, JPG, SVG, WebP</p>
          <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
            Browse Files
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center gap-4 rounded-xl border border-border/50 bg-card/50 p-4">
            <div className="flex size-16 items-center justify-center rounded-lg bg-background p-2 border border-border/50">
              <img src={logo.src} alt="Logo preview" className="max-h-full max-w-full object-contain" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Custom Logo</p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-1 h-auto p-0 text-xs text-destructive hover:text-destructive/80"
                onClick={() => setLogo(null)}
              >
                Remove Logo
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-semibold">Logo Size</Label>
                <span className="text-xs text-muted-foreground">{Math.round(logo.size * 100)}%</span>
              </div>
              <Slider
                value={[logo.size]}
                min={0.1}
                max={0.5}
                step={0.01}
                onValueChange={([size]) => updateLogo({ size })}
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-semibold">Background Padding</Label>
                <span className="text-xs text-muted-foreground">{logo.padding}px</span>
              </div>
              <Slider
                value={[logo.padding]}
                min={0}
                max={20}
                step={1}
                onValueChange={([padding]) => updateLogo({ padding })}
              />
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <Label htmlFor="hide-dots" className="text-sm font-semibold">Hide Background Dots</Label>
              <Switch 
                id="hide-dots" 
                checked={logo.hideBackgroundDots} 
                onCheckedChange={(hideBackgroundDots) => updateLogo({ hideBackgroundDots })} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
