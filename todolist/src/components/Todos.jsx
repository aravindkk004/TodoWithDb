import React from "react";
import Todo from "./Todo";

const Todos = ({ todo, onDelete, updateTodo }) => {
  return (
    <div className="todos">
      {todo.length > 0 ? (
        todo.map((todoItem) => (
          <Todo
            key={todoItem.id}
            todoItem={todoItem}
            id={todoItem._id}
            onDelete={onDelete}
            updateTodo={updateTodo}
          />
        ))
      ) : (
        <h2>No todos available</h2>
      )}
    </div>
  );
};

export default Todos;
