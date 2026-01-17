'use client';

import { useCollection } from '@/firebase/firestore/use-collection';
import { collection, query, orderBy, Query, DocumentData } from 'firebase/firestore';
import { useFirestore, useMemoFirebase } from '@/firebase';
import { FeedCard } from '@/components/content/feed-card';
import { Skeleton } from '@/components/ui/skeleton';
import type { FeedItem } from '@/lib/types';

function FeedSkeleton() {
  return (
    <div className="space-y-6">
      {[...Array(3)].map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="w-full max-w-2xl mx-auto p-4 border rounded-lg">
      <div className="flex items-center gap-4 mb-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <Skeleton className="aspect-video w-full rounded-lg" />
    </div>
  );
}

export default function Home() {
  const firestore = useFirestore();
  
  const feedQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'feed'), orderBy('date', 'desc'));
  }, [firestore]);

  const { data: feedItems, isLoading } = useCollection<FeedItem>(feedQuery as Query<DocumentData, DocumentData> | null | undefined);

  return (
    <div className="space-y-12 animate-fade-in">
      <section className="space-y-6">
        {isLoading && <FeedSkeleton />}
        {feedItems && feedItems.length > 0 ? (
          feedItems.map((item) => (
            <FeedCard key={item.id} item={item} />
          ))
        ) : (
          !isLoading && <p className="text-center text-muted-foreground">No feed items yet. Check back later!</p>
        )}
      </section>
    </div>
  );
}
