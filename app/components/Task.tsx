"use client";
import { ITask } from "@/types/tasks";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { updateTodos, deleteTodos } from "@/api";
import { useRouter } from "next/navigation";

interface TaskProps {
  task: ITask;
}
const Task: React.FC<TaskProps> = ({ task }) => {
  console.log(task);
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [editTaskValue, setEditTaskValue] = useState<string>(task.text);
  const router = useRouter();

  const handleSubmitEdit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    await updateTodos({
      id: task.id,
      text: editTaskValue,
    });
    setEditTaskValue("");
    setOpenModalEdit(false);
    router.refresh();
  };
  const deleteHandler = async (id: string) => {
    console.log(id);

    await deleteTodos(id);
    setOpenModalDelete(false);
    router.refresh();
  };
  return (
    <tr className="" key={task.id}>
      <td className="w-full text-[12px]">{task.text}</td>
      <td className="flex gap-x-3 ">
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEdit}>
            <h3 className="font-bold text-lg">Edit Task</h3>
            <div className=" modal-action ">
              <input
                value={editTaskValue}
                onChange={(event) => setEditTaskValue(event.target.value)}
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
        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
          <h3 className="font-bold">Are you sure to delete?</h3>
          <div className="w-full flex items-center justify-center gap-x-4 mt-4">
            <button className="btn" onClick={() => deleteHandler(task.id)}>
              Yes
            </button>
            <button className="btn" onClick={() => setOpenModalDelete(false)}>
              No
            </button>
          </div>
        </Modal>
        <button onClick={() => setOpenModalDelete(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 fill-red-400"
            viewBox="0 0 24 24"
          >
            <path d="M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z"></path>
          </svg>
        </button>
        <button onClick={() => setOpenModalEdit(true)}>
          <svg
            className="w-4 h-4 fill-blue-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M6.41421 15.89L16.5563 5.74786L15.1421 4.33365L5 14.4758V15.89H6.41421ZM7.24264 17.89H3V13.6474L14.435 2.21233C14.8256 1.8218 15.4587 1.8218 15.8492 2.21233L18.6777 5.04075C19.0682 5.43128 19.0682 6.06444 18.6777 6.45497L7.24264 17.89ZM3 19.89H21V21.89H3V19.89Z"></path>
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default Task;
