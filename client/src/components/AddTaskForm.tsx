import { useCreateTask } from "../api";

const AddTaskForm = () => {
  const { mutate } = useCreateTask();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutate({
          title: e.currentTarget.taskTitle.value,
        });
        e.currentTarget.taskTitle.value = "";
      }}
    >
      <input
        type="text"
        name="taskTitle"
        style={{
          padding: "5px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      <button
        type="submit"
        style={{
          marginLeft: "10px",
          padding: "5px 10px",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#007bff",
        }}
      >
        Add task
      </button>
    </form>
  );
};

export default AddTaskForm;
