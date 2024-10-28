import { useTasks, useUpdateTask } from "../api";

export const TaskList = () => {
  const { data: tasks = [] } = useTasks();
  const { mutate } = useUpdateTask();

  return (
    <ul>
      {tasks.map((task) => (
        <li
          key={task.id}
          style={{
            textDecoration: task.completedOn ? "line-through" : "none",
            listStyleType: "none",
          }}
        >
          <input
            style={{
              marginRight: "10px",
            }}
            type="checkbox"
            checked={!!task.completedOn}
            onClick={() =>
              mutate({
                completedOn: task.completedOn ? null : new Date(),
                id: task.id,
              })
            }
          />
          <span>{task.title}</span>
        </li>
      ))}
    </ul>
  );
};
