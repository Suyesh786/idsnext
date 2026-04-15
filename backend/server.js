require("dotenv").config();
const session = require("express-session");
const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const { askSpark } = require("./ai");
const User = require("./models/User");
const { verifyToken } = require("./middleware/authMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;

// ─────────────────────────────────────────
// Middleware
// ─────────────────────────────────────────

app.use(cors({
  origin: ["https://idsnext-backend.onrender.com", "https://idsnext.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "spark-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// ─────────────────────────────────────────
// Serve Frontend Static Files
// ─────────────────────────────────────────

app.use(express.static(path.join(__dirname, "../frontend")));

// ─────────────────────────────────────────
// Health Check Endpoint
// (Pinged every 5 min by UptimeRobot / cron-job.org
//  to keep Render free tier from sleeping)
// ─────────────────────────────────────────

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// ─────────────────────────────────────────
// API Routes
// ─────────────────────────────────────────

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// ─────────────────────────────────────────
// Spark AI Chat Route
// ─────────────────────────────────────────

app.post("/api/spark-chat", verifyToken, async (req, res) => {

  try {

    const { message } = req.body;
    const sessionId = req.sessionID;

    const msg = message.toLowerCase();

    // ── XP query ──
    if (msg.includes("xp")) {
      const user = await User.findById(req.user.id);
      if (!user) return res.json({ reply: "I couldn't find your account." });
      return res.json({
        reply: `You currently have **${user.xp} XP**.\n\nKeep completing lessons to increase your XP and climb the leaderboard! 🚀`
      });
    }

    // ── Rank query ──
    if (msg.includes("rank") || msg.includes("position")) {
      const users = await User.find().sort({ xp: -1 });
      const currentUser = await User.findById(req.user.id);
      if (!currentUser) return res.json({ reply: "I couldn't determine your rank." });
      const rank = users.findIndex(u => u._id.toString() === currentUser._id.toString()) + 1;
      return res.json({
        reply: `You are currently **Rank #${rank}** on the leaderboard with **${currentUser.xp} XP**.\n\nGreat work! Keep learning to move even higher. 🔥`
      });
    }

    // ── Default → AI ──
    const reply = await askSpark(message, sessionId);
    res.json({ reply });

  } catch (err) {
    console.error("Spark error:", err);
    res.status(500).json({ reply: "Spark failed to respond." });
  }

});

// ─────────────────────────────────────────
// Root Route
// ─────────────────────────────────────────

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});

// ─────────────────────────────────────────
// Start Server
// ─────────────────────────────────────────

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
  });
};

startServer();