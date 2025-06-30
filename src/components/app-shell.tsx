'use client';

import React, { useState, useEffect } from 'react';
import { Home, BarChart3, Settings, Trophy } from 'lucide-react';
import type { ActiveTab, Task, Todo, MonthlyGoal, Achievement } from '@/lib/types';
import { initialTasks, initialTodos, initialMonthlyGoals, initialAchievements } from '@/lib/data';
import HomeScreen from './screens/home-screen';
import GoalsScreen from './screens/goals-screen';
import AchievementsScreen from './screens/achievements-screen';
import SettingsScreen from './screens/settings-screen';
import { cn } from '@/lib/utils';

const navItems = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'goals', icon: BarChart3, label: 'Goals' },
  { id: 'achievements', icon: Trophy, label: 'Achievements' },
  { id: 'settings', icon: Settings, label: 'Settings' },
] as const;

export default function AppShell() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [darkMode, setDarkMode] = useState(false);
  
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [monthlyGoals, setMonthlyGoals] = useState<MonthlyGoal[]>(initialMonthlyGoals);
  const [achievements] = useState<Achievement[]>(initialAchievements);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleTask = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const updateTaskValue = (taskId: number, newValue: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, currentValue: Math.max(0, newValue) } : task
    ));
  };

  const updateMonthlyGoal = (goalId: number, field: 'current' | 'target', value: number) => {
    setMonthlyGoals(monthlyGoals.map(goal => 
      goal.id === goalId ? { ...goal, [field]: Math.max(0, value) } : goal
    ));
  };

  const toggleTodo = (todoId: number) => {
    setTodos(todos.map(todo => 
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const addTodo = (newTodoText: string) => {
    if (newTodoText.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: newTodoText.trim(),
        completed: false
      }]);
    }
  };

  const deleteTodo = (todoId: number) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  const renderScreen = () => {
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
        return <SettingsScreen darkMode={darkMode} setDarkMode={setDarkMode} />;
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
          <div className="flex items-center space-x-1">
            <svg width="67" height="12" viewBox="0 0 67 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-foreground">
              <path d="M6.5 11.5C10.0899 11.5 13 8.58985 13 5V2.5C13 1.11929 11.8807 0 10.5 0H2.5C1.11929 0 0 1.11929 0 2.5V5C0 8.58985 2.91015 11.5 6.5 11.5Z" fill="currentColor"/>
              <path d="M20.5 11.5C24.0899 11.5 27 8.58985 27 5V2.5C27 1.11929 25.8807 0 24.5 0H16.5C15.1193 0 14 1.11929 14 2.5V5C14 8.58985 16.9101 11.5 20.5 11.5Z" fill="currentColor"/>
              <path d="M34.5 11.5C38.0899 11.5 41 8.58985 41 5V2.5C41 1.11929 39.8807 0 38.5 0H30.5C29.1193 0 28 1.11929 28 2.5V5C28 8.58985 30.9101 11.5 34.5 11.5Z" fill="currentColor"/>
              <path d="M48.5 11.5C52.0899 11.5 55 8.58985 55 5V2.5C55 1.11929 53.8807 0 52.5 0H44.5C43.1193 0 42 1.11929 42 2.5V5C42 8.58985 44.9101 11.5 48.5 11.5Z" fill="currentColor"/>
              <path d="M64.5 1.3441C65.572 1.3441 66.2082 2.40114 65.7328 3.32139L63.535 7.23438C63.2241 7.78507 62.5905 8.10699 61.9057 8.10699H58.0943C57.4095 8.10699 56.7759 7.78507 56.465 7.23438L54.2672 3.32139C53.7918 2.40114 54.428 1.3441 55.455 1.3441H64.5Z" fill="currentColor"/>
            </svg>
            <span className="text-xs text-foreground">100%</span>
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
