/**
 * Badge Controller
 * Handles badge operations and achievements
 */

const User = require('../models/user');
const Badge = require('../models/badge');

/**
 * Get all badges for a user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
exports.getUserBadges = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate('badges');
    
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    
    res.status(200).json({
      success: true,
      count: user.badges.length,
      data: user.badges
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

/**
 * Assign a badge to a user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
exports.assignBadge = async (req, res) => {
  try {
    const { userId, badgeId } = req.params;
    const { reason } = req.body;
    
    const user = await User.findById(userId);
    const badge = await Badge.findById(badgeId);
    
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    
    if (!badge) {
      return res.status(404).json({ success: false, error: 'Badge not found' });
    }
    
    // Check if user already has this badge
    if (user.badges.includes(badgeId)) {
      return res.status(400).json({ 
        success: false, 
        error: 'User already has this badge' 
      });
    }
    
    // Add badge to user
    user.badges.push(badgeId);
    await user.save();
    
    res.status(200).json({
      success: true,
      message: `Badge '${badge.name}' assigned successfully`,
      data: user
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
