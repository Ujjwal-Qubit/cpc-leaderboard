/**
 * Score Model Schema
 * Tracks user scores across different competitive programming platforms
 * Maintains detailed statistics and historical data for leaderboard ranking
 */

const mongoose = require('mongoose');

// Sub-schema for platform-specific statistics
const platformStatsSchema = new mongoose.Schema({
  // LeetCode Statistics
  leetcode: {
    totalSolved: {
      type: Number,
      default: 0,
      min: [0, 'Total solved cannot be negative']
    },
    easySolved: {
      type: Number,
      default: 0,
      min: [0, 'Easy solved cannot be negative']
    },
    mediumSolved: {
      type: Number,
      default: 0,
      min: [0, 'Medium solved cannot be negative']
    },
    hardSolved: {
      type: Number,
      default: 0,
      min: [0, 'Hard solved cannot be negative']
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, 'Rating cannot be negative']
    },
    ranking: {
      type: Number,
      default: null
    },
    contestsParticipated: {
      type: Number,
      default: 0,
      min: [0, 'Contests participated cannot be negative']
    }
  },

  // Codeforces Statistics
  codeforces: {
    rating: {
      type: Number,
      default: 0,
      min: [0, 'Rating cannot be negative']
    },
    maxRating: {
      type: Number,
      default: 0,
      min: [0, 'Max rating cannot be negative']
    },
    rank: {
      type: String,
      default: 'Unrated'
    },
    problemsSolved: {
      type: Number,
      default: 0,
      min: [0, 'Problems solved cannot be negative']
    },
    contestsParticipated: {
      type: Number,
      default: 0,
      min: [0, 'Contests participated cannot be negative']
    }
  },

  // CodeChef Statistics
  codechef: {
    rating: {
      type: Number,
      default: 0,
      min: [0, 'Rating cannot be negative']
    },
    maxRating: {
      type: Number,
      default: 0,
      min: [0, 'Max rating cannot be negative']
    },
    stars: {
      type: Number,
      default: 0,
      min: [0, 'Stars cannot be negative'],
      max: [7, 'Stars cannot exceed 7']
    },
    problemsSolved: {
      type: Number,
      default: 0,
      min: [0, 'Problems solved cannot be negative']
    },
    contestsParticipated: {
      type: Number,
      default: 0,
      min: [0, 'Contests participated cannot be negative']
    },
    globalRank: {
      type: Number,
      default: null
    }
  },

  // HackerRank Statistics
  hackerrank: {
    stars: {
      type: Number,
      default: 0,
      min: [0, 'Stars cannot be negative'],
      max: [5, 'Stars cannot exceed 5']
    },
    problemsSolved: {
      type: Number,
      default: 0,
      min: [0, 'Problems solved cannot be negative']
    },
    badges: {
      type: Number,
      default: 0,
      min: [0, 'Badges cannot be negative']
    },
    certifications: {
      type: Number,
      default: 0,
      min: [0, 'Certifications cannot be negative']
    }
  }
}, { _id: false });

// Sub-schema for historical score tracking
const scoreHistorySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  compositeScore: {
    type: Number,
    required: true,
    min: [0, 'Composite score cannot be negative']
  },
  rank: {
    type: Number,
    min: [1, 'Rank must be at least 1']
  }
}, { _id: false });

// Main Score Schema
const scoreSchema = new mongoose.Schema({
  // Reference to User model
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
    unique: true,
    index: true
  },

  // Detailed platform statistics
  platformStats: {
    type: platformStatsSchema,
    required: true,
    default: () => ({})
  },

  // Composite score calculated from all platforms
  compositeScore: {
    type: Number,
    required: true,
    default: 0,
    min: [0, 'Composite score cannot be negative'],
    index: -1 // Index in descending order for leaderboard queries
  },

  // Score calculation breakdown (for transparency)
  scoreBreakdown: {
    leetcodeScore: {
      type: Number,
      default: 0
    },
    codeforcesScore: {
      type: Number,
      default: 0
    },
    codechefScore: {
      type: Number,
      default: 0
    },
    hackerrankScore: {
      type: Number,
      default: 0
    }
  },

  // Historical score data (limited to last 30 entries)
  history: {
    type: [scoreHistorySchema],
    default: [],
    validate: {
      validator: function(arr) {
        return arr.length <= 30;
      },
      message: 'History cannot exceed 30 entries'
    }
  },

  // Last update timestamp
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  // Enable automatic timestamps
  timestamps: true
});

// Index for efficient queries
scoreSchema.index({ userId: 1 });
scoreSchema.index({ compositeScore: -1 });

// Method to add a history entry
scoreSchema.methods.addHistoryEntry = function() {
  // Add current score to history
  this.history.push({
    date: new Date(),
    compositeScore: this.compositeScore,
    rank: null // Rank will be updated separately
  });

  // Keep only last 30 entries
  if (this.history.length > 30) {
    this.history = this.history.slice(-30);
  }
};

// Method to calculate composite score
scoreSchema.methods.calculateCompositeScore = function() {
  const { leetcode, codeforces, codechef, hackerrank } = this.platformStats;

  // LeetCode score calculation (weight: 0.3)
  const leetcodeScore = (
    leetcode.totalSolved * 10 +
    leetcode.easySolved * 1 +
    leetcode.mediumSolved * 3 +
    leetcode.hardSolved * 5 +
    leetcode.rating * 0.5
  ) * 0.3;

  // Codeforces score calculation (weight: 0.3)
  const codeforcesScore = (
    codeforces.rating * 0.8 +
    codeforces.problemsSolved * 5
  ) * 0.3;

  // CodeChef score calculation (weight: 0.25)
  const codechefScore = (
    codechef.rating * 0.7 +
    codechef.stars * 100 +
    codechef.problemsSolved * 5
  ) * 0.25;

  // HackerRank score calculation (weight: 0.15)
  const hackerrankScore = (
    hackerrank.stars * 50 +
    hackerrank.problemsSolved * 3 +
    hackerrank.badges * 10 +
    hackerrank.certifications * 20
  ) * 0.15;

  // Update breakdown
  this.scoreBreakdown = {
    leetcodeScore: Math.round(leetcodeScore),
    codeforcesScore: Math.round(codeforcesScore),
    codechefScore: Math.round(codechefScore),
    hackerrankScore: Math.round(hackerrankScore)
  };

  // Calculate total composite score
  this.compositeScore = Math.round(
    leetcodeScore + codeforcesScore + codechefScore + hackerrankScore
  );
};

// Pre-save middleware to update lastUpdated
scoreSchema.pre('save', function(next) {
  this.lastUpdated = Date.now();
  next();
});

// Export the Score model
module.exports = mongoose.model('Score', scoreSchema);
