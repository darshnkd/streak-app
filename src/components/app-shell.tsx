'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Home, BarChart3, Settings, Trophy, Signal, BatteryFull, Loader2 } from 'lucide-react';
import type { ActiveTab, Task, Todo, MonthlyGoal, Achievement } from '@/lib/types';
import { initialAchievements } from '@/lib/data';
import HomeScreen from './screens/home-screen';
import GoalsScreen from './screens/goals-screen';
import AchievementsScreen from './screens/achievements-screen';
import SettingsScreen from './screens/settings-screen';
import { cn } from '@/lib/utils';
import type { User } from 'firebase/auth';
import { 
  getUserData, 
  updateTaskInDb, 
  updateTodoInDb, 
  addTodoInDb, 
  deleteTodoInDb, 
  updateMonthlyGoalInDb 
} from '@/lib/firestore';

const navItems = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'goals', icon: BarChart3, label: 'Goals' },
  { id: 'achievements', icon: Trophy, label: 'Achievements' },
  { id: 'settings', icon: Settings, label: 'Settings' },
] as const;

export default function AppShell({ user }: { user: User }) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [darkMode, setDarkMode] = useState(false);
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [monthlyGoals, setMonthlyGoals] = useState<MonthlyGoal[]>([]);
  const [achievements] = useState<Achievement[]>(initialAchievements);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getUserData(user.uid)
        .then(data => {
          setTasks(data.tasks);
          setTodos(data.todos);
          setMonthlyGoals(data.monthlyGoals);
        })
        .catch(console.error)
        .finally(() => setDataLoading(false));
    }
  }, [user]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleTask = useCallback(async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    const newCompleted = !task.completed;
    setTasks(currentTasks => currentTasks.map(t => 
      t.id === taskId ? { ...t, completed: newCompleted } : t
    ));
    await updateTaskInDb(user.uid, taskId, { completed: newCompleted });
  }, [tasks, user.uid]);

  const updateTaskValue = useCallback(async (taskId: string, newValue: number) => {
    const newCurrentValue = Math.max(0, newValue);
    setTasks(currentTasks => currentTasks.map(t => 
      t.id === taskId ? { ...t, currentValue: newCurrentValue } : t
    ));
    await updateTaskInDb(user.uid, taskId, { currentValue: newCurrentValue });
  }, [user.uid]);

  const updateMonthlyGoal = useCallback(async (goalId: string, field: 'current' | 'target', value: number) => {
    const newFieldValue = Math.max(0, value);
    setMonthlyGoals(currentGoals => currentGoals.map(goal => 
      goal.id === goalId ? { ...goal, [field]: newFieldValue } : goal
    ));
    await updateMonthlyGoalInDb(user.uid, goalId, { [field]: newFieldValue });
  }, [user.uid]);

  const toggleTodo = useCallback(async (todoId: string) => {
    const todo = todos.find(t => t.id === todoId);
    if (!todo) return;
    const newCompleted = !todo.completed;
    setTodos(currentTodos => currentTodos.map(t => 
      t.id === todoId ? { ...t, completed: newCompleted } : t
    ));
    await updateTodoInDb(user.uid, todoId, { completed: newCompleted });
  }, [todos, user.uid]);

  const addTodo = useCallback(async (newTodoText: string) => {
    if (newTodoText.trim()) {
      const newTodo = await addTodoInDb(user.uid, newTodoText.trim());
      setTodos(prevTodos => [...prevTodos, newTodo]);
    }
  }, [user.uid]);

  const deleteTodo = useCallback(async (todoId: string) => {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== todoId));
    await deleteTodoInDb(user.uid, todoId);
  }, [user.uid]);

  const renderScreen = () => {
    if (dataLoading) {
      return (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      );
    }
    
    switch (activeTab) {
      case 'home': 
        return <HomeScreen 
          tasks={tasks}
          todos={todos}
          toggleTask={toggleTask}
          updateTaskValue={updateTaskValue}
          toggleTodo={toggleTodo}
          addTodo={addTodo}
          deleteTodo={deleteTodo}
        />;
      case 'goals': 
        return <GoalsScreen 
          monthlyGoals={monthlyGoals}
          updateMonthlyGoal={updateMonthlyGoal}
        />;
      case 'achievements': 
        return <AchievementsScreen achievements={achievements} />;
      case 'settings': 
        return <SettingsScreen user={user} darkMode={darkMode} setDarkMode={setDarkMode} />;
      default: 
        return <HomeScreen 
          tasks={tasks}
          todos={todos}
          toggleTask={toggleTask}
          updateTaskValue={updateTaskValue}
          toggleTodo={toggleTodo}
          addTodo={addTodo}
          deleteTodo={deleteTodo}
        />;
    }
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-200">
      <div className="bg-card flex items-center justify-center h-11">
        <div className="w-full max-w-sm mx-auto flex justify-between items-center px-6 text-sm font-medium">
          <span className="text-foreground">9:41</span>
          <div className="flex items-center space-x-2 text-foreground">
            <Signal size={16} />
            <div className="flex items-center space-x-1">
              <BatteryFull size={20} />
              <span className="text-xs text-foreground">100%</span>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-sm mx-auto bg-transparent min-h-screen">
        <div className="px-4 pt-6 pb-28">
          {renderScreen()}
        </div>
      </main>

      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-card/80 backdrop-blur-lg border-t">
        <div className="flex justify-around py-2">
          {navItems.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 w-20',
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <tab.icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
