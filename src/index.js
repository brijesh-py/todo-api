import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config({
  path: "../.env",
});

// Connect to MongoDB and start the server
connectDB()
  .then(() => {
    try {
      app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
      });
    } catch (error) {
      console.error(`Error starting server: ${error.message}`);
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  });
