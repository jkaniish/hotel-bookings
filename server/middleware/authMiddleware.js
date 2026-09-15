import User from "../models/User.js";
import { clerkClient } from "@clerk/express";

export const protect = async (req, res, next) => {
  try {
    // 1. Clerk provides req.auth (handles both object and function execution safely)
    const auth = typeof req.auth === "function" ? req.auth() : req.auth;
    const userId = auth?.userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: "not authenticated" });
    }

    // 2. Query MongoDB
    // Handles both setups: _id as Clerk string, or clerkId field fallback
    const user =
      (await User.findById(userId)) || (await User.findOne({ clerkId: userId }));

    let currentUser = user;

    // Recover users whose Clerk webhook was missed.
    if (!currentUser) {
      const clerkUser = await clerkClient.users.getUser(userId);
      currentUser = await User.findByIdAndUpdate(
        userId,
        {
          _id: userId,
          username: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || "User",
          email: clerkUser.primaryEmailAddress?.emailAddress || "",
          image: clerkUser.imageUrl || "",
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }

    // 3. Forward the user object to next controller
    req.user = currentUser;
    return next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({ success: false, message: "not authenticated" });
  }
};