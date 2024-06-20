import express from "express";
import cors from "cors";
import indexRouter from "./routes/index.routes.js";

const app = express();

// Middlewares
// Init Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credential: true,
  })
);

app.use(express.json());
app.use("/", indexRouter);

export default app;
