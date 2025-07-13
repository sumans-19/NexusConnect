'use server';

import { createProject as dbCreateProject } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const projectSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  description: z.string().min(1, 'Description is required.'),
  skills: z.string().min(1, 'Skills are required.'),
});

export async function createProject(prevState: any, formData: FormData) {
  const validatedFields = projectSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    skills: formData.get('skills'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data. Please check your inputs.',
    };
  }

  try {
    const newProject = {
      ...validatedFields.data,
      id: crypto.randomUUID(),
      skills: validatedFields.data.skills.split(',').map(s => s.trim()),
      image: 'https://placehold.co/600x400.png',
      aiHint: 'new project',
    };
    await dbCreateProject(newProject);
    revalidatePath('/projects');
    return { message: 'success' };
  } catch (e) {
    console.error(e);
    return { message: 'Failed to create project.' };
  }
}
