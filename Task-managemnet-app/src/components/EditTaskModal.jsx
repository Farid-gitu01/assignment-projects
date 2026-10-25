import TaskForm from './TaskForm';

function EditTaskModal({ task, onClose }) {
  return <TaskForm task={task} onClose={onClose} />;
}

export default EditTaskModal;
