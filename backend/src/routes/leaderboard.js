// routes/leaderboard.js
// Leaderboard fetch and sorting logic

const express = require('express');
const router = express.Router();

// TODO: Add database model imports
// TODO: Implement sorting algorithms for different metrics

/**
 * @route   GET /leaderboard
 * @desc    Get leaderboard data with sorting options
 * @query   sortBy (score|problems|rating), order (asc|desc)
 * @access  Public
 */
router.get('/', (req, res) => {
  const { sortBy = 'score', order = 'desc' } = req.query;
  res.json({ 
    message: 'Get leaderboard - to be implemented',
    sortBy,
    order
  });
});

/**
 * @route   GET /leaderboard/top/:count
 * @desc    Get top N students from leaderboard
 * @access  Public
 */
router.get('/top/:count', (req, res) => {
  res.json({ message: 'Get top students - to be implemented' });
});

/**
 * @route   GET /leaderboard/rank/:userId
 * @desc    Get specific user's rank
 * @access  Public
 */
router.get('/rank/:userId', (req, res) => {
  res.json({ message: 'Get user rank - to be implemented' });
});

module.exports = router;
