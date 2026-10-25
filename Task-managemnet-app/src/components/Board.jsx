import { useTasks } from '../context/TaskContext';
import Column from './Column';

const columns = [
  { title: 'To Do', status: 'todo' },
  { title: 'In Progress', status: 'in-progress' },
  { title: 'Done', status: 'done' },
];

function Board({ onOpenAddTask, onOpenEditTask }) {
  const { tasks } = useTasks();

  return (
    <section className="board" aria-label="Task management board">
      <div className="board-columns">
        {columns.map((column) => (
          <Column
            key={column.status}
            title={column.title}
            status={column.status}
            tasks={tasks.filter((task) => task.status === column.status)}
            onAddTask={onOpenAddTask}
            onEditTask={onOpenEditTask}
          />
        ))}
      </div>
    </section>
  );
}

export default Board;
