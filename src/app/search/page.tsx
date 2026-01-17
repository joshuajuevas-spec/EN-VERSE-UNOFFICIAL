import { SearchControls } from '@/components/search/search-controls';
import { contentItems } from '@/lib/data';

export default function SearchPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Search
        </h1>
        <p className="text-muted-foreground">
          Find any content in the EN-VERSE library.
        </p>
      </div>
      <SearchControls allItems={contentItems} />
    </div>
  );
}
