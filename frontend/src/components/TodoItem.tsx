import React, { useState } from 'react';
import { deleteTodo } from '@/app/api';
import TodoEditForm from './TodoEditForm';

type Todo = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

type TodoItemProps = {
  todo: Todo;
  onDelete: (todoId: number) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
  };

  const handleDeleteClick = async () => {
    try {
      await deleteTodo(todo.id);

      onDelete(todo.id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {!isEditing ? (
        <div className="todo-item">
          <h3>{todo.title}</h3>
          <p>{todo.description}</p>
          <div className="todo-item-buttons">
            <button className="edit-button" onClick={handleEditClick}>Edit</button>
            <button className="delete-button" onClick={handleDeleteClick}>Delete</button>
          </div>
        </div>
      ) : (
        <TodoEditForm todo={todo} onEdit={handleEditCancel} />
      )}
    </div>
  );
};

export default TodoItem;
