import { useState, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label?: string;
}

export function ColorPicker({ color, onChange, label }: ColorPickerProps) {
  const [value, setValue] = useState(color);

  useEffect(() => {
    setValue(color);
  }, [color]);

  const handleChange = (newColor: string) => {
    setValue(newColor);
    onChange(newColor);
  };

  return (
    <div className="flex flex-col gap-1.5">
      {label && <Label className="text-xs text-muted-foreground">{label}</Label>}
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="flex h-9 w-full items-center gap-2 rounded-md border border-input bg-transparent px-3 py-1 shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <div
              className="h-4 w-4 rounded-sm border border-border/50"
              style={{ backgroundColor: value }}
            />
            <span className="text-sm font-medium">{value.toUpperCase()}</span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3" align="start">
          <div className="flex flex-col gap-3">
            <HexColorPicker color={value} onChange={handleChange} />
            <Input
              value={value}
              onChange={(e) => handleChange(e.target.value)}
              className="h-8 uppercase"
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
