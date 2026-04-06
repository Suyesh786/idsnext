const express = require("express");
const router = express.Router();

const { loginUser, registerUser } = require("../controllers/authController");

// ─── LOGIN ─────────────────────────────────────────
router.post("/login", loginUser);

// ─── REGISTER ──────────────────────────────────────
router.post("/register", registerUser);

module.exports = router;