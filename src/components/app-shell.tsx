'use client';

import React, { useState, useEffect } from 'react';
import { Home, BarChart3, Settings, Trophy, Signal, BatteryFull } from 'lucide-react';
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
