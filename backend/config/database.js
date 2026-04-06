const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully");

    // Seed a default teacher account if the DB is empty
    await seedDefaultUser();
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

const seedDefaultUser = async () => {
  // Lazy-require to avoid circular dependency
  const User = require("../models/User");

  const count = await User.countDocuments();
  if (count==0) {
    const hashedPassword = await bcrypt.hash("123456", 10);
    await User.create({
      email: "teacher@test.com",
      password: hashedPassword,
      role: "teacher",
    });
    console.log("🌱 Default teacher account seeded → teacher@test.com / 123456");
  }
};

module.exports = connectDB;