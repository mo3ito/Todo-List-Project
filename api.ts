import { ITask } from "./types/tasks";
const baseUrl = "http://localhost:4000";

export const getAllTodos = async (): Promise<ITask[]> => {
  const res = await fetch(`${baseUrl}/tasks`, { cache: "no-store" });
  const todos = res.json();
  return todos;
};

export const addTodos = async (todo: ITask): Promise<ITask> => {
  const res = await fetch(`${baseUrl}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  const newTodo = res.json();
  return newTodo;
};

export const updateTodos = async (editedTodo: ITask): Promise<ITask> => {
  const res = await fetch(`${baseUrl}/tasks/${editedTodo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedTodo),
  });

  const editedTodoList = res.json();
  return editedTodoList;
};

export const deleteTodos = async (id: string): Promise<void> => {
  const res = await fetch(`${baseUrl}/tasks/${id}`, {
    method: "DELETE",
  });
};
