import { useEffect, useState } from "react";
import Tasks from "../module/Tasks";

function HomePage() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);
  const fetchTodos = async () => {
    const res = await fetch("/api/todos", {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    if (data.status === "success") setTodos(data.data.todos);
  };

  return (
    <div className="flex flex-wrap justify-between items-start">
      <div className="bg-white m-5 rounded-[5px] grow">
        <p className="p-[5px] text-center text-white text-xl font-bold rounded-t-[5px] bg-todo">
          Todo
        </p>
        <Tasks data={todos.todo} fetchTodos={fetchTodos} next="inProgress" />
      </div>
      <div className="bg-white m-5 rounded-[5px] grow">
        <p className="p-[5px] text-center text-white text-xl font-bold rounded-t-[5px] bg-inProgress">
          In Progress
        </p>
        <Tasks
          data={todos.inProgress}
          fetchTodos={fetchTodos}
          next="review"
          previous="todo"
        />
      </div>
      <div className="bg-white m-5 rounded-[5px] grow">
        <p className="p-[5px] text-center text-white text-xl font-bold rounded-t-[5px] bg-review">
          Review
        </p>
        <Tasks
          data={todos.review}
          fetchTodos={fetchTodos}
          next="done"
          previous="inProgress"
        />
      </div>
      <div className="bg-white m-5 rounded-[5px] grow">
        <p className="p-[5px] text-center text-white text-xl font-bold rounded-t-[5px] bg-done">
          Done
        </p>
        <Tasks data={todos.done} fetchTodos={fetchTodos} previous="review" />
      </div>
    </div>
  );
}

export default HomePage;
