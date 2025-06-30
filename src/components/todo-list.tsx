'use client';
import { useState } from 'react';
import type { Todo } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onAdd: (text: string) => void;
  onDelete: (id: number) => void;
}

export default function TodoList({ todos, onToggle, onAdd, onDelete }: TodoListProps) {
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    onAdd(newTodo);
    setNewTodo('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Miscellaneous Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
            placeholder="Add a quick task..."
            className="flex-1 rounded-xl"
          />
          <Button onClick={handleAddTodo} size="icon" className="rounded-xl">
            <Plus className="w-5 h-5" />
          </Button>
        </div>

        <div className="space-y-3">
          {todos.map(todo => (
            <div key={todo.id} className="flex items-center space-x-3 p-3 rounded-xl bg-muted/50">
              <button
                onClick={() => onToggle(todo.id)}
                className={cn(
                  'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 shrink-0',
                  todo.completed 
                    ? 'bg-green-500 border-green-500' 
                    : 'border-muted-foreground'
                )}
                aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
              >
                {todo.completed && <Check className="w-4 h-4 text-white" />}
              </button>
              <span className={cn('flex-1', todo.completed ? 'line-through text-muted-foreground' : 'text-foreground')}>
                {todo.text}
              </span>
              <Button variant="ghost" size="icon" onClick={() => onDelete(todo.id)} className="text-red-500 hover:text-red-600 w-6 h-6">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          
          {todos.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">
              No miscellaneous tasks yet
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
