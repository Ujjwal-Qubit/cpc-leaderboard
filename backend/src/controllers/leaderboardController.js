/**
 * Leaderboard Controller
 * Handles leaderboard operations
 */

const User = require('../models/user');

/**
 * Get leaderboard with sorted users by total score
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
exports.getLeaderboard = async (req, res) => {
  try {
    const { limit = 100, page = 1 } = req.query;
    const skip = (page - 1) * limit;
    
    // Fetch users sorted by total score in descending order
    const users = await User.find()
      .sort({ totalScore: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .select('name email totalScore codeforces codechef leetcode badges');
    
    const totalUsers = await User.countDocuments();
    
    res.status(200).json({
      success: true,
      count: users.length,
      totalUsers,
      page: parseInt(page),
      totalPages: Math.ceil(totalUsers / limit),
      data: users
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
