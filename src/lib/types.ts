export type Task = {
  id: number;
  name: string;
  icon: string;
  completed: boolean;
  streak: number;
  currentValue: number;
  targetValue: number;
  unit: string;
  color: 'blue' | 'purple' | 'green' | 'orange';
};

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export type MonthlyGoal = {
  id: number;
  name: string;
  current: number;
  target: number;
  unit: string;
  color: 'blue' | 'purple' | 'green' | 'orange';
};

export type Achievement = {
  id: number;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  date: string | null;
};

export type ActiveTab = 'home' | 'goals' | 'achievements' | 'settings';
