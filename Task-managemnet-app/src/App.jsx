import { useState } from 'react';
import Board from './components/Board';
import TaskForm from './components/TaskForm';
import { TaskProvider, useTasks } from './context/TaskContext';
import './styles/Board.css';
import './styles/Column.css';
import './styles/TaskCard.css';

function AppContent() {
  const { tasks } = useTasks();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newTaskStatus, setNewTaskStatus] = useState('todo');

  const openAddForm = (status = 'todo') => {
    setSelectedTask(null);
    setNewTaskStatus(status);
    setIsFormOpen(true);
  };

  const openEditForm = (task) => {
    setSelectedTask(task);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setSelectedTask(null);
    setIsFormOpen(false);
  };

  return (
    <>
      <header className="app-header">
        <div className="app-header__inner">
          <div className="brand">
            <span className="brand-mark" aria-hidden="true">T</span>
            <div className="brand-copy">
              <h1>TaskFlow</h1>
              <p>My workspace</p>
            </div>
          </div>

          <button type="button" className="primary-button" onClick={openAddForm}>
            + Add Task
          </button>
        </div>
      </header>

      <main className="page-shell">
        <section className="page-intro" aria-label="Task management summary">
          <div>
            <p className="eyebrow-text">Your workspace</p>
            <h2>My Task Board</h2>
            <p className="page-subtitle">Organize your work. Focus on what matters.</p>
          </div>
          <div className="task-summary" aria-label="Task summary">
            <div className="summary-item">
              <span className="summary-value">{tasks.length}</span>
              <span className="summary-label">Total tasks</span>
            </div>
            <span className="summary-divider" aria-hidden="true"></span>
            <div className="summary-item">
              <span className="summary-value summary-value--done">
                {tasks.filter((task) => task.status === 'done').length}
              </span>
              <span className="summary-label">Completed</span>
            </div>
          </div>
        </section>

        <Board onOpenAddTask={openAddForm} onOpenEditTask={openEditForm} />
      </main>

      {isFormOpen && (
        <TaskForm task={selectedTask} initialStatus={newTaskStatus} onClose={closeForm} />
      )}
    </>
  );
}

function App() {
  return (
    <TaskProvider>
      <AppContent />
    </TaskProvider>
  );
}

export default App;
