import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Newspaper, Video, Image, Star } from 'lucide-react';
import { contentItems, eras } from '@/lib/data';
import { ContentCard } from '@/components/content/content-card';

export default function Home() {
  const recentVideos = contentItems
    .filter((item) => item.type === 'Video')
    .slice(0, 4);
  const latestNews = contentItems
    .filter((item) => item.type === 'News')
    .slice(0, 5);

  const videoCount = contentItems.filter((item) => item.type === 'Video').length;
  const photoCount = contentItems.filter((item) => item.type === 'Photo').length;
  const newsCount = contentItems.filter((item) => item.type === 'News').length;


  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Welcome to EN-VERSE
        </h1>
        <p className="text-muted-foreground">
          Your central hub for all things Enhypen.
        </p>
      </div>

      <section>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
              <Video className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{videoCount}</div>
              <p className="text-xs text-muted-foreground">
                Music videos, performances, and more
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Photos</CardTitle>
              <Image className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{photoCount}</div>
              <p className="text-xs text-muted-foreground">
                Concept photos, behind-the-scenes
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">News Articles</CardTitle>
              <Newspaper className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{newsCount}</div>
              <p className="text-xs text-muted-foreground">
                Latest updates and announcements
              </p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Album Eras</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{eras.length}</div>
              <p className="text-xs text-muted-foreground">
                From debut to latest comeback
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Recent Videos</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {recentVideos.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      </section>
      
      <section className="space-y-4">
         <h2 className="text-2xl font-semibold tracking-tight">Latest News</h2>
         <Card>
            <CardContent className="p-0">
                <ul className="divide-y divide-border">
                    {latestNews.map(item => (
                        <li key={item.id} className="p-4 hover:bg-muted/50 transition-colors">
                             <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="block">
                                <h3 className="font-medium text-foreground">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.date} &middot; {item.era}</p>
                            </a>
                        </li>
                    ))}
                </ul>
            </CardContent>
         </Card>
      </section>
    </div>
  );
}
