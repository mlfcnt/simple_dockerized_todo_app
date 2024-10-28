import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const isError = !message && !isLoading;

  useEffect(() => {
    fetch("http://localhost:8080/")
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.greeting);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <h1>Simple dockerized frontend</h1>
      <h3
        style={{
          color: isError ? "red" : "inherit",
        }}
      >
        {" "}
        {isError
          ? "Something went wrong...We cannot seem to reach the server"
          : `Message from the server : ${message}`}
      </h3>
    </div>
  );
}

export default App;
