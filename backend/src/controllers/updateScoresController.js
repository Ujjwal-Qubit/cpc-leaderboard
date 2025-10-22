/**
 * Update Scores Controller
 * Handles batch score updates for all users
 */

const User = require('../models/user');
const Score = require('../models/score');

/**
 * Update scores for all users
 * Iterates through all users and updates their scores from external APIs
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
exports.updateAllScores = async (req, res) => {
  try {
    const users = await User.find();
    const updateResults = {
      success: 0,
      failed: 0,
      errors: []
    };
    
    // Iterate through all users
    for (const user of users) {
      try {
        // Sample logic to calculate total score
        let totalScore = 0;
        
        // Add scores from different platforms
        if (user.codeforces && user.codeforces.rating) {
          totalScore += user.codeforces.rating * 0.3;
        }
        
        if (user.codechef && user.codechef.rating) {
          totalScore += user.codechef.rating * 0.3;
        }
        
        if (user.leetcode && user.leetcode.problemsSolved) {
          totalScore += user.leetcode.problemsSolved * 0.4;
        }
        
        // Update user's total score
        user.totalScore = Math.round(totalScore);
        user.lastUpdated = new Date();
        
        await user.save();
        
        // Create score record for history
        await Score.create({
          user: user._id,
          totalScore: user.totalScore,
          codeforces: user.codeforces?.rating || 0,
          codechef: user.codechef?.rating || 0,
          leetcode: user.leetcode?.problemsSolved || 0,
          timestamp: new Date()
        });
        
        updateResults.success++;
      } catch (userError) {
        updateResults.failed++;
        updateResults.errors.push({
          userId: user._id,
          name: user.name,
          error: userError.message
        });
      }
    }
    
    res.status(200).json({
      success: true,
      message: 'Score update completed',
      results: updateResults
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};
