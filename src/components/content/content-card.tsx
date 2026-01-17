import Image from 'next/image';
import type { ContentItem } from '@/lib/types';
import {
  Card,
} from '@/components/ui/card';
import { PlayCircle } from 'lucide-react';

type ContentCardProps = {
  item: ContentItem;
};

export function ContentCard({ item }: ContentCardProps) {
  return (
    <Card className="overflow-hidden border-0 group relative aspect-video block w-full bg-card">
      <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          className="object-cover rounded-md transition-transform duration-300 ease-in-out group-hover:scale-110"
          data-ai-hint="kpop content thumbnail"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors duration-300 rounded-md" />
        
        {item.type === 'Video' && (
             <div className="absolute inset-0 flex items-center justify-center">
                <PlayCircle className="h-12 w-12 text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform-gpu group-hover:scale-110" />
            </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
             <h3 className="font-semibold text-white text-sm truncate leading-tight">
                {item.title}
             </h3>
        </div>
      </a>
    </Card>
  );
}
