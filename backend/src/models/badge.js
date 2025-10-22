/**
 * Badge Model Schema
 * Tracks achievements and badges awarded to users
 * Represents milestones and accomplishments in competitive programming
 */

const mongoose = require('mongoose');

// Define Badge Schema
const badgeSchema = new mongoose.Schema({
  // Reference to User model
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
    index: true
  },

  // Type of badge earned
  badgeType: {
    type: String,
    required: [true, 'Badge type is required'],
    enum: [
      // Achievement Badges
      'FIRST_SUBMISSION',           // First problem submitted
      'FIRST_100_PROBLEMS',         // 100 problems solved across all platforms
      'FIRST_500_PROBLEMS',         // 500 problems solved
      'FIRST_1000_PROBLEMS',        // 1000 problems solved
      'PROBLEM_SOLVER_BRONZE',      // 200 problems solved
      'PROBLEM_SOLVER_SILVER',      // 500 problems solved
      'PROBLEM_SOLVER_GOLD',        // 1000 problems solved
      'PROBLEM_SOLVER_PLATINUM',    // 2000 problems solved
      
      // Platform-Specific Badges
      'LEETCODE_KNIGHT',            // LeetCode rating > 1800
      'LEETCODE_GUARDIAN',          // LeetCode rating > 2200
      'CODEFORCES_EXPERT',          // Codeforces Expert rank
      'CODEFORCES_MASTER',          // Codeforces Master rank
      'CODECHEF_4_STAR',            // CodeChef 4-star
      'CODECHEF_5_STAR',            // CodeChef 5-star
      'CODECHEF_6_STAR',            // CodeChef 6-star
      'HACKERRANK_GOLD',            // HackerRank Gold badge
      
      // Contest Badges
      'CONTEST_WARRIOR_BRONZE',     // 10 contests participated
      'CONTEST_WARRIOR_SILVER',     // 25 contests participated
      'CONTEST_WARRIOR_GOLD',       // 50 contests participated
      'CONTEST_WINNER',             // Won a contest
      'TOP_10_FINISH',              // Top 10 in a contest
      'TOP_100_FINISH',             // Top 100 in a contest
      
      // Streak Badges
      'WEEK_STREAK',                // 7-day solving streak
      'MONTH_STREAK',               // 30-day solving streak
      'QUARTER_STREAK',             // 90-day solving streak
      
      // Leaderboard Badges
      'LEADERBOARD_TOP_10',         // Top 10 in leaderboard
      'LEADERBOARD_TOP_50',         // Top 50 in leaderboard
      'LEADERBOARD_TOP_100',        // Top 100 in leaderboard
      'LEADERBOARD_CHAMPION',       // Rank 1 in leaderboard
      
      // Special Badges
      'EARLY_BIRD',                 // Among first users
      'CONSISTENT_PERFORMER',       // Consistent activity for 3 months
      'RISING_STAR',                // Fastest improvement
      'ALL_ROUNDER',                // Active on all 4 platforms
      'PERFECTIONIST',              // 100% contest accuracy
      
      // Difficulty Badges
      'EASY_MASTER',                // 100 easy problems
      'MEDIUM_MASTER',              // 100 medium problems
      'HARD_MASTER',                // 50 hard problems
      'HARD_LEGEND',                // 100 hard problems
      
      // Custom/Admin Badges
      'MODERATOR',                  // Community moderator
      'CONTRIBUTOR',                // Contributed to platform
      'MENTOR',                     // Helped other users
      'AMBASSADOR'                  // Platform ambassador
    ]
  },

  // Date when badge was awarded
  awardedOn: {
    type: Date,
    required: [true, 'Award date is required'],
    default: Date.now,
    index: true
  },

  // Additional metadata about the badge
  metadata: {
    // Description or reason for badge award
    description: {
      type: String,
      trim: true
    },
    
    // Achievement value (e.g., number of problems, rating, etc.)
    value: {
      type: Number,
      min: [0, 'Value cannot be negative']
    },
    
    // Platform where achievement was earned (if applicable)
    platform: {
      type: String,
      enum: ['leetcode', 'codeforces', 'codechef', 'hackerrank', 'leaderboard', 'general', null],
      default: null
    },
    
    // Contest or event name (if applicable)
    eventName: {
      type: String,
      trim: true
    },
    
    // Badge tier for multi-level badges
    tier: {
      type: String,
      enum: ['bronze', 'silver', 'gold', 'platinum', 'diamond', null],
      default: null
    }
  },

  // Badge visibility (for private achievements)
  isVisible: {
    type: Boolean,
    default: true
  },

  // Whether badge is active/revoked
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  // Enable automatic timestamps
  timestamps: true
});

// Compound index for efficient queries
badgeSchema.index({ userId: 1, badgeType: 1 });
badgeSchema.index({ userId: 1, awardedOn: -1 });
badgeSchema.index({ badgeType: 1 });

// Method to deactivate a badge
badgeSchema.methods.deactivate = function() {
  this.isActive = false;
  return this.save();
};

// Method to hide a badge
badgeSchema.methods.hide = function() {
  this.isVisible = false;
  return this.save();
};

// Method to show a badge
badgeSchema.methods.show = function() {
  this.isVisible = true;
  return this.save();
};

// Static method to get all badges for a user
badgeSchema.statics.getUserBadges = function(userId, includeHidden = false) {
  const query = { userId, isActive: true };
  if (!includeHidden) {
    query.isVisible = true;
  }
  return this.find(query).sort({ awardedOn: -1 });
};

// Static method to check if user has a specific badge
badgeSchema.statics.hasBadge = function(userId, badgeType) {
  return this.findOne({
    userId,
    badgeType,
    isActive: true
  });
};

// Static method to get badge count by type
badgeSchema.statics.getBadgeStats = function() {
  return this.aggregate([
    { $match: { isActive: true } },
    { $group: { _id: '$badgeType', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
};

// Pre-save validation to prevent duplicate badges
badgeSchema.pre('save', async function(next) {
  if (this.isNew) {
    const existingBadge = await this.constructor.findOne({
      userId: this.userId,
      badgeType: this.badgeType,
      isActive: true
    });
    
    if (existingBadge) {
      const error = new Error(`User already has an active ${this.badgeType} badge`);
      return next(error);
    }
  }
  next();
});

// Export the Badge model
module.exports = mongoose.model('Badge', badgeSchema);
