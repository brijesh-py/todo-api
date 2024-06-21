import { Todo } from "../models/todo.models.js";
import { asyncHandler } from "../utils/async.utils.js";

export const createTodo = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { title, description = "", completed = false } = req.body;

  if (!title) {
    return res.status(400).json({ error: "todo title are required" });
  }
  // Save Todo
  const saveTodo = new Todo({ title, description, completed, user: userId });
  await saveTodo.save();
  const todo = await Todo.findById(saveTodo._id).select(
    "-user -_id -__v -createdAt -updatedAt"
  );
  // Response
  res.status(201).json({
    success: true,
    todo,
    message: "Todo created successfully.",
  });
});

export const getTodos = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const allTodos = await Todo.find({ user: userId }).select(
    "-user -_id -__v -createdAt -updatedAt"
  );
  res.status(200).json({ success: true, todos: allTodos });
});
