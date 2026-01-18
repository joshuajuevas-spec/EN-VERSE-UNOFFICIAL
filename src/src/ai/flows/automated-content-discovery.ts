'use server';

/**
 * @fileOverview This file defines a Genkit flow for automated content discovery related to Enhypen.
 *
 * It includes:
 * - `discoverEnhypenContent`: An asynchronous function that initiates the content discovery process.
 * - `ContentDiscoveryInput`: The input type for the discoverEnhypenContent function, specifying the platforms to crawl.
 * - `ContentDiscoveryOutput`: The output type, detailing the discovered content.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ContentDiscoveryInputSchema = z.object({
  platforms: z
    .array(z.enum(['Weverse', 'Netflix', 'YouTube', 'Other']))
    .describe('An array of platforms to crawl for new Enhypen content.'),
});
export type ContentDiscoveryInput = z.infer<typeof ContentDiscoveryInputSchema>;

const ContentDiscoveryOutputSchema = z.object({
  discoveredContent: z
    .array(z.string())
    .describe('A list of URLs or descriptions of the new Enhypen content found.'),
});
export type ContentDiscoveryOutput = z.infer<typeof ContentDiscoveryOutputSchema>;

export async function discoverEnhypenContent(input: ContentDiscoveryInput): Promise<ContentDiscoveryOutput> {
  return discoverEnhypenContentFlow(input);
}

const discoverEnhypenContentPrompt = ai.definePrompt({
  name: 'discoverEnhypenContentPrompt',
  input: {schema: ContentDiscoveryInputSchema},
  output: {schema: ContentDiscoveryOutputSchema},
  prompt: `You are an AI assistant specialized in discovering new content related to Enhypen, a South Korean-Japanese boy band.

  Based on the provided list of platforms, search for any new content related to Enhypen, such as new videos, news articles, or social media posts.
  Return a list of URLs or descriptions of the new content found on these platforms:

  Platforms: {{platforms}}

  Ensure that the content is recent and relevant to Enhypen.
  Return the discovered content as a JSON array of strings.`,
});

const discoverEnhypenContentFlow = ai.defineFlow(
  {
    name: 'discoverEnhypenContentFlow',
    inputSchema: ContentDiscoveryInputSchema,
    outputSchema: ContentDiscoveryOutputSchema,
  },
  async input => {
    const {output} = await discoverEnhypenContentPrompt(input);
    return output!;
  }
);
