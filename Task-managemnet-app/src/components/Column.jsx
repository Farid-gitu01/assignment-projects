import TaskCard from './TaskCard';

function Column({ title, status, tasks, onAddTask, onEditTask }) {
  return (
    <section className="column" aria-label={`${title} column`}>
      <header className="column-header">
        <div className="column-header__meta">
          <span className={`status-dot status-dot--${status}`}></span>
          <h2>{title}</h2>
        </div>
        <span className="column-count">{tasks.length}</span>
      </header>

      <button type="button" className="column-add-button" onClick={() => onAddTask(status)}>
        + Add Task
      </button>

      <div className="column-content">
        {tasks.length === 0 ? (
          <div className="empty-state">
            <p>No tasks here yet.</p>
            <span>Start by adding a task to this column.</span>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} onEditTask={onEditTask} />
          ))
        )}
      </div>
    </section>
  );
}

export default Column;
