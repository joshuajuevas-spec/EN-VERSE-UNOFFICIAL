'use client';

import { useState, useMemo, useEffect } from 'react';
import type { ContentItem } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { ContentCard } from '@/components/content/content-card';
import { Search as SearchIcon } from 'lucide-react';

type SearchControlsProps = {
  allItems: ContentItem[];
};

export function SearchControls({ allItems }: SearchControlsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredItems = useMemo(() => {
    if (!searchTerm) {
      return [];
    }
    return allItems
      .filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.era.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [searchTerm, allItems]);

  if (!mounted) {
    return (
        <div className="space-y-4">
            <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search for videos, photos, news..."
                  className="w-full pl-10 h-12 text-lg"
                  value=""
                  readOnly
                />
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-muted aspect-video rounded-lg animate-pulse" />
                ))}
            </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
       <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for videos, photos, news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 h-12 text-lg"
              autoFocus
            />
        </div>
      
      {searchTerm ? (
        <>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredItems.map((item) => (
                <ContentCard key={item.id} item={item} />
                ))}
            </div>
            {filteredItems.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                <p>No content found for "{searchTerm}".</p>
                </div>
            )}
        </>
      ) : (
         <div className="text-center py-12 text-muted-foreground">
            <p>Start typing to search for content.</p>
        </div>
      )}
    </div>
  );
}
