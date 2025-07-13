// This is a server-side file.
'use server';

/**
 * @fileOverview AI-powered skill matching engine that suggests potential collaborators based on skills, interests, and project needs.
 *
 * - intelligentMatchmaking - A function that suggests potential collaborators.
 * - IntelligentMatchmakingInput - The input type for the intelligentMatchmaking function.
 * - IntelligentMatchmakingOutput - The return type for the intelligentMatchmaking function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntelligentMatchmakingInputSchema = z.object({
  userSkills: z
    .array(z.string())
    .describe('List of skills the user possesses.'),
  userInterests: z
    .array(z.string())
    .describe('List of interests of the user.'),
  projectNeeds: z
    .string()
    .describe('Description of the project and required skills.'),
  emphasizeSkill: z.string().optional().describe('Specific skill to emphasize in the matching process.')
});

export type IntelligentMatchmakingInput = z.infer<
  typeof IntelligentMatchmakingInputSchema
>;

const IntelligentMatchmakingOutputSchema = z.object({
  collaboratorSuggestions: z
    .array(z.string())
    .describe('List of 3-5 plausible-sounding, fictional student names as potential collaborators.'),
  reasoning: z
    .string()
    .describe('Explanation of why these collaborators were suggested.'),
});

export type IntelligentMatchmakingOutput = z.infer<
  typeof IntelligentMatchmakingOutputSchema
>;

const shouldEmphasizeSkill = ai.defineTool({
  name: 'shouldEmphasizeSkill',
  description: 'Determines if a specific skill is relevant to the project needs and should be emphasized when suggesting collaborators.',
  inputSchema: z.object({
    skill: z.string().describe('The skill to consider.'),
    projectNeeds: z.string().describe('The project needs description.')
  }),
  outputSchema: z.boolean(),
}, async (input) => {
  // This is a placeholder implementation. A real app might use more complex logic.
  return input.projectNeeds.toLowerCase().includes(input.skill.toLowerCase());
});

const intelligentMatchmakingPrompt = ai.definePrompt({
  name: 'intelligentMatchmakingPrompt',
  input: {schema: IntelligentMatchmakingInputSchema},
  output: {schema: IntelligentMatchmakingOutputSchema},
  tools: [shouldEmphasizeSkill],
  prompt: `You are an AI-powered matchmaking engine for a student project platform called NexusConnect.

  User Skills: {{#each userSkills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  User Interests: {{#each userInterests}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  Project Needs: {{{projectNeeds}}}

  Instructions:
  1. Analyze the user's skills, interests, and the project needs.
  2. Identify 3-5 plausible-sounding, fictional student names as potential collaborators. These collaborators should have skills and interests relevant to the project.
  3. Explain your reasoning for suggesting these collaborators in a friendly and helpful tone.
  {{#if emphasizeSkill}}
  4. The user wants to emphasize the skill: '{{emphasizeSkill}}'. Use the 'shouldEmphasizeSkill' tool to check if this skill is relevant to the project needs. If the tool returns true, make sure your suggestions strongly reflect this by suggesting collaborators who are experts in '{{emphasizeSkill}}' and mention this in your reasoning.
  {{/if}}
  
  Your entire response must be in the structured JSON format defined by the output schema.
  `,
});

const intelligentMatchmakingFlow = ai.defineFlow(
  {
    name: 'intelligentMatchmakingFlow',
    inputSchema: IntelligentMatchmakingInputSchema,
    outputSchema: IntelligentMatchmakingOutputSchema,
  },
  async input => {
    const {output} = await intelligentMatchmakingPrompt(input);
    return output!;
  }
);

export async function intelligentMatchmaking(
  input: IntelligentMatchmakingInput
): Promise<IntelligentMatchmakingOutput> {
  return intelligentMatchmakingFlow(input);
}
