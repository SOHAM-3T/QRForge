import { useMemo } from 'react';
import { ShieldCheck, ShieldAlert, ShieldX, Info } from 'lucide-react';
import { useQRStore } from '@/store/qr-store';
import { validateLogo, validateDesign } from '@/lib/logo-validator';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';

export function ValidationBadge() {
  const { logo, design } = useQRStore();

  const results = useMemo(() => {
    return [...validateDesign(design), ...validateLogo(logo, design)];
  }, [design, logo]);

  const hasErrors = results.some((r) => r.severity === 'error');
  const hasWarnings = results.some((r) => r.severity === 'warning');
  
  if (results.length === 0) {
    return (
      <Badge variant="outline" className="text-emerald-500 border-emerald-500/20 bg-emerald-500/10 gap-1.5 px-2.5 py-1">
        <ShieldCheck className="size-3.5" />
        <span className="font-medium text-xs">Scan Ready</span>
      </Badge>
    );
  }

  const icon = hasErrors ? (
    <ShieldX className="size-3.5 text-destructive" />
  ) : hasWarnings ? (
    <ShieldAlert className="size-3.5 text-amber-500" />
  ) : (
    <Info className="size-3.5 text-blue-500" />
  );

  const label = hasErrors ? 'Issues Found' : hasWarnings ? 'Warnings' : 'Suggestions';
  const badgeClass = hasErrors 
    ? 'text-destructive border-destructive/20 bg-destructive/10' 
    : hasWarnings 
      ? 'text-amber-500 border-amber-500/20 bg-amber-500/10'
      : 'text-blue-500 border-blue-500/20 bg-blue-500/10';

  return (
    <Popover>
      <PopoverTrigger>
        <Badge variant="outline" className={`cursor-help gap-1.5 px-2.5 py-1 ${badgeClass}`}>
          {icon}
          <span className="font-medium text-xs">{label}</span>
          <span className="flex items-center justify-center rounded-full bg-background/50 size-4 text-[10px] ml-1">
            {results.length}
          </span>
        </Badge>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Validation Results</h4>
          <p className="text-xs text-muted-foreground mb-4">
            These checks help ensure your QR code will scan reliably.
          </p>
          <div className="space-y-3">
            {results.map((result) => (
              <div key={result.id} className="flex gap-2">
                <div className="mt-0.5 shrink-0">
                  {result.severity === 'error' && <ShieldX className="size-4 text-destructive" />}
                  {result.severity === 'warning' && <ShieldAlert className="size-4 text-amber-500" />}
                  {result.severity === 'info' && <Info className="size-4 text-blue-500" />}
                </div>
                <div>
                  <p className="text-xs font-medium leading-relaxed">
                    {result.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
