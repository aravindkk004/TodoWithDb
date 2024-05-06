import Input from "./components/Input";
import Navbar from "./components/Navbar";
import Todos from "./components/Todos";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    fetching();
  }, []);

  const fetching = async () => {
    const res = await axios.get("http://localhost:3000/api/getItem");
    setTodo(res.data);
  };

  const onDelete = (id) => {
    setTodo(todo.filter((todo) => todo._id !== id));
  };

  const getCallback = () => {
    fetching();
  };

  const updateTodo = () => {
    fetching();
  };

  return (
    <>
      <Navbar />
      <Input getCallback={getCallback} />
      <Todos todo={todo} onDelete={onDelete} updateTodo={updateTodo} />
    </>
  );
}

export default App;
