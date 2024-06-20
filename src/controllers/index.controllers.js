import { asyncHandler } from "../utils/async.utils.js";

export const index = asyncHandler(async (req, res) => {
  await res.status(200).json({ message: "Welcome to todo api." });
});
