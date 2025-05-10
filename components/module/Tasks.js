import { useState } from "react";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";
import TodoForm from "./TodoForm";
import Modal from "../Modal";

function Tasks({ data, fetchTodos, next, previous }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState(null);

  const changeStatus = async (id, status) => {
    const res = await fetch("/api/todos", {
      method: "PATCH",
      body: JSON.stringify({ id, status }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.status === "success") fetchTodos();
  };

  const editHandler = async (data) => {
    const res = await fetch("/api/todos", {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();
    if (result.status === "success") {
      fetchTodos();
      setIsModalOpen(false);
    }

    return result;
  };

  return (
    <>
      <div className="m-0">
        {data?.map((i) => (
          <div
            key={i._id}
            className="p-[15px] my-[25px] mx-[15px] shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
          >
            <div className="flex  justify-between items-center mb-[20px]">
              <span
                className={`bg-${i.status} w-[50%] h-[3px] block  rounded-[2px]`}
              ></span>
              <CiEdit
                className="text-xl cursor-pointer"
                onClick={() => {
                  setTodoToEdit(i);
                  setIsModalOpen(true);
                }}
              />
            </div>

            <h4 className="text-[#494a52] font-normal">{i.title}</h4>
            <div className="flex justify-between bg-white mt-5">
              {previous ? (
                <button
                  className="py-[5px] px-[10px]  border-none rounded-[5px] flex items-center cursor-pointer bg-[#f8eccf] text-[#e5a000] space-x-[2px]"
                  onClick={() => changeStatus(i._id, previous)}
                >
                  <BiLeftArrow className="" />
                  <span className="align-middle leading-none">previous</span>
                </button>
              ) : null}
              {next ? (
                <button
                  className="py-[5px] px-[10px] text-[16px] border-none rounded-[5px] flex items-center cursor-pointer bg-[#cdf8ee] text-[#03ab81] space-x-[2px]"
                  onClick={() => changeStatus(i._id, next)}
                >
                  <span className="align-middle leading-none">next</span>{" "}
                  <BiRightArrow />
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      {/* 🟦 مدال ویرایش */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TodoForm
          initialData={todoToEdit}
          onSubmit={editHandler}
          submitLabel="Updata"
        />
      </Modal>
    </>
  );
}

export default Tasks;
