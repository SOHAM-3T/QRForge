import { cn } from '@/lib/utils';
import type { QRDesignConfig } from '@/types/qr';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface EyeStyleSelectorProps {
  squareType: QRDesignConfig['cornerSquareType'];
  dotType: QRDesignConfig['cornerDotType'];
  onChangeSquare: (type: QRDesignConfig['cornerSquareType']) => void;
  onChangeDot: (type: QRDesignConfig['cornerDotType']) => void;
}

const SQUARE_STYLES: { id: QRDesignConfig['cornerSquareType']; label: string }[] = [
  { id: 'square', label: 'Square' },
  { id: 'dot', label: 'Dot' },
  { id: 'extra-rounded', label: 'Extra Rounded' },
];

const DOT_STYLES: { id: QRDesignConfig['cornerDotType']; label: string }[] = [
  { id: 'square', label: 'Square' },
  { id: 'dot', label: 'Dot' },
];

export function EyeStyleSelector({ squareType, dotType, onChangeSquare, onChangeDot }: EyeStyleSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">Frame Style</Label>
        <div className="grid grid-cols-3 gap-2">
          {SQUARE_STYLES.map((style) => (
            <Button
              key={style.id}
              variant="outline"
              className={cn(
                'h-10 w-full justify-center text-xs transition-all',
                squareType === style.id && 'border-primary bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary'
              )}
              onClick={() => onChangeSquare(style.id)}
            >
              {style.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">Center Dot Style</Label>
        <div className="grid grid-cols-2 gap-2">
          {DOT_STYLES.map((style) => (
            <Button
              key={style.id}
              variant="outline"
              className={cn(
                'h-10 w-full justify-center text-xs transition-all',
                dotType === style.id && 'border-primary bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary'
              )}
              onClick={() => onChangeDot(style.id)}
            >
              {style.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
