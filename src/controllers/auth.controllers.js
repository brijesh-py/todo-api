import bcrypt from "bcrypt";
import { asyncHandler } from "../utils/async.utils.js";
import { APIError } from "../utils/ApiError.utils.js";
import { User } from "../models/user.models.js";

// Generate access and refresh tokens
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new APIError(500, "Something went wrong while generating tokens.");
  }
};

// Register user
export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const checkUsername = await User.findOne({ username });
  const checkEmail = await User.findOne({ email });

  if (checkUsername || checkEmail) {
    return res.status(400).json({ error: "Username or email already exists." });
  }

  const user = new User({ username, email, password });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  await user.save();

  const createdUser = await User.findById(user._id).select(
    "-password -_id -__v -createdAt -updatedAt"
  );
  if (!createdUser) {
    throw new APIError(401, "Failed to create user. Try again later.");
  }

  res.status(201).json({
    success: true,
    data: createdUser,
    message: "User registered successfully.",
  });
});

// Login user
export const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials." });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: "Invalid credentials." });
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const options = {
    httpOnly: true,
    sameSite: "Strict",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  };

  res
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .status(200)
    .json({
      success: true,
      message: "User logged in successfully.",
      data: { user: { username: user.username, email: user.email } },
    });
});
