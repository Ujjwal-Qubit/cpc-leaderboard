/**
 * User Model Schema
 * Represents a user in the CPC Leaderboard system
 * Stores personal information and competitive programming platform usernames
 */

const mongoose = require('mongoose');

// Define the User Schema
const userSchema = new mongoose.Schema({
  // Personal Information
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },

  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },

  // Academic Information
  branch: {
    type: String,
    required: [true, 'Branch is required'],
    trim: true,
    enum: ['CSE', 'IT', 'ECE', 'EEE', 'ME', 'CE', 'OTHER']
  },

  year: {
    type: Number,
    required: [true, 'Year is required'],
    min: [1, 'Year must be between 1 and 4'],
    max: [4, 'Year must be between 1 and 4']
  },

  rollNo: {
    type: String,
    required: [true, 'Roll number is required'],
    unique: true,
    uppercase: true,
    trim: true
  },

  // Competitive Programming Platform Usernames
  leetcode: {
    type: String,
    trim: true,
    default: null
  },

  codeforces: {
    type: String,
    trim: true,
    default: null
  },

  codechef: {
    type: String,
    trim: true,
    default: null
  },

  hackerrank: {
    type: String,
    trim: true,
    default: null
  },

  // Optional Social Media Links
  socials: {
    github: {
      type: String,
      trim: true,
      default: null
    },
    linkedin: {
      type: String,
      trim: true,
      default: null
    },
    twitter: {
      type: String,
      trim: true,
      default: null
    },
    portfolio: {
      type: String,
      trim: true,
      default: null
    }
  },

  // Profile Picture URL
  profilePic: {
    type: String,
    trim: true,
    default: 'https://via.placeholder.com/150'
  },

  // Timestamp for last profile update
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  // Enable automatic timestamps for createdAt and updatedAt
  timestamps: true
});

// Index for faster queries
userSchema.index({ email: 1 });
userSchema.index({ rollNo: 1 });

// Pre-save middleware to update lastUpdated timestamp
userSchema.pre('save', function(next) {
  this.lastUpdated = Date.now();
  next();
});

// Export the User model
module.exports = mongoose.model('User', userSchema);
