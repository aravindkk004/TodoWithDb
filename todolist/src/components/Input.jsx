import React from "react";
import "../index.css";
import axios from "axios";
import { useState } from "react";

const Input = ({getCallback}) => {
  const [todo, setTodo] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/postitem", {
        todoItem: todo,
      });
      if (res.status !== 200) {
        setError("failed to post todo");
      }
      getCallback();
      setTodo("");
    } catch (error) { 
      setError(error);
    }
  };

  return (
    <div className="inputbox">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your todo here."
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button>Add</button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Input;
