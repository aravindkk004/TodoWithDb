import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import axios from "axios";

const Todo = ({ todoItem, id, onDelete, updateTodo }) => {
  const [error, setError] = useState("");
  const [todo, setTodo] = useState("");
  const [update, setUpdate] = useState("");

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/delete/${id}`);
      if (res.status !== 200) {
        setError("failed to delete todo");
      } else {
        onDelete(id);
      }
    } catch (error) {
      setError(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:3000/api/edititem/${id}`, {
        updateItem: todo, 
      });
      if (res.status === 200) {
        setUpdate(""); 
        updateTodo();
      } else {
        setError("Failed to update todo");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const updateForm = () => (
    <form className="updateform" onSubmit={handleUpdate}>
      <input
        type="text"
        placeholder="Update your todo here."
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
      />
      <button>update</button>
    </form>
  );
  
  return (
    <>
      <div className="todo">
        {update === id ? (
          updateForm()
        ) : (
          <>
            <p>{todoItem.item}</p>
            <div className="icons">
              <MdEdit
                className="editicon"
                size={40}
                onClick={() => setUpdate(id)}
              />
              <MdDelete
                className="deleteicon"
                size={40}
                onClick={handleDelete}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Todo;
