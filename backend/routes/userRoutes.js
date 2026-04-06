const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { verifyToken } = require("../middleware/authMiddleware");

// ─── GET CURRENT USER (for lesson completion check) ───────────

router.get("/me", verifyToken, async (req, res) => {

  try {

    const user = await User.findById(req.user.id).select(
      "name xp completedTopics"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json(user);

  } catch (error) {

    console.error("Fetch user error:", error);

    res.status(500).json({
      message: "Failed to fetch user"
    });

  }

});

// ─── GET LEADERBOARD ─────────────────────────────

router.get("/leaderboard",verifyToken ,async (req, res) => {
  try {

    const users = await User.find({}, { name: 1, xp: 1,_id:1 })
      .sort({ xp: -1 });

    res.json(users);

  } catch (error) {

    console.error("Leaderboard error:", error);

    res.status(500).json({
      message: "Failed to load leaderboard"
    });

  }
});

// ─── COMPLETE TOPIC (ADD XP) ─────────────────────────

router.post("/complete-topic", verifyToken, async (req, res) => {

  try {

    const { topicId } = req.body;
    const userId = req.user.id;        // pulled from verified JWT — never undefined

    if (!topicId) {
      return res.status(400).json({
        message: "topicId is required"
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // Prevent duplicate XP
    if (user.completedTopics.includes(topicId)) {

      return res.json({
        message: "Topic already completed",
        xp: user.xp
      });

    }

    // Add topic to completed list
    user.completedTopics.push(topicId);

    // Add XP
    user.xp += 10;

    await user.save();

    res.json({
      message: "+10 XP earned",
      xp: user.xp
    });

  } catch (error) {

    console.error("Complete topic error:", error);

    res.status(500).json({
      message: "Failed to complete topic"
    });

  }

});

module.exports = router;