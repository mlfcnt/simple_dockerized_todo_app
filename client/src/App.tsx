import "./App.css";
import { useTasks } from "./api";
import { TaskList } from "./components/TaskList";
import AddTaskForm from "./components/AddTaskForm";

function App() {
  const { error, isLoading } = useTasks();

  if (error) {
    console.error(error);
  }

  return (
    <div className="App">
      <Title /> <Loader isLoading={isLoading} />
      <ErrorDisplay error={!!error} />
      <AddTaskForm />
      <TaskList />
    </div>
  );
}

export default App;

const Title = () => {
  return <h2>Simple dockerized Todo app</h2>;
};

const Loader = ({ isLoading }: { isLoading: boolean }) => {
  if (!isLoading) return null;
  return <p>Loading the tasks...</p>;
};

const ErrorDisplay = ({ error }: { error: boolean }) => {
  if (!error) return null;
  return <p>Failed to load the tasks</p>;
};
