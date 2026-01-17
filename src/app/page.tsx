import Image from 'next/image';
import Link from 'next/link';
import { contentItems } from '@/lib/data';
import { ContentCard } from '@/components/content/content-card';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { PlayCircle, ArrowRight } from 'lucide-react';

export default function Home() {
  const recentVideos = contentItems
    .filter((item) => item.type === 'Video')
    .slice(0, 8);
  const latestNews = contentItems
    .filter((item) => item.type === 'News')
    .slice(0, 8);
  const photoCollections = contentItems
    .filter((item) => item.type === 'Photo')
    .slice(0, 8);

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
      
      <section className="space-y-4">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold tracking-tight">Recent Videos</h2>
            <Link href="/content-library" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                View All <ArrowRight className="h-4 w-4" />
            </Link>
        </div>
        <Carousel opts={{ align: 'start', slidesToScroll: 'auto' }} className="w-full">
          <CarouselContent className="-ml-4">
            {recentVideos.map((item) => (
              <CarouselItem key={item.id} className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 pl-4">
                <ContentCard item={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </section>
      
      <section className="space-y-4">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold tracking-tight">Latest News</h2>
             <Link href="/content-library" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                View All <ArrowRight className="h-4 w-4" />
            </Link>
        </div>
        <Carousel opts={{ align: 'start', slidesToScroll: 'auto' }} className="w-full">
          <CarouselContent className="-ml-4">
            {latestNews.map((item) => (
              <CarouselItem key={item.id} className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 pl-4">
                <ContentCard item={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </section>

      <section className="space-y-4">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold tracking-tight">Photo Collections</h2>
             <Link href="/content-library" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                View All <ArrowRight className="h-4 w-4" />
            </Link>
        </div>
        <Carousel opts={{ align: 'start', slidesToScroll: 'auto' }} className="w-full">
          <CarouselContent className="-ml-4">
            {photoCollections.map((item) => (
              <CarouselItem key={item.id} className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 pl-4">
                <ContentCard item={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </section>

    </div>
  );
}
