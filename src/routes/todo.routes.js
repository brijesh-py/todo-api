import express, { Router } from "express";
import { createTodo, getTodos } from "../controllers/todo.controllers.js";
import { authentication } from "../middlewares/authentication.middlewares.js";

const todoRouter = Router();

todoRouter.route("/todos").post(authentication, createTodo);
todoRouter.route("/todos").get(authentication, getTodos);

export { todoRouter };
