
'use server';

import { z } from 'zod';
import { discoverEnhypenContent, ContentDiscoveryOutput } from '@/ai/flows/automated-content-discovery';

const discoverSchema = z.object({
  platforms: z.array(z.enum(['Weverse', 'Netflix', 'YouTube', 'Other'])).min(1, {
    message: 'Please select at least one platform to search.',
  }),
});

export type DiscoverState = {
  errors?: {
    platforms?: string[];
  };
  message?: string | null;
  content?: ContentDiscoveryOutput | null;
};

export async function discoverAction(
  prevState: DiscoverState,
  formData: FormData
): Promise<DiscoverState> {
  const selectedPlatforms = formData.getAll('platforms');

  const validatedFields = discoverSchema.safeParse({
    platforms: selectedPlatforms,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to discover content.',
      content: null,
    };
  }

  try {
    const result = await discoverEnhypenContent(validatedFields.data);
    
    if (result.discoveredContent.length === 0) {
        return {
            message: 'No new content was found on the selected platforms.',
            content: null,
        }
    }

    return {
        message: 'Content discovery successful!',
        content: result,
    }

  } catch (error) {
    console.error(error);
    return {
      message: 'An unexpected error occurred. Please try again.',
      content: null,
    };
  }
}
