'use client';
import { useState } from 'react';
import type { MonthlyGoal } from '@/lib/types';
import GoalCard from '@/components/goal-card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface GoalsScreenProps {
  monthlyGoals: MonthlyGoal[];
  updateMonthlyGoal: (id: number, field: 'current' | 'target', value: number) => void;
}

export default function GoalsScreen({ monthlyGoals, updateMonthlyGoal }: GoalsScreenProps) {
  const [editingGoalId, setEditingGoalId] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">
          Monthly Goals
        </h1>
        <Button size="icon" className="rounded-xl">
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      <div className="space-y-4">
        {monthlyGoals.map(goal => (
          <GoalCard
            key={goal.id}
            goal={goal}
            isEditing={editingGoalId === goal.id}
            onSetEditing={setEditingGoalId}
            onUpdateGoal={updateMonthlyGoal}
          />
        ))}
      </div>
    </div>
  );
}
