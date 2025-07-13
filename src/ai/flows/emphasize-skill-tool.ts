// src/ai/flows/emphasize-skill-tool.ts
'use server';

/**
 * @fileOverview AI tool to emphasize a skill in a user's profile for improved matching.
 *
 * - EmphasizeSkillTool - A tool that determines if a specific skill should be emphasized.
 * - EmphasizeSkillInput - The input type for the EmphasizeSkillTool.
 * - EmphasizeSkillOutput - The return type for the EmphasizeSkillTool.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EmphasizeSkillInputSchema = z.object({
  skill: z.string().describe('The skill to evaluate for emphasis.'),
  userProfile: z.string().describe('The user profile information.'),
  projectNeeds: z.string().describe('The needs of the project.'),
});
export type EmphasizeSkillInput = z.infer<typeof EmphasizeSkillInputSchema>;

const EmphasizeSkillOutputSchema = z.object({
  shouldEmphasize: z
    .boolean()
    .describe(
      'Whether the skill should be emphasized based on user profile and project needs.'
    ),
  reason: z.string().describe('The reason for the emphasis decision.'),
});
export type EmphasizeSkillOutput = z.infer<typeof EmphasizeSkillOutputSchema>;

export const emphasizeSkillTool = ai.defineTool(
  {
    name: 'emphasizeSkill',
    description: `Determine if a specific skill should be emphasized, given the user's profile and current project needs.`,    
    inputSchema: EmphasizeSkillInputSchema,
    outputSchema: EmphasizeSkillOutputSchema,
  },
  async input => {
    // Use a prompt to determine if the skill should be emphasized.
    const {skill, userProfile, projectNeeds} = input;

    const promptResult = await ai.generate({
      prompt: `Given the user profile: ${userProfile}, and the project needs: ${projectNeeds}, determine if the skill: ${skill} should be emphasized.
      Return a JSON object with 'shouldEmphasize' as a boolean, and a 'reason' field explaining why or why not the skill should be emphasized.`,
      model: 'googleai/gemini-2.0-flash',
      config: {
        temperature: 0.3,
        responseFormat: 'json',
      },
    });

    try {
      const parsedOutput = JSON.parse(promptResult.text) as EmphasizeSkillOutput;
      return parsedOutput;
    } catch (e) {
      console.error('Failed to parse JSON from the tool, returning shouldEmphasize=false', promptResult.text);
      return {shouldEmphasize: false, reason: 'AI failed to make a determination.'};
    }
  }
);

export async function emphasizeSkill(
  input: EmphasizeSkillInput
): Promise<EmphasizeSkillOutput> {
  return emphasizeSkillTool(input);
}
