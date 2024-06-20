import { Router } from "express";
import { index } from "../controllers/index.controllers.js";

const indexRouter = Router();

indexRouter.get("/", index);

export default indexRouter;
