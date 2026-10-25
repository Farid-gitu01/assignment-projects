import { useTasks } from '../context/TaskContext';

function formatDate(dateString) {
  if (!dateString) {
    return 'No due date';
  }

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return 'No due date';
  }

  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function TaskCard({ task, onEditTask }) {
  const { deleteTask, moveTask } = useTasks();

  const priorityLabel = task.priority.charAt(0).toUpperCase() + task.priority.slice(1);

  const handleDelete = () => {
    const confirmed = window.confirm(`Delete "${task.title}"?`);

    if (confirmed) {
      deleteTask(task.id);
    }
  };

  const handleStatusChange = (event) => {
    moveTask(task.id, event.target.value);
  };

  return (
    <article className="task-card">
      <div className="task-card__header">
        <h3>{task.title}</h3>
        <span className={`priority-badge priority-badge--${task.priority}`}>{priorityLabel}</span>
      </div>

      {task.description && <p className="task-card__description">{task.description}</p>}

      <div className="task-card__meta">
        <span className="meta-label">Due</span>
        <span>{formatDate(task.dueDate)}</span>
      </div>

      <div className="task-card__actions">
        <button type="button" className="secondary-button secondary-button--small" onClick={() => onEditTask(task)}>
          Edit
        </button>
        <button type="button" className="danger-button" onClick={handleDelete}>
          Delete
        </button>
      </div>

      <label className="task-card__move">
        <span>Move to</span>
        <select value={task.status} onChange={handleStatusChange}>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </label>
    </article>
  );
}

export default TaskCard;
