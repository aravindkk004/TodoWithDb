import express from "express";
import Todo from "../models/todoModel.js";

const router = express.Router();

router.post("/api/postitem", async (req, res) => {
  try {
    const newItem = new Todo({
      item: req.body.todoItem,
    });
    const saveItem = await newItem.save();
    res.status(200).json(saveItem);
  } catch (error) {
    res.json(error);
  }
});

router.get("/api/getItem", async (req, res) => {
  try {
    const todoItems = await Todo.find();
    return res.status(200).json(todoItems);
  } catch (error) {
    res.json(error);
  }
});

router.put("/api/edititem/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const todoItem = req.body.updateItem; 
    const updatedItem = await Todo.findByIdAndUpdate(
      id,
      { item: todoItem }, 
      { new: true } 
    );

    if (!updatedItem) {
      return res.status(404).json({ error: "Todo item not found" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error("Error updating todo item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/api/delete/:id", async (req, res) => {
  try {
    const deleteItem = await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json(deleteItem);
  } catch (error) {
    res.json(error);
  }
});

export default router;
