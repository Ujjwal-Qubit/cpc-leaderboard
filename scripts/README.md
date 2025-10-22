# Scripts

This directory contains automation scripts and background jobs for the CPC Leaderboard.

## Purpose

The scripts handle:
- Scheduled data fetching from coding platforms
- Automatic score updates and recalculation
- Badge assignment based on performance metrics
- Data synchronization and cleanup tasks
- Cron jobs or serverless functions for periodic updates

## Tech Stack

- **Node.js** - Runtime for scripts
- **Cron/Cloud Functions** - Scheduling mechanism
- **Axios** - API requests to coding platforms
- **Database Client** - MongoDB/Firestore connection

## Scripts Overview

- **update-scores.js** - Fetches latest stats from all platforms and updates user scores
- **assign-badges.js** - Evaluates user performance and assigns achievement badges
- **cleanup.js** - Removes stale data and optimizes database

## Execution

Scripts can be run:
- Manually: `node scripts/update-scores.js`
- Via cron: Scheduled daily/weekly updates
- Via serverless: Cloud Functions triggered on schedule
