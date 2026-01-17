'use client';
import { SearchControls } from '@/components/search/search-controls';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, orderBy, query, Query } from 'firebase/firestore';
import type { FeedItem } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

function SearchPageSkeleton() {
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
            <div className="relative">
                <Skeleton className="w-full h-12" />
            </div>
            <div className="text-center py-12 text-muted-foreground">
                <p>Loading content...</p>
            </div>
        </div>
    )
}


export default function SearchPage() {
  const firestore = useFirestore();
  const feedQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'feed'), orderBy('date', 'desc'));
  }, [firestore]);
  
  const { data: allItems, isLoading } = useCollection<FeedItem>(feedQuery);

  if (isLoading || !allItems) {
    return <SearchPageSkeleton />;
  }
  
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
      <SearchControls initialItems={allItems} />
    </div>
  );
}
