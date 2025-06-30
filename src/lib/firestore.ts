'use server';

import { db } from '@/lib/firebase';
import {
  collection,
  doc,
  getDocs,
  writeBatch,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  query,
  limit,
} from 'firebase/firestore';
import type { Task, Todo, MonthlyGoal } from '@/lib/types';
import { initialTasks, initialTodos, initialMonthlyGoals } from '@/lib/data';

const getCollectionRef = (collectionName: string, userId: string) => {
  return collection(db, 'users', userId, collectionName);
};

const seedInitialData = async (userId: string) => {
  const batch = writeBatch(db);

  const tasksRef = getCollectionRef('tasks', userId);
  initialTasks.forEach((task) => {
    const docRef = doc(tasksRef, task.id);
    batch.set(docRef, task);
  });

  const todosRef = getCollectionRef('todos', userId);
  initialTodos.forEach((todo) => {
    const docRef = doc(todosRef, todo.id);
    batch.set(docRef, todo);
  });

  const goalsRef = getCollectionRef('monthlyGoals', userId);
  initialMonthlyGoals.forEach((goal) => {
    const docRef = doc(goalsRef, goal.id);
    batch.set(docRef, goal);
  });

  await batch.commit();
};

export const getUserData = async (userId: string) => {
  const userDocRef = doc(db, 'users', userId);
  const tasksRef = getCollectionRef('tasks', userId);

  const [userDocSnap, tasksSnapshot] = await Promise.all([
    getDoc(userDocRef),
    getDocs(query(tasksRef, limit(1))), // Check if tasks collection has at least one doc
  ]);

  const mustSeed = !userDocSnap.exists() || tasksSnapshot.empty;

  if (mustSeed) {
    await seedInitialData(userId);
    if (!userDocSnap.exists()) {
      await setDoc(userDocRef, { initialized: true });
    }
  }

  const todosRef = getCollectionRef('todos', userId);
  const monthlyGoalsRef = getCollectionRef('monthlyGoals', userId);

  const [finalTasksSnapshot, todosSnapshot, monthlyGoalsSnapshot] =
    await Promise.all([
      getDocs(tasksRef),
      getDocs(todosRef),
      getDocs(monthlyGoalsRef),
    ]);

  const tasks = finalTasksSnapshot.docs.map(
    (doc) => ({ ...doc.data(), id: doc.id } as Task)
  );
  const todos = todosSnapshot.docs.map(
    (doc) => ({ ...doc.data(), id: doc.id } as Todo)
  );
  const monthlyGoals = monthlyGoalsSnapshot.docs.map(
    (doc) => ({ ...doc.data(), id: doc.id } as MonthlyGoal)
  );

  return { tasks, todos, monthlyGoals };
};

export const updateTaskInDb = async (
  userId: string,
  taskId: string,
  data: Partial<Task>
) => {
  const taskRef = doc(db, 'users', userId, 'tasks', taskId);
  await updateDoc(taskRef, data);
};

export const updateTodoInDb = async (
  userId: string,
  todoId: string,
  data: Partial<Todo>
) => {
  const todoRef = doc(db, 'users', userId, 'todos', todoId);
  await updateDoc(todoRef, data);
};

export const addTodoInDb = async (userId: string, newTodoText: string) => {
  const newTodoRef = doc(collection(getCollectionRef('todos', userId)));
  const newTodoData = { text: newTodoText, completed: false };
  await setDoc(newTodoRef, newTodoData);
  return { ...newTodoData, id: newTodoRef.id };
};

export const deleteTodoInDb = async (userId: string, todoId: string) => {
  const todoRef = doc(db, 'users', userId, 'todos', todoId);
  await deleteDoc(todoRef);
};

export const updateMonthlyGoalInDb = async (
  userId: string,
  goalId: string,
  data: Partial<MonthlyGoal>
) => {
  const goalRef = doc(db, 'users', userId, 'monthlyGoals', goalId);
  await updateDoc(goalRef, data);
};
