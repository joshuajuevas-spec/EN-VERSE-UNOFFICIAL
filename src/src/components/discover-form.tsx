
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { discoverAction } from '@/lib/actions';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Terminal, Bot, Link as LinkIcon, AlertCircle } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const platforms = ['Weverse', 'Netflix', 'YouTube', 'Other'] as const;

const initialState = {
  message: null,
  errors: {},
  content: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Discovering...' : 'Discover Content'}
    </Button>
  );
}

export function DiscoverForm() {
  const [state, formAction] = useFormState(discoverAction, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-4">
        <Label>Platforms to crawl</Label>
        <div className="grid grid-cols-2 gap-4">
          {platforms.map((platform) => (
            <div key={platform} className="flex items-center space-x-2">
              <Checkbox id={`platform-${platform}`} name="platforms" value={platform} />
              <Label htmlFor={`platform-${platform}`} className="font-normal">
                {platform}
              </Label>
            </div>
          ))}
        </div>
        {state.errors?.platforms && (
          <p className="text-sm font-medium text-destructive">
            {state.errors.platforms[0]}
          </p>
        )}
      </div>

      <SubmitButton />

      {state.message && (
        <Alert variant={state.content ? "default" : "destructive"}>
           {state.content ? <Bot className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          <AlertTitle>{state.content ? "Discovery Result" : "Notice"}</AlertTitle>
          <AlertDescription>
            {state.message}
          </AlertDescription>
        </Alert>
      )}

      {state.content?.discoveredContent && state.content.discoveredContent.length > 0 && (
         <div className="space-y-4">
            <h3 className="font-semibold text-lg">Discovered Content</h3>
            <div className="space-y-2">
            {state.content.discoveredContent.map((item, index) => (
                <Card key={index} className="bg-muted/50">
                    <CardContent className="p-3 flex items-start gap-3">
                        <LinkIcon className="h-5 w-5 text-muted-foreground mt-1 shrink-0"/>
                        <p className="text-sm text-foreground break-all">{item}</p>
                    </CardContent>
                </Card>
            ))}
            </div>
         </div>
      )}
    </form>
  );
}
