import { cn } from '@/lib/utils';
import type { QRDesignConfig } from '@/types/qr';
import { Button } from '@/components/ui/button';

interface PatternSelectorProps {
  type: QRDesignConfig['dotType'];
  onChange: (type: QRDesignConfig['dotType']) => void;
}

const PATTERNS: { id: QRDesignConfig['dotType']; label: string }[] = [
  { id: 'square', label: 'Square' },
  { id: 'dots', label: 'Dots' },
  { id: 'rounded', label: 'Rounded' },
  { id: 'extra-rounded', label: 'Extra Rounded' },
  { id: 'classy', label: 'Classy' },
  { id: 'classy-rounded', label: 'Classy Rounded' },
];

export function PatternSelector({ type, onChange }: PatternSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {PATTERNS.map((pattern) => (
        <Button
          key={pattern.id}
          variant="outline"
          className={cn(
            'h-12 w-full justify-center text-xs transition-all',
            type === pattern.id && 'border-primary bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary'
          )}
          onClick={() => onChange(pattern.id)}
        >
          {pattern.label}
        </Button>
      ))}
    </div>
  );
}
