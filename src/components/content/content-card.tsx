import Image from 'next/image';
import type { ContentItem } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Newspaper, Video, ImageIcon } from 'lucide-react';

type ContentCardProps = {
  item: ContentItem;
};

const typeIcons = {
    News: <Newspaper className="h-4 w-4" />,
    Video: <Video className="h-4 w-4" />,
    Photo: <ImageIcon className="h-4 w-4" />,
}

export function ContentCard({ item }: ContentCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
      <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col flex-grow">
        <CardHeader className="p-0">
          <div className="relative aspect-video">
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover"
              data-ai-hint="kpop content"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-base font-semibold leading-tight mb-2">
            {item.title}
          </CardTitle>
          <CardDescription className="text-xs">{item.date}</CardDescription>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
            <div className="flex flex-wrap gap-1">
                 <Badge variant="secondary" className="flex items-center gap-1">
                    {typeIcons[item.type]}
                    {item.type}
                </Badge>
                <Badge variant="outline">{item.era}</Badge>
            </div>
        </CardFooter>
      </a>
    </Card>
  );
}
