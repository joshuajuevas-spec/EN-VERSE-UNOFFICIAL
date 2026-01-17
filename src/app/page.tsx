import Image from 'next/image';
import { contentItems } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';
import { parseISO } from 'date-fns';
import { FeedCard } from '@/components/content/feed-card';

export default function Home() {
  const sortedContent = [...contentItems].sort((a, b) => 
    parseISO(b.date).getTime() - parseISO(a.date).getTime()
  );

  const featuredContent = contentItems.find(item => item.id === '13'); // Sweet Venom MV as hero

  return (
    <div className="space-y-12 animate-fade-in">
      {featuredContent && (
        <section className="relative w-full h-[60vh] -mt-8 -mx-4 sm:-mx-6 lg:-mx-8">
          <Image
            src={featuredContent.imageUrl}
            alt={featuredContent.title}
            fill
            className="object-cover"
            priority
            data-ai-hint="kpop music video"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/0 to-background/0" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/50 to-transparent" />
          <div className="relative z-10 flex flex-col justify-end h-full p-4 sm:p-6 lg:p-8 space-y-4 max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-lg">
              {featuredContent.title}
            </h1>
            <p className="text-lg text-white/90 drop-shadow-md">
              {featuredContent.description}
            </p>
            <div className="flex gap-4">
                <Button asChild size="lg">
                    <a href={featuredContent.sourceUrl} target="_blank" rel="noopener noreferrer">
                        <PlayCircle className="mr-2 h-6 w-6" />
                        Play
                    </a>
                </Button>
            </div>
          </div>
        </section>
      )}
      
      <section className="space-y-6">
        {sortedContent.map((item) => (
          <FeedCard key={item.id} item={item} />
        ))}
      </section>

    </div>
  );
}
