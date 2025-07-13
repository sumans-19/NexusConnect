'use client';

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
import { useToast } from '@/hooks/use-toast';
import type { Event } from '@/lib/types';
import { Calendar, Loader2, MapPin, PlusCircle } from 'lucide-react';
import Image from 'next/image';
import { useState, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { createEvent } from '@/app/actions/events';
import { Textarea } from '@/components/ui/textarea';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Create Event
    </Button>
  );
}

export function EventsClient({ events }: { events: Event[] }) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const [state, formAction] = useActionState(createEvent, {
    message: '',
  });

  if (state.message === 'success') {
    toast({
      title: 'Event Created',
      description:
        'Your new event has been successfully created and is pending review.',
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

  const handleRsvp = (title: string) => {
    toast({
      title: 'RSVP Successful',
      description: `You have successfully RSVP'd to ${title}.`,
    });
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-headline">
            Events & Workshops
          </h1>
          <p className="text-muted-foreground">
            Get involved, learn new skills, and connect with the community.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create a New Event</DialogTitle>
              <DialogDescription>
                Fill out the details below to create a new event for the
                community.
              </DialogDescription>
            </DialogHeader>
            <form action={formAction}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Event Title"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Date & Time
                  </Label>
                  <Input
                    id="date"
                    name="date"
                    type="datetime-local"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Location
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="e.g., Online or Building Name"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe the event..."
                    className="col-span-3"
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
        {events.map(event => (
          <Card key={event.id} className="flex flex-col overflow-hidden">
            <div className="relative h-48 w-full">
              <Image
                src={event.image}
                alt={event.title}
                layout="fill"
                objectFit="cover"
                data-ai-hint={event.aiHint}
              />
            </div>
            <CardHeader>
              <CardTitle className="font-headline">{event.title}</CardTitle>
              <CardDescription>{event.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{new Date(event.date).toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{event.location}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => handleRsvp(event.title)}
              >
                RSVP Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
