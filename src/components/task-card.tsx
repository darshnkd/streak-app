'use client';
import type { Task } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Check, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onUpdateValue: (id: string, value: number) => void;
}

export default function TaskCard({ task, onToggleComplete, onUpdateValue }: TaskCardProps) {
  const colorClasses = {
    blue: {
      text: 'text-primary',
      slider: '[&>*:first-child>*]:bg-primary [&>*:last-child]:border-primary'
    },
    purple: {
      text: 'text-accent',
      slider: '[&>*:first-child>*]:bg-accent [&>*:last-child]:border-accent'
    },
    green: {
      text: 'text-green-500',
      slider: '[&>*:first-child>*]:bg-green-500 [&>*:last-child]:border-green-500'
    },
    orange: {
      text: 'text-orange-500',
      slider: '[&>*:first-child>*]:bg-orange-500 [&>*:last-child]:border-orange-500'
    }
  };
  
  return (
    <Card className="shadow-lg border-card/10">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{task.icon}</span>
            <div>
              <h3 className="font-semibold text-lg text-foreground">
                {task.name}
              </h3>
              <div className="flex items-center space-x-2">
                <Flame className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  {task.streak} day streak
                </span>
              </div>
            </div>
          </div>
          <Button
            size="icon"
            variant={task.completed ? 'default' : 'outline'}
            onClick={() => onToggleComplete(task.id)}
            className={cn(
                'w-8 h-8 rounded-full transition-all duration-200',
                task.completed ? 'bg-green-500 hover:bg-green-600 border-green-500' : 'border-muted-foreground'
            )}
            aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
          >
            {task.completed && <Check className="w-5 h-5" />}
          </Button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Progress Today
            </span>
            <span className={cn('text-sm font-medium', colorClasses[task.color]?.text)}>
              {task.currentValue}/{task.targetValue} {task.unit}
            </span>
          </div>

          <Slider
            value={[task.currentValue]}
            max={task.targetValue}
            step={1}
            onValueChange={(value) => onUpdateValue(task.id, value[0])}
            className={cn(colorClasses[task.color]?.slider)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
