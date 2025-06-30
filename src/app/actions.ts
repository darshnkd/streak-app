'use server';

import { getMotivationalTip as getMotivationalTipFlow, type MotivationalTipInput } from '@/ai/flows/motivational-tips';

export async function getMotivationalTip(
  input: MotivationalTipInput,
  _prevState: { tip: string },
  _formData: FormData,
) {
  try {
    const result = await getMotivationalTipFlow(input);
    return { tip: result.tip };
  } catch (error) {
    console.error(error);
    return { tip: 'Could not get a tip right now. Keep up the great work!' };
  }
}
