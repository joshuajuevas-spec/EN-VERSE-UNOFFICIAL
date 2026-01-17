import { notFound } from 'next/navigation';
import { members } from '@/lib/members-data';
import { contentItems } from '@/lib/data';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ContentCard } from '@/components/content/content-card';
import { Calendar, Music4, Film } from 'lucide-react';
import { format } from 'date-fns';

export async function generateStaticParams() {
  return members.map((member) => ({
    slug: member.slug,
  }));
}

export default function MemberProfilePage({ params }: { params: { slug: string } }) {
  const member = members.find((m) => m.slug === params.slug);

  if (!member) {
    notFound();
  }

  const memberContent = contentItems.filter(item => item.memberIds?.includes(member.id));

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header section */}
      <section className="relative w-full h-[50vh] -mt-8 -mx-4 sm:-mx-6 lg:-mx-8">
        <Image
          src={member.avatarUrl.replace('/400/400', '/1200/800')} // use a larger image for banner
          alt={`${member.name} Banner`}
          fill
          className="object-cover object-top"
          priority
          data-ai-hint="kpop idol banner"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end h-full p-4 sm:p-6 lg:p-8 space-y-4">
            <div className="flex items-end gap-6">
                <Avatar className="w-32 h-32 border-4 border-background shadow-lg -mb-12">
                    <AvatarImage src={member.avatarUrl} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                     <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground drop-shadow-lg">
                        {member.name} {member.emoji}
                    </h1>
                    <p className="text-lg text-muted-foreground drop-shadow-md">
                        {member.koreanName}
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* Spacer for avatar overlap */}
      <div className="pt-12">
        <Tabs defaultValue="bio" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="bio">Biography</TabsTrigger>
            <TabsTrigger value="activities">Solo Activities</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
          </TabsList>

          {/* Bio Tab */}
          <TabsContent value="bio">
            <Card>
              <CardHeader>
                <CardTitle>About {member.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 text-muted-foreground">
                    <Badge variant="secondary">{member.position}</Badge>
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Born {format(new Date(member.birthDate), 'MMMM d, yyyy')}</span>
                    </div>
                </div>
                <p className="text-foreground/90 leading-relaxed whitespace-pre-line">
                  {member.bio}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Solo Activities Tab */}
          <TabsContent value="activities">
            <Card>
                <CardHeader>
                    <CardTitle>Solo Activities</CardTitle>
                </CardHeader>
                <CardContent>
                    {member.soloActivities.length > 0 ? (
                        <div className="space-y-4">
                            {member.soloActivities.map((activity, index) => (
                                <a key={index} href={activity.url} target="_blank" rel="noopener noreferrer" className="block p-4 rounded-lg hover:bg-muted/50 transition-colors">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-medium">{activity.title}</p>
                                            <p className="text-sm text-muted-foreground">{activity.date}</p>
                                        </div>
                                        <Music4 className="h-5 w-5 text-muted-foreground"/>
                                    </div>
                                </a>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted-foreground">No solo activities recorded yet.</p>
                    )}
                </CardContent>
            </Card>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery">
            {memberContent.length > 0 ? (
                 <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {memberContent.map((item) => (
                        <ContentCard key={item.id} item={item} />
                    ))}
                </div>
            ) : (
                 <div className="text-center py-12 text-muted-foreground">
                    <p>No gallery content available for {member.name} yet.</p>
                </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
