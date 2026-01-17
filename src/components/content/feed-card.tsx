'use client';

import Image from 'next/image';
import type { ContentItem } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MessageSquare, Heart, Share2, PlayCircle, Newspaper, Image as ImageIcon } from 'lucide-react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { Badge } from '../ui/badge';

type FeedCardProps = {
  item: ContentItem;
};

const getIcon = (type: ContentItem['type']) => {
    switch (type) {
        case 'Video':
            return <PlayCircle className="h-4 w-4" />;
        case 'News':
            return <Newspaper className="h-4 w-4" />;
        case 'Photo':
            return <ImageIcon className="h-4 w-4" />;
        default:
            return null;
    }
}

export function FeedCard({ item }: FeedCardProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center gap-4 p-4">
            <Avatar className="h-10 w-10">
                <AvatarImage src="https://picsum.photos/seed/en-logo/40/40" data-ai-hint="group logo" />
                <AvatarFallback>EN</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <p className="font-semibold">ENHYPEN</p>
                <p className="text-xs text-muted-foreground">{formatDistanceToNow(parseISO(item.date), { addSuffix: true })}</p>
            </div>
            <Badge variant="outline" className="flex items-center gap-1.5">
                {getIcon(item.type)}
                {item.type}
            </Badge>
        </CardHeader>
        <CardContent className="p-4 pt-0 space-y-4">
            <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                <p className="text-lg font-medium">{item.title}</p>
            </a>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{item.description}</p>
            
            {item.imageUrl && (
                <div className="relative aspect-video w-full overflow-hidden rounded-lg mt-4">
                    <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="block w-full h-full group">
                        <Image
                            src={item.imageUrl}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                            data-ai-hint="kpop content thumbnail"
                        />
                        {item.type === 'Video' && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                                <PlayCircle className="h-16 w-16 text-white/80" />
                            </div>
                        )}
                    </a>
                </div>
            )}
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-start gap-2 border-t mt-4">
            <Button variant="ghost" size="sm" className="text-muted-foreground gap-1.5">
                <Heart className="h-5 w-5" />
                <span>Like</span>
            </Button>
             <Button variant="ghost" size="sm" className="text-muted-foreground gap-1.5">
                <MessageSquare className="h-5 w-5" />
                <span>Comment</span>
            </Button>
             <Button variant="ghost" size="sm" className="text-muted-foreground gap-1.5">
                <Share2 className="h-5 w-5" />
                <span>Share</span>
            </Button>
        </CardFooter>
    </Card>
  );
}
