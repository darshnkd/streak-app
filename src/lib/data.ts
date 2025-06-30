import type { Task, Todo, MonthlyGoal, Achievement } from '@/lib/types';

export const initialTasks: Task[] = [
  {
    id: 1,
    name: 'DSA Practice',
    icon: '💻',
    completed: false,
    streak: 12,
    currentValue: 3,
    targetValue: 5,
    unit: 'problems',
    color: 'blue'
  },
  {
    id: 2,
    name: 'Project Work',
    icon: '🚀',
    completed: false,
    streak: 8,
    currentValue: 45,
    targetValue: 60,
    unit: 'minutes',
    color: 'purple'
  },
  {
    id: 3,
    name: 'Exercise',
    icon: '💪',
    completed: false,
    streak: 15,
    currentValue: 25,
    targetValue: 30,
    unit: 'minutes',
    color: 'green'
  },
  {
    id: 4,
    name: 'Communication',
    icon: '🗣️',
    completed: false,
    streak: 5,
    currentValue: 0,
    targetValue: 1,
    unit: 'sessions',
    color: 'orange'
  }
];

export const initialTodos: Todo[] = [
  { id: 1, text: 'Review code from yesterday', completed: false },
  { id: 2, text: 'Call dentist for appointment', completed: false },
  { id: 3, text: 'Buy groceries', completed: true },
  { id: 4, text: 'Update resume', completed: false }
];

export const initialMonthlyGoals: MonthlyGoal[] = [
  { id: 1, name: 'DSA Problems', current: 85, target: 100, unit: 'problems', color: 'blue' },
  { id: 2, name: 'Project Hours', current: 45, target: 80, unit: 'hours', color: 'purple' },
  { id: 3, name: 'Workout Days', current: 18, target: 25, unit: 'days', color: 'green' },
  { id: 4, name: 'Communication Sessions', current: 12, target: 20, unit: 'sessions', color: 'orange' }
];

export const initialAchievements: Achievement[] = [
  { id: 1, title: 'Problem Solver', description: 'Solved hardest problem', icon: '🧠', unlocked: true, date: '2024-06-28' },
  { id: 2, title: 'Fitness Beast', description: 'Max 30 push-ups', icon: '💪', unlocked: true, date: '2024-06-25' },
  { id: 3, title: 'Consistency King', description: '7-day streak', icon: '👑', unlocked: true, date: '2024-06-20' },
  { id: 4, title: 'Code Warrior', description: '50 problems solved', icon: '⚔️', unlocked: false, date: null }
];
