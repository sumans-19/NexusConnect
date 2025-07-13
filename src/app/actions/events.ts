'use server';

import { createEvent as dbCreateEvent } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const eventSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  date: z.string().min(1, 'Date is required.'),
  location: z.string().min(1, 'Location is required.'),
  description: z.string().min(1, 'Description is required.'),
});

export async function createEvent(prevState: any, formData: FormData) {
  const validatedFields = eventSchema.safeParse({
    title: formData.get('title'),
    date: formData.get('date'),
    location: formData.get('location'),
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data. Please check your inputs.',
    };
  }
  
  try {
    const newEvent = {
        ...validatedFields.data,
        id: crypto.randomUUID(),
        image: 'https://placehold.co/600x400.png',
        aiHint: 'new event',
    }
    await dbCreateEvent(newEvent);
    revalidatePath('/events');
    return { message: 'success' };
  } catch (e) {
    console.error(e);
    return { message: 'Failed to create event.' };
  }
}
