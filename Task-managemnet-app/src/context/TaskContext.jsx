import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const STORAGE_KEY = 'task-management-board-tasks';
const TaskContext = createContext(null);

function generateTaskId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `task-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEY, []);

  const addTask = (taskInput) => {
    const newTask = {
      id: generateTaskId(),
      title: taskInput.title.trim(),
      description: taskInput.description.trim(),
      priority: taskInput.priority,
      dueDate: taskInput.dueDate || '',
      status: taskInput.status,
      createdAt: taskInput.createdAt || new Date().toISOString(),
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);
  };

  const updateTask = (taskId, updates) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              ...updates,
              title: updates.title ? updates.title.trim() : task.title,
              description:
                updates.description !== undefined
                  ? updates.description.trim()
                  : task.description,
            }
          : task,
      ),
    );
  };

  const deleteTask = (taskId) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
  };

  const moveTask = (taskId, nextStatus) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: nextStatus,
            }
          : task,
      ),
    );
  };

  const value = { tasks, addTask, updateTask, deleteTask, moveTask };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error('useTasks must be used inside a TaskProvider.');
  }

  return context;
}

export default TaskContext;
