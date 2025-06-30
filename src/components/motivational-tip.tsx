'use client';

import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { getMotivationalTip } from '@/app/actions';
import type { Task } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Loader2, Lightbulb } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" />}
      Get a Tip
    </Button>
  );
}

export function MotivationalTip({ tasks }: { tasks: Task[] }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const getMotivationalTipWithTasks = getMotivationalTip.bind(null, {
    taskCompletionHistory: tasks.map(t => ({
      taskId: t.id,
      completed: t.completed,
      streak: t.streak,
      name: t.name,
    })),
  });

  const [state, formAction] = useFormState(getMotivationalTipWithTasks, { tip: '' });

  return (
    <>
      <form action={formAction}>
        <SubmitButton />
      </form>

      <Dialog open={!!state?.tip} onOpenChange={() => formAction({ tip: '' })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Lightbulb className="mr-2 h-5 w-5 text-yellow-400" />
              Your Motivational Tip!
            </DialogTitle>
            <DialogDescription className="pt-4 text-lg text-foreground">
              {state?.tip}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => formAction({ tip: '' })}>Got it!</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
