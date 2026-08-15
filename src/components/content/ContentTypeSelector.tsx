import * as Icons from 'lucide-react';
import { cn } from '@/lib/utils';
import { CONTENT_TYPES } from '@/lib/constants';
import type { QRContentTypeId } from '@/types/qr';

interface ContentTypeSelectorProps {
  selected: QRContentTypeId;
  onSelect: (type: QRContentTypeId) => void;
}

export function ContentTypeSelector({ selected, onSelect }: ContentTypeSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground">Content Type</h3>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-3">
        {CONTENT_TYPES.map((type) => {
          const Icon = Icons[type.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
          const isSelected = selected === type.id;

          return (
            <button
              key={type.id}
              onClick={() => onSelect(type.id)}
              className={cn(
                'flex flex-col items-center gap-1.5 rounded-lg border p-3 text-center transition-all duration-200',
                isSelected
                  ? 'border-primary bg-primary/10 text-primary shadow-sm'
                  : 'border-border/50 bg-card/50 text-muted-foreground hover:border-primary/30 hover:bg-card hover:text-foreground'
              )}
              title={type.description}
              aria-pressed={isSelected}
              aria-label={`Select ${type.name} content type`}
            >
              {Icon && <Icon className="size-4.5" />}
              <span className="text-[11px] font-medium leading-tight">{type.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
