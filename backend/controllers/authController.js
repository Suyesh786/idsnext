const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ─── POST /api/auth/login ──────────────────────────────────────────────────────
const loginUser = async (req, res) => {
const { email, password } = req.body;

try {
// 1. Validate input presence
if (!email || !password) {
return res.status(400).json({
success: false,
message: "Email and password are required",
});
}

// 2. Normalize email
const normalizedEmail = email.toLowerCase().trim();

// 3. Check if user exists
const user = await User.findOne({ email: normalizedEmail });

if (!user) {
  return res.status(401).json({
    success: false,
    message: "Invalid credentials",
  });
}

// 4. Compare hashed password
const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch) {
  return res.status(401).json({
    success: false,
    message: "Invalid credentials",
  });
}

// 5. Generate JWT token
const token = jwt.sign(
  { id: user._id, email: user.email, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
);

// 6. Send success response
return res.status(200).json({
  success: true,
  message: "Login successful",
  token,
  user: {
    id: user._id,
    name:user.name,
    email: user.email,
    role: user.role,
  },
});

} catch (error) {
console.error("Login error:", error.message);

return res.status(500).json({
  success: false,
  message: "Server error. Please try again later.",
});

}
};

// ─── POST /api/auth/register ───────────────────────────────────────────────────
const registerUser = async (req, res) => {
try {
const { name, email, password,section } = req.body;

// 1. Validate fields
if (!name || !email || !password) {
  return res.status(400).json({
    success: false,
    message: "Name, email, and password are required",
  });
}

// 2. Normalize email
const normalizedEmail = email.toLowerCase().trim();

// 3. Check if user already exists
const existingUser = await User.findOne({ email: normalizedEmail });

if (existingUser) {
  return res.status(400).json({
    success: false,
    message: "User already exists",
  });
}

// 4. Hash password
const hashedPassword = await bcrypt.hash(password, 10);

// 5. Create user
await User.create({
  name,
  email: normalizedEmail,
  password: hashedPassword,
  role: "student",
  section:section||null
});

// 6. Send success response
return res.status(201).json({
  success: true,
  message: "Account created successfully",
});

} catch (error) {
console.error("Register error:", error.message);

return res.status(500).json({
  success: false,
  message: "Server error. Please try again later.",
});

}
};

// ─── Export Controllers ─────────────────────────────────────────────────────────
module.exports = {
loginUser,
registerUser,
};