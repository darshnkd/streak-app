'use server';

/**
 * @fileOverview Provides personalized motivational tips based on task completion history and current streaks.
 *
 * - getMotivationalTip - A function to generate a motivational tip.
 * - MotivationalTipInput - The input type for the getMotivationalTip function.
 * - MotivationalTipOutput - The return type for the getMotivationalTip function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MotivationalTipInputSchema = z.object({
  taskCompletionHistory: z
    .array(z.object({
      taskId: z.number(),
      completed: z.boolean(),
      streak: z.number(),
      name: z.string(),
    }))
    .describe('An array of task completion history objects.'),
});
export type MotivationalTipInput = z.infer<typeof MotivationalTipInputSchema>;

const MotivationalTipOutputSchema = z.object({
  tip: z.string().describe('A personalized motivational tip.'),
});
export type MotivationalTipOutput = z.infer<typeof MotivationalTipOutputSchema>;

export async function getMotivationalTip(input: MotivationalTipInput): Promise<MotivationalTipOutput> {
  return motivationalTipFlow(input);
}

const prompt = ai.definePrompt({
  name: 'motivationalTipPrompt',
  input: {schema: MotivationalTipInputSchema},
  output: {schema: MotivationalTipOutputSchema},
  prompt: `You are a motivational coach. Based on the user's task completion history and current streaks, provide a personalized motivational tip to keep them on track.

Here is the task completion history:

{{#each taskCompletionHistory}}
- Task Name: {{this.name}}, Completed: {{this.completed}}, Streak: {{this.streak}}
{{/each}}

Tip:`,
});

const motivationalTipFlow = ai.defineFlow(
  {
    name: 'motivationalTipFlow',
    inputSchema: MotivationalTipInputSchema,
    outputSchema: MotivationalTipOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
