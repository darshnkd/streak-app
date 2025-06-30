'use client';
import type { Task, Todo } from '@/lib/types';
import TaskCard from '@/components/task-card';
import TodoList from '@/components/todo-list';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MotivationalTip } from '@/components/motivational-tip';

interface HomeScreenProps {
  tasks: Task[];
  todos: Todo[];
  toggleTask: (id: string) => void;
  updateTaskValue: (id: string, value: number) => void;
  toggleTodo: (id: string) => void;
  addTodo: (text: string) => void;
  deleteTodo: (id: string) => void;
}

export default function HomeScreen({
  tasks,
  todos,
  toggleTask,
  updateTaskValue,
  toggleTodo,
  addTodo,
  deleteTodo
}: HomeScreenProps) {
  const completedTasks = tasks.filter(t => t.completed).length;
  const averageStreak = tasks.length > 0 ? Math.round(tasks.reduce((acc, task) => acc + task.streak, 0) / tasks.length) : 0;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Daily Goals
        </h1>
        <p className="text-muted-foreground">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="space-y-4">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onToggleComplete={toggleTask}
            onUpdateValue={updateTaskValue}
          />
        ))}
      </div>
      
      <MotivationalTip tasks={tasks} />

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Today's Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">
                {completedTasks}/{tasks.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Completed
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {averageStreak}
              </div>
              <div className="text-sm text-muted-foreground">
                Avg Streak
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <TodoList 
        todos={todos}
        onToggle={toggleTodo}
        onAdd={addTodo}
        onDelete={deleteTodo}
      />
    </div>
  );
}
