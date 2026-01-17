'use client';

import { useState, useMemo, useEffect } from 'react';
import type { ContentItem, ContentType, Era } from '@/lib/types';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ContentCard } from './content-card';
import { eras } from '@/lib/data';

type FilterControlsProps = {
  allItems: ContentItem[];
};

const contentTypes: ContentType[] = ['Video', 'News', 'Photo'];

export function FilterControls({ allItems }: FilterControlsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<ContentType | 'all'>('all');
  const [selectedEra, setSelectedEra] = useState<Era | 'all'>('all');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredItems = useMemo(() => {
    return allItems
      .filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((item) =>
        selectedType === 'all' ? true : item.type === selectedType
      )
      .filter((item) =>
        selectedEra === 'all' ? true : item.era === selectedEra
      );
  }, [searchTerm, selectedType, selectedEra, allItems]);

  if (!mounted) {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-muted h-10 rounded-md animate-pulse" />
                <div className="bg-muted h-10 rounded-md animate-pulse" />
                <div className="bg-muted h-10 rounded-md animate-pulse" />
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="bg-muted aspect-video rounded-lg animate-pulse" />
                ))}
            </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          value={selectedType}
          onValueChange={(value) => setSelectedType(value as ContentType | 'all')}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {contentTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={selectedEra}
          onValueChange={(value) => setSelectedEra(value as Era | 'all')}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by era" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Eras</SelectItem>
            {eras.map((era) => (
              <SelectItem key={era} value={era}>
                {era}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>
      {filteredItems.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No content found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
