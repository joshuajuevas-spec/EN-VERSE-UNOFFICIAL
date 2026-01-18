import { DiscoverForm } from '@/components/discover-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

export default function DiscoverPage() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="text-center">
        <Sparkles className="mx-auto h-12 w-12 text-primary mb-4" />
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Automated Content Discovery
        </h1>
        <p className="text-muted-foreground mt-2">
          Use AI to crawl platforms and find the latest content about Enhypen.
        </p>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Start Discovery</CardTitle>
            <CardDescription>Select the platforms you want to search for new content.</CardDescription>
        </CardHeader>
        <CardContent>
            <DiscoverForm />
        </CardContent>
      </Card>
    </div>
  );
}
