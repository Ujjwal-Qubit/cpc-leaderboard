# Backend

This directory contains the Node.js + Express backend API for the CPC Leaderboard.

## Purpose

The backend provides:
- RESTful API endpoints for frontend communication
- Google OAuth authentication with domain restriction
- User profile CRUD operations
- Leaderboard data aggregation and sorting logic
- Integration with coding platform APIs (LeetCode, Codeforces, CodeChef, HackerRank)
- Composite Performance Score (CPS) calculation
- Badge assignment logic based on achievements

## Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB/Firestore** - Database
- **Passport.js** - Google OAuth authentication
- **Axios** - External API requests

## Structure

- `src/` - Source code for routes, controllers, models, and utilities

## API Endpoints

- `/auth/google` - OAuth authentication
- `/user` - User profile management
- `/leaderboard` - Fetch and filter leaderboard data
- `/update-scores` - Background job endpoint for score updates
