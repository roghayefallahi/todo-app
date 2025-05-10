import { GrAddCircle } from "react-icons/gr";
import TodoForm from "../module/TodoForm";

function AddTodoPage() {
 
  const addHandler = async (data) => {
    const res = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return await res.json();
  };

  return (
    <div className="flex flex-col p-5">
      <h2 className="flex items-center mb-7 text-[#494a52] cursor-pointer text-lg font-bold">
        <GrAddCircle className="mr-[10px]" />
        Add New Todo
      </h2>
      <TodoForm onSubmit={addHandler} />
    </div>
  );
}

export default AddTodoPage;
