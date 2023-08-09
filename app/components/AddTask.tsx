"use client";
import { FormEventHandler, useState } from "react";
import { addTodos } from "@/api";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const AddTask = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");
  const router = useRouter();

  const handleSubmitation: FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    console.log("hello");

    await addTodos({
      id: uuidv4(),
      text: newTaskValue,
    });

    setNewTaskValue("");
    setModalOpen(false);
    router.refresh();
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="btn btn-primary w-full"
      >
        Add new task
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 fill-white"
          viewBox="0 0 24 24"
        >
          <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
        </svg>
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitation}>
          <h3 className="font-bold text-lg">Add new task</h3>
          <div className=" modal-action ">
            <input
              value={newTaskValue}
              onChange={(event) => setNewTaskValue(event.target.value)}
              type="text"
              placeholder="Type your task"
              className="input input-bordered w-full "
            />
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
