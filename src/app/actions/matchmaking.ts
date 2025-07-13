'use server';

import {
  intelligentMatchmaking,
  type IntelligentMatchmakingInput,
} from '@/ai/flows/ai-powered-matchmaking';

export async function getMatchmakingSuggestions(
  input: IntelligentMatchmakingInput
) {
  try {
    // In a real app, you would fetch available users from a database.
    // Here we are mocking that part as the AI will generate plausible names.
    const result = await intelligentMatchmaking(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Matchmaking AI flow failed:', error);
    return {
      success: false,
      error: 'Failed to get suggestions from AI. Please try again.',
    };
  }
}
