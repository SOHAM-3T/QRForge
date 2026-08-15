import { useTemplateStore } from '@/store/template-store';
import { TemplateCard } from './TemplateCard';

export function TemplateGallery() {
  const templates = useTemplateStore((state) => state.getAllTemplates());

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {templates.map((template) => (
        <TemplateCard key={template.id} template={template} />
      ))}
    </div>
  );
}
