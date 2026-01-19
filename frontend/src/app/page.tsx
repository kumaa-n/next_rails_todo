"use client";

import { useEffect, useState } from "react";
import { getTodos } from "./api";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";

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
        console.error(error);
      }
    };

    fetchTodos();
  }, []);

  return (
    <div className="container">
      <h1>ToDo List</h1>
      <TodoForm />
      <TodoList todos={todos} />
    </div>
  );
}
