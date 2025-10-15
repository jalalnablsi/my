'use server';

/**
 * @fileOverview A flow that calculates the AI readiness score (GEO) for a given website.
 *
 * - aiReadinessScore - A function that calculates the AI readiness score for a website.
 * - AiReadinessScoreInput - The input type for the aiReadinessScore function.
 * - AiReadinessScoreOutput - The return type for the aiReadinessScore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiReadinessScoreInputSchema = z.object({
  url: z.string().describe('The URL of the website to analyze.'),
});
export type AiReadinessScoreInput = z.infer<typeof AiReadinessScoreInputSchema>;

const AiReadinessScoreOutputSchema = z.object({
  ai_score: z
    .number()
    .describe(
      'The AI readiness score of the website, on a scale of 0 to 100.  A higher score indicates better AI readiness.'
    ),
  grade: z
    .string()
    .describe(
      'The AI readiness grade of the website. A higher grade indicates better AI readiness.'
    ),
  summary: z
    .string()
    .describe(
      'A summary of the AI readiness of the website, including strengths and weaknesses.'
    ),
});
export type AiReadinessScoreOutput = z.infer<typeof AiReadinessScoreOutputSchema>;

export async function aiReadinessScore(
  input: AiReadinessScoreInput
): Promise<AiReadinessScoreOutput> {
  return aiReadinessScoreFlow(input);
}

const aiReadinessPrompt = ai.definePrompt({
  name: 'aiReadinessPrompt',
  input: {schema: AiReadinessScoreInputSchema},
  output: {schema: AiReadinessScoreOutputSchema},
  prompt: `You are an AI website analyst.  You will analyze a website and determine how well it is structured for AI content consumption and interaction.  You will provide a score, a grade, and a summary of the AI readiness of the website.

Analyze the following website:
URL: {{{url}}}

Output the AI readiness score, grade, and summary in JSON format. The score should be on a scale of 0 to 100. The grade should be A, B, C, D, or F.

Here is the desired JSON format:
{
  "ai_score": number,
  "grade": string,
  "summary": string
}

Ensure that the JSON is valid. Here are the grade boundaries:
- 90-100: A
- 80-89: B
- 70-79: C
- 60-69: D
- 0-59: F`,
});

const aiReadinessScoreFlow = ai.defineFlow(
  {
    name: 'aiReadinessScoreFlow',
    inputSchema: AiReadinessScoreInputSchema,
    outputSchema: AiReadinessScoreOutputSchema,
  },
  async input => {
    const {output} = await aiReadinessPrompt(input);
    return output!;
  }
);
