import { useEffect, useState } from 'react';
import { useTasks } from '../context/TaskContext';

const emptyFormState = {
  title: '',
  description: '',
  priority: 'medium',
  dueDate: '',
  status: 'todo',
};

function TaskForm({ task, initialStatus = 'todo', onClose }) {
  const { addTask, updateTask } = useTasks();
  const [formData, setFormData] = useState({
    ...emptyFormState,
    status: initialStatus,
    ...(task || {}),
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({
      ...emptyFormState,
      status: initialStatus,
      ...(task || {}),
    });
    setErrors({});
  }, [task, initialStatus]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.title.trim()) {
      nextErrors.title = 'Task title is required.';
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validateForm();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const taskData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      dueDate: formData.dueDate,
      status: formData.status,
    };

    if (task) {
      updateTask(task.id, taskData);
    } else {
      addTask(taskData);
    }

    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="task-form-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-form-title"
        onClick={(event) => event.stopPropagation()}
      >
        <form className="task-form" onSubmit={handleSubmit}>
          <div className="task-form__header">
            <h3 id="task-form-title">{task ? 'Edit task' : 'Add a task'}</h3>
            <button type="button" className="icon-button" onClick={onClose} aria-label="Close task form">
              ×
            </button>
          </div>

          <label className="field-group">
            <span>Task title</span>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              aria-invalid={Boolean(errors.title)}
            />
            {errors.title && <small className="field-error">{errors.title}</small>}
          </label>

          <label className="field-group">
            <span>Description</span>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Add a few notes about this task"
            />
          </label>

          <div className="task-form__row">
            <label className="field-group">
              <span>Priority</span>
              <select name="priority" value={formData.priority} onChange={handleChange}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>

            <label className="field-group">
              <span>Due date</span>
              <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} />
            </label>
          </div>

          <label className="field-group">
            <span>Status</span>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </label>

          <div className="task-form__actions">
            <button type="button" className="secondary-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-button">
              {task ? 'Save Task' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;
