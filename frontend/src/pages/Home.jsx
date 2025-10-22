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
