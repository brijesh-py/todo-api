export const checkLogin = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }
  next();
};

export const checkRegister = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "Username,email and password are required." });
  }
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const validateUsername = (username) => {
    const regex = /^[a-zA-Z0-9]{3,15}$/;
    return regex.test(username);
  };
  if (!validateEmail(email) || !validateUsername(username)) {
    return res
      .status(400)
      .json({ error: "Invalid username or email address." });
  }
  next();
};
