require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const cron = require('node-cron');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const leaderboardRoutes = require('./routes/leaderboard');
const updateScoresRoutes = require('./routes/updateScores');

// Import database connection
const connectDB = require('./config/database');

// Import passport configuration
require('./config/passport')(passport);

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'cpc-leaderboard-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'CPC Leaderboard API is running!' });
});

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/leaderboard', leaderboardRoutes);
app.use('/update-scores', updateScoresRoutes);

// Schedule automatic score updates (runs daily at 2 AM)
cron.schedule('0 2 * * *', async () => {
  console.log('Running scheduled score update...');
  try {
    const updateScoresController = require('./controllers/updateScoresController');
    await updateScoresController.updateAllScores();
    console.log('Scheduled score update completed successfully');
  } catch (error) {
    console.error('Error in scheduled score update:', error);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
