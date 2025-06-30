'use client';
import type { MonthlyGoal } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit3, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GoalCardProps {
  goal: MonthlyGoal;
  isEditing: boolean;
  onSetEditing: (id: number | null) => void;
  onUpdateGoal: (id: number, field: 'current' | 'target', value: number) => void;
}

export default function GoalCard({ goal, isEditing, onSetEditing, onUpdateGoal }: GoalCardProps) {
  const progressPercentage = goal.target > 0 ? Math.min((goal.current / goal.target) * 100, 100) : 0;
  const isBehindTarget = goal.current < goal.target * 0.7;
  
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const daysRemaining = Math.max(1, daysInMonth - today.getDate());
  const dailyTarget = goal.target > goal.current ? Math.ceil((goal.target - goal.current) / daysRemaining) : 0;

  return (
    <Card className="shadow-lg border-card/10">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg text-foreground">
            {goal.name}
          </h3>
          <Button variant="ghost" size="icon" onClick={() => onSetEditing(isEditing ? null : goal.id)} className="w-8 h-8">
            <Edit3 className="w-4 h-4 text-muted-foreground" />
          </Button>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor={`current-${goal.id}`} className="block text-sm font-medium mb-2 text-muted-foreground">
                Current Progress
              </Label>
              <Input
                id={`current-${goal.id}`}
                type="number"
                value={goal.current}
                onChange={(e) => onUpdateGoal(goal.id, 'current', parseInt(e.target.value) || 0)}
                className="rounded-xl"
              />
            </div>
            <div>
              <Label htmlFor={`target-${goal.id}`} className="block text-sm font-medium mb-2 text-muted-foreground">
                Monthly Target
              </Label>
              <Input
                id={`target-${goal.id}`}
                type="number"
                value={goal.target}
                onChange={(e) => onUpdateGoal(goal.id, 'target', parseInt(e.target.value) || 0)}
                className="rounded-xl"
              />
            </div>
             <Button onClick={() => onSetEditing(null)} className="w-full">Done</Button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-3">
              <span className="text-muted-foreground">
                {goal.current} / {goal.target} {goal.unit}
              </span>
              <span className="font-medium text-primary">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            
            <Progress value={progressPercentage} className="h-3 mb-4"/>

            {isBehindTarget && dailyTarget > 0 && (
              <div className="flex items-center space-x-2 text-orange-500 text-sm p-2 bg-orange-500/10 rounded-md">
                <Target className="w-4 h-4" />
                <span>Behind target - need {dailyTarget} per day</span>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
