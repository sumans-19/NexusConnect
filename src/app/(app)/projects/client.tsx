'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { Project } from '@/lib/types';
import { Loader2, PlusCircle } from 'lucide-react';
import Image from 'next/image';
import { useState, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { createProject } from '@/app/actions/projects';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Post Project
    </Button>
  );
}

export function ProjectsClient({ projects }: { projects: Project[] }) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const [state, formAction] = useActionState(createProject, {
    message: '',
  });

  if (state.message === 'success') {
    toast({
      title: 'Project Posted',
      description:
        'Your new project has been successfully posted and is now live on the board.',
    });
    setOpen(false);
    state.message = ''; // Reset message
  } else if (state.message) {
    toast({
      variant: 'destructive',
      title: 'Error',
      description: state.message,
    });
    state.message = ''; // Reset message
  }

  const handleJoin = (title: string) => {
    toast({
      title: 'Request to Join Sent',
      description: `Your request to join the project "${title}" has been sent to the project owner.`,
    });
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-headline">Project Board</h1>
          <p className="text-muted-foreground">
            Find your next challenge or post an opportunity.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Post a Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Post a New Project</DialogTitle>
              <DialogDescription>
                Share your project idea with the community to find
                collaborators.
              </DialogDescription>
            </DialogHeader>
            <form action={formAction}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Campus Ride-Sharing App"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Project Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe your project in detail..."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skills">Skills Needed</Label>
                  <Input
                    id="skills"
                    name="skills"
                    placeholder="e.g., React Native, Firebase, Node.js"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <SubmitButton />
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map(project => (
          <Card key={project.id} className="flex flex-col">
            <CardHeader>
              <div className="relative h-40 w-full mb-4 overflow-hidden rounded-lg">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  data-ai-hint={project.aiHint}
                />
              </div>
              <CardTitle className="font-headline">{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <h4 className="font-semibold mb-2 text-sm text-muted-foreground">
                Skills Needed
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.skills.map(skill => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => handleJoin(project.title)}
              >
                View & Join
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
