"use client";

import { useEffect, useState } from "react";
import { getTodos } from "./api";

type Todo = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

export default function Home() {
  // Todoリストの初期値を空の配列に設定
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todosData = await getTodos();
        setTodos(todosData);
      } catch (error) {
        console.error('Error while fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  return (
    <div className="container">
      <h1>ToDo List</h1>
      <ul>
        {todos.map((todo: any) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}
