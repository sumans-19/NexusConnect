'use server';

import { updateUser } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const profileSchema = z.object({
  id: z.string(),
  name: z.string().min(2, 'Full name must be at least 2 characters.'),
  headline: z.string().min(3, 'Headline is too short.'),
  skills: z.string(),
  interests: z.string(),
  availability: z.string(),
});

export async function updateProfile(prevState: any, formData: FormData) {
  const validatedFields = profileSchema.safeParse({
    id: formData.get('id'),
    name: formData.get('name'),
    headline: formData.get('headline'),
    skills: formData.get('skills'),
    interests: formData.get('interests'),
    availability: formData.get('availability'),
  });

  if (!validatedFields.success) {
    return {
      message:
        validatedFields.error.errors[0]?.message ||
        'Invalid data provided.',
    };
  }

  try {
    const { id, name, headline, skills, interests, availability } = validatedFields.data;
    await updateUser(id, {
        name,
        headline,
        skills: skills.split(',').map(s => s.trim()),
        interests: interests.split(',').map(s => s.trim()),
        availability,
    });
    
    revalidatePath('/profile');
    return { message: 'success' };
  } catch (e: any) {
    console.error(e);
    return { message: e.message || 'Failed to update profile.' };
  }
}
