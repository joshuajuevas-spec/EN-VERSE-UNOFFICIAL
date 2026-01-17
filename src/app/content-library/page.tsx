import { ContentCard } from '@/components/content/content-card';
import { FilterControls } from '@/components/content/filter-controls';
import { contentItems } from '@/lib/data';

export default function ContentLibraryPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Content Library
        </h1>
        <p className="text-muted-foreground">
          Explore all official content from Enhypen.
        </p>
      </div>
      <FilterControls allItems={contentItems} />
    </div>
  );
}
