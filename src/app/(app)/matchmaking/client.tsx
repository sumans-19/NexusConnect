'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getMatchmakingSuggestions } from '@/app/actions/matchmaking';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { IntelligentMatchmakingOutput } from '@/ai/flows/ai-powered-matchmaking';
import { Loader2, Users, Wand2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const matchmakingSchema = z.object({
  userSkills: z.string().min(3, 'Please list your skills.'),
  userInterests: z.string().min(3, 'Please list your interests.'),
  projectNeeds: z.string().min(10, 'Please describe your project needs in more detail.'),
  emphasizeSkill: z.string().optional(),
});

type MatchmakingFormValues = z.infer<typeof matchmakingSchema>;

export function MatchmakingClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<IntelligentMatchmakingOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<MatchmakingFormValues>({
    resolver: zodResolver(matchmakingSchema),
    defaultValues: {
      userSkills: '',
      userInterests: '',
      projectNeeds: '',
      emphasizeSkill: '',
    },
  });

  async function onSubmit(values: MatchmakingFormValues) {
    setIsLoading(true);
    setResult(null);

    const input = {
        userSkills: values.userSkills.split(',').map(s => s.trim()),
        userInterests: values.userInterests.split(',').map(s => s.trim()),
        projectNeeds: values.projectNeeds,
        emphasizeSkill: values.emphasizeSkill,
    }

    const response = await getMatchmakingSuggestions(input);
    
    if (response.success && response.data) {
        setResult(response.data);
    } else {
        toast({
            variant: "destructive",
            title: "Error",
            description: response.error || "An unexpected error occurred."
        })
    }
    setIsLoading(false);
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><Wand2 className="h-5 w-5"/> Tell Us About Your Project</CardTitle>
                <CardDescription>Provide details below and our AI will suggest potential collaborators.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="userSkills"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Your Skills</FormLabel>
                            <FormControl>
                            <Input placeholder="e.g., React, Python, Figma" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="userInterests"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Your Interests</FormLabel>
                            <FormControl>
                            <Input placeholder="e.g., AI, Web3, Sustainability" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="projectNeeds"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Project Needs</FormLabel>
                            <FormControl>
                            <Textarea rows={4} placeholder="Describe the project and the skills you are looking for..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="emphasizeSkill"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Skill to Emphasize (Optional)</FormLabel>
                            <FormControl>
                            <Input placeholder="e.g., UI/UX Design" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isLoading} className="w-full">
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Users className="mr-2 h-4 w-4" />}
                        Find Collaborators
                    </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
        
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle className="font-headline">AI-Powered Suggestions</CardTitle>
                <CardDescription>Here are your top matches based on your project details.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center">
                {isLoading && (
                    <div className="text-center text-muted-foreground space-y-2">
                        <Loader2 className="mx-auto h-8 w-8 animate-spin" />
                        <p>Our AI is finding the best matches for you...</p>
                    </div>
                )}
                {!isLoading && !result && (
                    <div className="text-center text-muted-foreground">
                        <p>Your results will appear here.</p>
                    </div>
                )}
                {!isLoading && result && (
                    <div className="w-full space-y-4">
                        <div>
                            <h3 className="font-semibold font-headline">Suggested Collaborators</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {result.collaboratorSuggestions.map((name, i) => (
                                    <Badge key={i} variant="default" className="text-sm">{name}</Badge>
                                ))}
                            </div>
                        </div>
                         <div>
                            <h3 className="font-semibold font-headline">Reasoning</h3>
                            <p className="text-sm text-muted-foreground bg-secondary/30 p-3 rounded-md mt-2">{result.reasoning}</p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    </div>
  );
}
