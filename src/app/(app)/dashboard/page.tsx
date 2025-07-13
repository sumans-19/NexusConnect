'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, Briefcase, Users, Megaphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

const recommendedProjects = [
  {
    title: "AI-Powered Study Buddy",
    description: "Build an AI tutor that helps students prepare for exams with personalized quizzes.",
    skills: ["React", "Python", "NLP", "Machine Learning"],
    image: "https://placehold.co/600x400.png",
    aiHint: "robot book"
  },
  {
    title: "Campus Sustainability Tracker",
    description: "Develop a web app to track and promote sustainable practices on campus.",
    skills: ["Next.js", "Node.js", "MongoDB", "Data Visualization"],
    image: "https://placehold.co/600x400.png",
    aiHint: "campus sustainability"
  },
];

const recommendedCollaborators = [
  { name: "Alice Johnson", skills: ["UI/UX Design", "Figma"], avatar: "https://placehold.co/100x100.png", aiHint: "woman portrait" },
  { name: "Bob Williams", skills: ["Backend", "DevOps"], avatar: "https://placehold.co/100x100.png", aiHint: "man portrait" },
  { name: "Charlie Brown", skills: ["Cybersecurity", "Penetration Testing"], avatar: "https://placehold.co/100x100.png", aiHint: "person smiling" },
];

const upcomingEvents = [
  { title: "Campus Hackathon 2024", date: "Oct 26-27, 2024", type: "Hackathon" },
  { title: "Intro to Web3 Workshop", date: "Nov 5, 2024", type: "Workshop" },
];

export default function DashboardPage() {
  const { toast } = useToast();

  const handleConnect = (name: string) => {
    toast({
      title: "Connection Request Sent",
      description: `Your request to connect with ${name} has been sent.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold font-headline text-primary">Welcome back, Alex!</h1>
        <p className="text-muted-foreground">Here's your personalized hub for collaboration and growth.</p>
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-primary/20 via-card/60 to-card/60">
            <Briefcase className="w-10 h-10 mb-2 text-primary"/>
            <h3 className="text-lg font-semibold font-headline">Explore Projects</h3>
            <p className="text-sm text-muted-foreground">Find exciting projects to join.</p>
            <Button asChild variant="link" size="sm" className="mt-2">
                <Link href="/projects">Browse Now</Link>
            </Button>
        </Card>
         <Card className="flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-accent/20 via-card/60 to-card/60">
            <Users className="w-10 h-10 mb-2 text-accent"/>
            <h3 className="text-lg font-semibold font-headline">Find Collaborators</h3>
            <p className="text-sm text-muted-foreground">Connect with talented peers.</p>
             <Button asChild variant="link" size="sm" className="mt-2 text-accent">
                <Link href="/discover">Search People</Link>
            </Button>
        </Card>
        <Card className="flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-chart-5/20 via-card/60 to-card/60">
             <Megaphone className="w-10 h-10 mb-2 text-chart-5"/>
            <h3 className="text-lg font-semibold font-headline">Join Events</h3>
            <p className="text-sm text-muted-foreground">Attend workshops & hackathons.</p>
             <Button asChild variant="link" size="sm" className="mt-2 text-chart-5">
                <Link href="/events">See Events</Link>
            </Button>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-5">
        <div className="space-y-6 xl:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Recommended Projects for You</CardTitle>
              <CardDescription>Handpicked projects that match your skills and interests.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendedProjects.map((project, index) => (
                <Card key={index} className="flex flex-col md:flex-row items-center gap-4 p-4 overflow-hidden">
                  <Image src={project.image} alt={project.title} width={150} height={100} className="rounded-lg object-cover w-full md:w-[150px]" data-ai-hint={project.aiHint}/>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold font-headline">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                    </div>
                  </div>
                  <Button asChild variant="ghost" size="icon" className="shrink-0">
                    <Link href="/projects">
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6 xl:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Suggested Collaborators</CardTitle>
              <CardDescription>Connect with peers who complement your skills.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendedCollaborators.map((person, index) => (
                <div key={index} className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={person.avatar} alt={person.name} data-ai-hint={person.aiHint} />
                    <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold">{person.name}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                        {person.skills.map(skill => <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>)}
                    </div>
                  </div>
                  <Button size="sm" onClick={() => handleConnect(person.name)}>Connect</Button>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingEvents.map((event, index) => (
                 <div key={index} className="flex items-center gap-4">
                    <div className="flex-1">
                        <p className="font-semibold">{event.title}</p>
                        <p className="text-sm text-muted-foreground">{event.date}</p>
                    </div>
                    <Badge variant="accent">{event.type}</Badge>
                 </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
