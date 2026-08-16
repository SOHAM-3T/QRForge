import { useMemo } from 'react';
import { useTemplateStore } from '@/store/template-store';
import { TemplateCard } from './TemplateCard';

export function TemplateGallery() {
  const builtInTemplates = useTemplateStore((state) => state.builtInTemplates);
  const userTemplates = useTemplateStore((state) => state.userTemplates);

  const templates = useMemo(
    () => [...builtInTemplates, ...userTemplates],
    [builtInTemplates, userTemplates]
  );

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      {templates.map((template) => (
        <TemplateCard key={template.id} template={template} />
      ))}
    </div>
  );
}
