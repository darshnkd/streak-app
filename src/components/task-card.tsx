'use client';
import type { Task } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Check, Flame, Minus, Plus } from 'lucide-react';
import { cn, getColorClasses } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: number) => void;
  onUpdateValue: (id: number, value: number) => void;
}

export default function TaskCard({ task, onToggleComplete, onUpdateValue }: TaskCardProps) {
  const progressPercentage = Math.min((task.currentValue / task.targetValue) * 100, 100);

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
                <Flame className="w-4 h-4 text-orange-500" />
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
            <span className={cn('text-sm font-medium', getColorClasses(task.color, 'text'))}>
              {task.currentValue}/{task.targetValue} {task.unit}
            </span>
          </div>

          <div className="flex items-center justify-between bg-muted/50 rounded-lg p-2">
            <Button
              size="icon"
              className={cn('w-8 h-8 rounded-md', getColorClasses(task.color, 'bg'))}
              onClick={() => onUpdateValue(task.id, task.currentValue - 1)}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="font-semibold text-lg text-foreground">
              {task.currentValue}
            </span>
            <Button
              size="icon"
              className={cn('w-8 h-8 rounded-md', getColorClasses(task.color, 'bg'))}
              onClick={() => onUpdateValue(task.id, task.currentValue + 1)}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <Progress value={progressPercentage} className={cn('h-2 [&>*]:transition-all [&>*]:duration-300', getColorClasses(task.color, 'bg'))} />
        </div>
      </CardContent>
    </Card>
  );
}
