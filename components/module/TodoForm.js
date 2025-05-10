import { useEffect, useState } from "react";
import RadioButton from "../elements/RadioButton";

import { BsAlignStart } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdDoneAll } from "react-icons/md";
import { toast } from "react-toastify";

function TodoForm({ initialData = {}, onSubmit, submitLabel = "Add" }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setStatus(initialData.status || "todo");
    }
  }, []);

  const handleSubmit = async () => {
    const payload = {
      ...(initialData._id && { id: initialData._id }),
      title,
      description,
      status,
    };

    const result = await onSubmit(payload);
    if (result?.status === "success") {
      toast.success(payload.id ? "Todo updated." : "Todo added.");
      if (!payload.id) {
        setTitle("");
        setDescription("");
        setStatus("todo");
      }
    } else {
      toast.error(result?.message || "Something went wrong.");
    }
  };

  return (
    <div className="mt-5">
      <div className="flex flex-col mb-8">
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col mb-8">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="min-h-20"
        />
      </div>
      <div className="flex flex-col mb-5 w-fit">
        <RadioButton
          status={status}
          setStatus={setStatus}
          value="todo"
          title="Todo"
        >
          <BsAlignStart className="mr-[10px]" />
        </RadioButton>
        <RadioButton
          status={status}
          setStatus={setStatus}
          value="inProgress"
          title="In Progress"
        >
          <FiSettings className="mr-[10px]" />
        </RadioButton>
        <RadioButton
          status={status}
          setStatus={setStatus}
          value="review"
          title="Review"
        >
          <AiOutlineFileSearch className="mr-[10px]" />
        </RadioButton>
        <RadioButton
          status={status}
          setStatus={setStatus}
          value="done"
          title="Done"
        >
          <MdDoneAll className="mr-[10px]" />
        </RadioButton>
      </div>
      <button
        className="border-none flex items-center bg-[#d6d6d6] text-[#727272] py-[5px] px-5 rounded-[10px] cursor-pointer text-[1.4rem]"
        onClick={handleSubmit}
      >
        {submitLabel}
      </button>
    </div>
  );
}

export default TodoForm;
