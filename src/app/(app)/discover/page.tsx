import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProjects, getUsers } from "@/lib/db";
import { Search } from "lucide-react";
import Link from "next/link";


export default async function DiscoverPage() {
  const people = await getUsers();
  const projects = await getProjects();

  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-3xl font-bold font-headline">Discover</h1>
        <p className="text-muted-foreground">Find collaborators, projects, and events across campus.</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input placeholder="Search by skill, name, or keyword..." className="pl-12" />
      </div>

      <Tabs defaultValue="people" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="people">People</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>
        <TabsContent value="people" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {people.map((person) => (
              <Card key={person.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex-row items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={person.avatar} alt={person.name} data-ai-hint={person.aiHint} />
                    <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="font-headline">{person.name}</CardTitle>
                    <CardDescription>{person.headline}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                        {person.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                    </div>
                    <Button asChild variant="outline" className="w-full">
                        <Link href={`/profile/${person.id}`}>View Profile</Link>
                    </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="projects" className="mt-6">
        <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                    <CardTitle className="font-headline">{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                        {project.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                    </div>
                    <Button asChild className="w-full mt-2">
                        <Link href="/projects">View Project</Link>
                    </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="events" className="mt-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground">No events found. Check back later!</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
