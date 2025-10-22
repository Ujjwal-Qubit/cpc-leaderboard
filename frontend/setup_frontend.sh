#!/bin/bash

# Configure Tailwind CSS
cat > tailwind.config.js << 'TAILWIND'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
TAILWIND

# Update src/index.css with Tailwind directives
cat > src/index.css << 'CSS'
@tailwind base;
@tailwind components;
@tailwind utilities;
CSS

# Create pages directory
mkdir -p src/pages

# Create Home page
cat > src/pages/Home.jsx << 'HOME'
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-5xl font-bold text-indigo-900 mb-4">CPC Leaderboard</h1>
        <p className="text-xl text-gray-600 mb-8">
          Welcome to the Competitive Programming Cell Leaderboard
        </p>
        <nav className="flex gap-4">
          <Link to="/login" className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            Login
          </Link>
          <Link to="/leaderboard" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
            View Leaderboard
          </Link>
        </nav>
      </div>
    </div>
  );
}
HOME

# Create Login page
cat > src/pages/Login.jsx << 'LOGIN'
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-indigo-900 mb-6">Login</h1>
        <p className="text-gray-600 mb-8">Sign in with your university email</p>
        <button className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition mb-4">
          Sign in with Google
        </button>
        <Link to="/" className="block text-center text-indigo-600 hover:text-indigo-800">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
LOGIN

# Create Profile page
cat > src/pages/Profile.jsx << 'PROFILE'
import { Link } from 'react-router-dom';

export default function Profile() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-900 mb-8">Profile Setup</h1>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <p className="text-gray-600 mb-4">Complete your profile to join the leaderboard</p>
          <form className="space-y-4">
            <input type="text" placeholder="Full Name" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            <input type="text" placeholder="Branch" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            <input type="text" placeholder="Year" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            <input type="text" placeholder="LeetCode Username" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            <input type="text" placeholder="Codeforces Handle" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            <button type="submit" className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
              Save Profile
            </button>
          </form>
          <Link to="/" className="block mt-4 text-center text-purple-600 hover:text-purple-800">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
PROFILE

# Create Leaderboard page
cat > src/pages/Leaderboard.jsx << 'LEADERBOARD'
import { Link } from 'react-router-dom';

export default function Leaderboard() {
  const mockData = [
    { rank: 1, name: 'Student 1', branch: 'CSE', year: '3rd', score: 950 },
    { rank: 2, name: 'Student 2', branch: 'IT', year: '2nd', score: 890 },
    { rank: 3, name: 'Student 3', branch: 'CSE', year: '4th', score: 850 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-green-900 mb-8">Leaderboard</h1>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-4">Rank</th>
                <th className="text-left py-4 px-4">Name</th>
                <th className="text-left py-4 px-4">Branch</th>
                <th className="text-left py-4 px-4">Year</th>
                <th className="text-left py-4 px-4">Score</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((student) => (
                <tr key={student.rank} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">{student.rank}</td>
                  <td className="py-4 px-4">
                    <Link to={`/profile/${student.name.toLowerCase().replace(' ', '-')}`} className="text-green-600 hover:text-green-800">
                      {student.name}
                    </Link>
                  </td>
                  <td className="py-4 px-4">{student.branch}</td>
                  <td className="py-4 px-4">{student.year}</td>
                  <td className="py-4 px-4 font-bold">{student.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link to="/" className="block mt-8 text-center text-green-600 hover:text-green-800">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
LEADERBOARD

# Create UserProfile page
cat > src/pages/UserProfile.jsx << 'USERPROFILE'
import { useParams, Link } from 'react-router-dom';

export default function UserProfile() {
  const { username } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-orange-900 mb-8">User Profile: {username}</h1>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-4">
            <p className="text-gray-600">Branch: CSE</p>
            <p className="text-gray-600">Year: 3rd</p>
            <p className="text-gray-600">LeetCode: {username}</p>
            <p className="text-gray-600">Codeforces: {username}</p>
            <p className="text-xl font-bold text-orange-900">Total Score: 950</p>
          </div>
          <Link to="/leaderboard" className="block mt-8 text-center text-orange-600 hover:text-orange-800">
            Back to Leaderboard
          </Link>
        </div>
      </div>
    </div>
  );
}
USERPROFILE

# Update App.jsx with routing
cat > src/App.jsx << 'APP'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile/:username" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
APP

echo "Setup complete!"
